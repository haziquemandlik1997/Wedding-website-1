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
      'Access-Control-Allow-Headers': 'Content-Type',
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
    return jsonResponse(null, 204);
  }

  // --- R2 Media Storage Endpoints ---

  if (path === 'generate-upload-url') {
    const key = `${Date.now()}-${crypto.randomUUID()}`;
    const signedUrl = await env.WEDDING_MEDIA_BUCKET.createPresignedUrl({
      key: key,
      action: 'put',
      expires: 900, // 15 minutes
    });
    const publicUrl = `${env.R2_PUBLIC_URL}/${key}`;
    return jsonResponse({ uploadUrl: signedUrl, publicUrl: publicUrl });
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
    const { name, message } = await request.json();
    if (!name || !message) return jsonResponse({ error: 'Name and message are required' }, 400);

    const stmt = env.WEDDING_DB.prepare("INSERT INTO duas (name, message, status, timestamp) VALUES (?, ?, 'pending', ?)");
    await stmt.bind(name, message, new Date().toISOString()).run();
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
    // Basic validation
    if (!rsvp.fullName || !rsvp.attending) {
        return jsonResponse({ error: "Full name and attending status are required." }, 400);
    }
    const stmt = env.WEDDING_DB.prepare("INSERT INTO rsvps (fullName, comingFrom, attending, guests, eventsAttending, message, guestCode, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    await stmt.bind(
        rsvp.fullName, rsvp.comingFrom, rsvp.attending, rsvp.guests, 
        JSON.stringify(rsvp.eventsAttending), // Store array as JSON string
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

  if (path === 'media' && request.method === 'POST') {
    const { url, type } = await request.json();
    const stmt = env.WEDDING_DB.prepare("INSERT INTO media (url, type, approved, createdAt) VALUES (?, ?, 0, ?)");
    await stmt.bind(url, type, new Date().toISOString()).run();
    return jsonResponse({ success: true });
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


