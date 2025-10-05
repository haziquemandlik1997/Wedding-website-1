// This single file acts as the entire backend API for your application.
// It runs as a Cloudflare Pages Function and connects to your D1 database and R2 bucket.

// Helper to return JSON responses
const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 
      'Content-Type': 'application/json',
      // Allow requests from any origin (important for local development)
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-File-Name, X-File-Type',
    },
  });
};

// Main fetch handler
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-File-Name, X-File-Type',
        },
    });
  }

  // --- R2 Media Storage Endpoints (WORKAROUND IMPLEMENTED) ---

  if (path === 'upload' && request.method === 'POST') {
    try {
        if (!env.WEDDING_MEDIA_BUCKET) {
            return jsonResponse({ error: "Server Configuration Error: R2 bucket is not bound." }, 500);
        }
        if (!env.R2_PUBLIC_URL) {
            return jsonResponse({ error: "Server Configuration Error: R2_PUBLIC_URL is not set." }, 500);
        }

        const fileName = request.headers.get('x-file-name') || `${Date.now()}-unnamed-file`;
        const key = `${Date.now()}-${crypto.randomUUID()}-${fileName}`;
        
        // Put the file directly into the R2 bucket from the request body
        await env.WEDDING_MEDIA_BUCKET.put(key, request.body, {
            httpMetadata: { contentType: request.headers.get('content-type') },
        });

        const publicUrl = `${env.R2_PUBLIC_URL}/${key}`;
        
        // After successful upload, create a record in the D1 database
        const fileType = request.headers.get('x-file-type') || 'unknown';
        const stmt = env.WEDDING_DB.prepare("INSERT INTO media (url, type, approved, createdAt) VALUES (?, ?, 0, ?)");
        await stmt.bind(publicUrl, fileType, new Date().toISOString()).run();

        return jsonResponse({ success: true, url: publicUrl });

    } catch (e) {
        console.error("Error during direct upload:", e);
        return jsonResponse({ error: "Upload failed on the server.", details: e.message }, 500);
    }
  }

  if (path === 'delete-object' && request.method === 'POST') {
    const { key } = await request.json();
    if (!key) return jsonResponse({ error: 'File key is required' }, 400);
    await env.WEDDING_MEDIA_BUCKET.delete(key);
    return jsonResponse({ success: true, key: key });
  }
  
  // --- D1 Database Endpoints for Duas ---

  if (path === 'duas' && request.method === 'GET') {
    const { results } = await env.WEDDING_DB.prepare("SELECT * FROM duas WHERE status = 'approved' ORDER BY timestamp DESC").all();
    return jsonResponse(results);
  }

  if (path === 'duas/all' && request.method === 'GET') {
    const { results } = await env.WEDDING_DB.prepare("SELECT * FROM duas ORDER BY timestamp DESC").all();
    return jsonResponse(results);
  }
  
  if (path === 'duas' && request.method === 'POST') {
    const { name, message, guestCode } = await request.json();
    if (!name || !message) return jsonResponse({ error: 'Name and message are required' }, 400);

    const stmt = env.WEDDING_DB.prepare("INSERT INTO duas (name, message, guestCode, status, timestamp) VALUES (?, ?, ?, 'pending', ?)");
    await stmt.bind(name, message, guestCode || 'N/A', new Date().toISOString()).run();
    return jsonResponse({ success: true });
  }

  if (path.startsWith('duas/') && request.method === 'PUT') {
    const id = path.split('/')[1];
    const { status } = await request.json();
    if (!['approved', 'rejected'].includes(status)) {
      return jsonResponse({ error: 'Invalid status' }, 400);
    }
    const stmt = env.WEDDING_DB.prepare("UPDATE duas SET status = ? WHERE id = ?");
    await stmt.bind(status, id).run();
    return jsonResponse({ success: true });
  }

  // --- D1 Database Endpoints for RSVPs ---

  if (path === 'rsvps' && request.method === 'GET') {
    const { results } = await env.WEDDING_DB.prepare("SELECT * FROM rsvps ORDER BY timestamp DESC").all();
    return jsonResponse(results);
  }

  if (path === 'rsvps' && request.method === 'POST') {
    const rsvp = await request.json();
    if (!rsvp.fullName || !rsvp.attending) {
        return jsonResponse({ error: "Full name and attending status are required." }, 400);
    }
    const stmt = env.WEDDING_DB.prepare("INSERT INTO rsvps (fullName, comingFrom, attending, guests, eventsAttending, message, guestCode, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    await stmt.bind(
        rsvp.fullName, rsvp.comingFrom, rsvp.attending, rsvp.guests, 
        JSON.stringify(rsvp.eventsAttending),
        rsvp.message, rsvp.guestCode, new Date().toISOString()
    ).run();
    return jsonResponse({ success: true });
  }
  
  // --- D1 Database Endpoints for Media ---
  if (path === 'media' && request.method === 'GET') {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');
    let query;
    if (approved === 'true') {
        query = env.WEDDING_DB.prepare("SELECT * FROM media WHERE approved = 1 ORDER BY createdAt DESC");
    } else {
        query = env.WEDDING_DB.prepare("SELECT * FROM media ORDER BY createdAt DESC");
    }
    const { results } = await query.all();
    return jsonResponse(results);
  }
  
  if (path.startsWith('media/') && request.method === 'PUT') {
    const id = path.split('/')[1];
    const stmt = env.WEDDING_DB.prepare("UPDATE media SET approved = 1 WHERE id = ?");
    await stmt.bind(id).run();
    return jsonResponse({ success: true });
  }
  
  if (path.startsWith('media/') && request.method === 'DELETE') {
    const id = path.split('/')[1];
    await env.WEDDING_DB.prepare("DELETE FROM media WHERE id = ?").bind(id).run();
    return jsonResponse({ success: true });
  }

  return jsonResponse({ error: 'Not Found' }, 404);
}

