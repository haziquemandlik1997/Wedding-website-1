import React, { useState, useEffect, useRef } from 'react';

// --- Configuration ---
const API_BASE_URL = '/api';

// --- Unique Codes (Unchanged) ---
const ADMIN_CODE = 'ADMIN123';
const JIC_CODES = ['K8P3M']; 
const JOC_CODES = ['Z5J7R'];
const MIC_CODES = ['2X4V7']; 
const MOC_CODES = ['9B1F5']; 

const ALL_GUEST_CODES = [...JIC_CODES, ...JOC_CODES, ...MIC_CODES, ...MOC_CODES];
const VALID_UNIQUE_CODES = [...ALL_GUEST_CODES, ADMIN_CODE];

// --- Event Visibility Rules (Unchanged) ---
const JOC_EVENTS = ["Haldi Ceremony (Bride's Side)", "The Nikah"];
const JIC_EVENTS = ["Haldi Ceremony (Groom's Side)", "Haldi Ceremony (Bride's Side)", "The Nikah", "Mehendi Ceremony", "The Nikah Ceremony", "The Walima"];
const MIC_EVENTS = ["The Hakdara Ceremony", "Haldi Ceremony (Groom's Side)", "Haldi Ceremony (Bride's Side)", "The Nikah", "Mehendi Ceremony", "The Nikah Ceremony", "The Walima"];
const MOC_EVENTS = ["The Walima"];
const PUBLIC_EVENTS = ["The Nikah", "The Walima"];

// --- Reusable UI Components (Unchanged) ---
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative border border-gray-700">
        {onClose && <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold">&times;</button>}
        {children}
      </div>
    </div>
  );
};

const Navbar = ({ setCurrentPage, handleLogout, isAdmin, guestCode }) => (
    <nav className="bg-black p-4 shadow-lg"><div className="container mx-auto flex flex-col items-center"><div className="flex flex-wrap justify-center space-x-4 mb-2"><NavLink onClick={() => setCurrentPage('home')}>Home</NavLink><NavLink onClick={() => setCurrentPage('eventDetails')}>Event Details</NavLink><NavLink onClick={() => setCurrentPage('rsvp')}>RSVP</NavLink><NavLink onClick={() => setCurrentPage('accommodation')}>Accommodation</NavLink><NavLink onClick={() => setCurrentPage('giftRegistry')}>Duas</NavLink><NavLink onClick={() => setCurrentPage('gallery')}>Gallery</NavLink></div><div className="flex flex-wrap justify-center space-x-4"><NavLink onClick={() => setCurrentPage('contact')}>Contact</NavLink>{isAdmin && <NavLink onClick={() => setCurrentPage('adminPanel')}>Admin Panel</NavLink>}{guestCode ? (<button onClick={handleLogout} className="text-stone-200 hover:bg-gray-800 hover:text-white transition-colors duration-200 text-lg font-semibold px-3 py-1 rounded-md">Logout</button>) : (<NavLink onClick={() => setCurrentPage('login')}>Login</NavLink>)}</div></div></nav>
);
const NavLink = ({ children, onClick }) => (<button onClick={onClick} className="text-stone-200 hover:bg-gray-800 hover:text-white transition-colors duration-200 text-lg font-semibold px-3 py-1 rounded-md">{children}</button>);

// --- Page Components ---
const HomePage = ({ setCurrentPage, isAdmin, guestCode, handleLogout }) => {
  const websiteLink = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(websiteLink)}`;
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-2 text-stone-100">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 text-center max-w-3xl w-full transform transition-all duration-500 hover:scale-105 border border-gray-700">
        <div className="mb-6">
          <img 
            src="https://as2.ftcdn.net/v2/jpg/06/26/10/37/1000_F_626103774_twshHrUzApupNUihit0SG2ouMEY9U7bp.jpg" 
            alt="Hazique & Zaufesha" 
            className="w-full h-auto max-w-md mx-auto rounded-lg object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/111827/44403c?text=Your+Photo+Here'; }}
          />
        </div>
        <h2 className="text-3xl md:text-6xl font-extrabold text-stone-100 mb-6 animate-fade-in-down font-nanum-myeongjo">HAZIQUE & ZAUFESHA</h2>
        <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light leading-relaxed animate-fade-in font-satisfy">We are so excited to celebrate our special day with all of you. Explore our website for all the details.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10">
          <button onClick={() => setCurrentPage('rsvp')} className="bg-stone-200 text-black px-8 py-4 rounded-full text-xl shadow-lg hover:bg-stone-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-stone-400 font-finger-paint">RSVP Now!</button>
          <button onClick={() => setCurrentPage('gallery')} className="bg-stone-200 text-black px-8 py-4 rounded-full text-xl shadow-lg hover:bg-stone-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-stone-400 font-finger-paint">Visit The Gallery!</button>
        </div>
        <div className="flex flex-col items-center gap-y-2 mt-10 mb-10">
          <div className="flex flex-wrap justify-center gap-x-4">
            <NavLink onClick={() => setCurrentPage('home')}>Home</NavLink>
            <NavLink onClick={() => setCurrentPage('eventDetails')}>Event Details</NavLink>
            <NavLink onClick={() => setCurrentPage('rsvp')}>RSVP</NavLink>
            <NavLink onClick={() => setCurrentPage('accommodation')}>Accommodation</NavLink>
            <NavLink onClick={() => setCurrentPage('giftRegistry')}>Duas</NavLink>
            <NavLink onClick={() => setCurrentPage('gallery')}>Gallery</NavLink>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4">
            <NavLink onClick={() => setCurrentPage('contact')}>Contact</NavLink>
            {isAdmin && <NavLink onClick={() => setCurrentPage('adminPanel')}>Admin Panel</NavLink>}
            {guestCode ? (<button onClick={handleLogout} className="text-stone-200 hover:bg-gray-800 hover:text-white transition-colors duration-200 text-lg font-semibold px-3 py-1 rounded-md">Logout</button>) : (<NavLink onClick={() => setCurrentPage('login')}>Login</NavLink>)}
          </div>
        </div>
        <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-inner">
          <h3 className="text-2xl font-bold text-stone-100 mb-4">Quick Access QR Code</h3>
          <img src={qrCodeUrl} alt="QR Code to Wedding Website" className="mx-auto rounded-lg shadow-md" />
          <p className="text-gray-400 mt-4 text-lg">Scan this to quickly access our website!</p>
        </div>
      </div>
    </div>
  );
};
const allEvents = [ { title: "The Hakdara Ceremony", date: "Sunday, November 16, 2025", time: "11:00 AM - 8:00 PM", venue: "Address: The Mandlik House, 701, NG Vedant, Opp. RBK School, Beverly Park, Mira Road East.", mapLink: "https://maps.app.goo.gl/ciz4tt3QAHicbz8AA", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.869308151048!2d72.86878347593169!3d19.28723364491768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0e8ffffffff%3A0x859c8c32d4323ab2!2sNG%20VEDANT!5e0!3m2!1sen!2sin!4v1724089855519!5m2!1sen!2sin", timeline: [] }, { title: "Haldi Ceremony (Bride's Side)", date: "Wednesday, November 19, 2025", time: "5:00 PM - 11:00 PM", venue: "TRF Club, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/NJLfAzEsRgw8NFjc6", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.78452336825!2d86.1609121759082!3d22.77326882672439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3895aaaaaab%3A0x445ce31d162624b5!2sTRF%20Club!5e0!3m2!1sen!2sin!4v1725834444583!5m2!1sen!2sin", timeline: [] }, { title: "Haldi Ceremony (Groom's Side)", date: "Thursday, November 20, 2025", time: "10:00 AM - 2:00 PM", venue: "TRF Club, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/NJLfAzEsRgw8NFjc6", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.78452336825!2d86.1609121759082!3d22.77326882672439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3895aaaaaab%3A0x445ce31d162624b5!2sTRF%20Club!5e0!3m2!1sen!2sin!4v1725834444583!5m2!1sen!2sin", timeline: [] }, { title: "Mehendi Ceremony", date: "Thursday, November 20, 2025", time: "5:00 PM - 9:00 PM", venue: "TRF Club, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/NJLfAzEsRgw8NFjc6", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.78452336825!2d86.1609121759082!3d22.77326882672439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3895aaaaaab%3A0x445ce31d162624b5!2sTRF%20Club!5e0!3m2!1sen!2sin!4v1725834444583!5m2!1sen!2sin", timeline: [] }, { title: "The Nikah Ceremony", date: "Friday, November 21, 2025", time: "1:30 PM - 4:00 PM", venue: "Telco Recreation Club, HS Road, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/wjVagG9Mk9p3wi2T9", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.775932591128!2d86.16053461540517!3d22.77361198507944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e390a3623c53%3A0x3379126a1758c54!2sTelco%20Recreation%20Club!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin", timeline: [ { time: "1:30 PM", event: "Guest Arrival" }, { time: "2:00 PM", event: "Nikah Ceremony" }, { time: "3:00 PM", event: "Dua & Blessings" }, { time: "3:30 PM", event: "Lunch" }, ] }, { title: "The Nikah", date: "Friday, November 21, 2025", time: "6:00 PM - 11:00 PM", venue: "Telco Recreation Club, HS Road, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/wjVagG9Mk9p3wi2T9", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.775932591128!2d86.16053461540517!3d22.77361198507944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e390a3623c53%3A0x3379126a1758c54!2sTelco%20Recreation%20Club!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin", timeline: [ { time: "6:00 PM", event: "Guest Arrival & Welcome" }, { time: "7:00 PM", event: "Couple's Grand Entrance" }, { time: "7:30 PM", event: "Dinner Service Begins" }, { time: "9:00 PM", event: "Rukhsati" }, ] }, { title: "The Walima", date: "Sunday, November 30, 2025", time: "5:00 PM - 10:00 PM", venue: "Hotel R K Inn, Bharti Nagar, Mira Road, Mira Bhayandar, Maharashtra 401107", mapLink: "https://www.google.com/maps/search/?api=1&query=Hotel+R+K+Inn,+Bharti+Nagar,+Mira+Road,+Mira+Bhayandar,+Maharashtra+401107", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.08407335299!2d72.86895301538356!3d19.2782209869717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b06bffffffff%3A0x457f659286f5029!2sHotel%20RK%20Inn!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin", timeline: [ { time: "5:00 PM", event: "Guest Arrival & Welcome Drinks" }, { time: "6:00 PM", event: "Dinner Service Begins" }, { time: "8:00 PM", event: "Speeches & Toasts" }, { time: "9:00 PM", event: "Cake Cutting" }, ] } ];
const getVisibleEvents = (guestCode) => { if (!guestCode) return PUBLIC_EVENTS; if (guestCode === ADMIN_CODE) return allEvents.map(e => e.title); if (JIC_CODES.includes(guestCode)) return JIC_EVENTS; if (JOC_CODES.includes(guestCode)) return JOC_EVENTS; if (MIC_CODES.includes(guestCode)) return MIC_EVENTS; if (MOC_CODES.includes(guestCode)) return MOC_EVENTS; return PUBLIC_EVENTS; };

const EventDetailsPage = ({ guestCode, setCurrentPage, setLoginRedirectPath }) => { 
    useEffect(() => {
        if (!guestCode) {
            setLoginRedirectPath('eventDetails');
            setCurrentPage('login');
        }
    }, [guestCode, setCurrentPage, setLoginRedirectPath]);

    if (!guestCode) {
        return null; // Return nothing while redirecting
    }

    const visibleEventTitles = getVisibleEvents(guestCode); 
    const eventsToDisplay = allEvents.filter(event => visibleEventTitles.includes(event.title)); 
    
    return ( 
        <div className="min-h-screen bg-black p-3 text-stone-100">
            <div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 mt-8 border border-gray-700">
                <h2 className="text-4xl font-extrabold text-stone-100 mb-8 text-center">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {eventsToDisplay.map(event => (
                        <section key={event.title} className="p-6 bg-gray-800 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold text-stone-200 mb-4">{event.title}</h3>
                            <p className="text-lg text-gray-300 mb-2"><span className="font-semibold">Date:</span> {event.date}</p>
                            <p className="text-lg text-gray-300 mb-2"><span className="font-semibold">Time:</span> {event.time}</p>
                            <p className="text-lg text-gray-300 mb-4"><span className="font-semibold">Venue:</span> {event.venue}</p>
                            {event.timeline.length > 0 && (
                                <>
                                    <h4 className="text-2xl font-bold text-stone-200 mt-6 mb-3">Timeline of Events</h4>
                                    <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
                                        {event.timeline.map(item => (
                                            <li key={item.event}><span className="font-semibold">{item.time}:</span> {item.event}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="block mt-6">
                                <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                    <iframe src={event.mapEmbed} width="100%" height="100%" style={{ border: 0, pointerEvents: 'none' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${event.title} Location`}></iframe>
                                </div>
                            </a>
                        </section>
                    ))}
                </div>
            </div>
        </div> 
    ); 
};

const LoginPage = ({ handleLogin, setCurrentPage, loginRedirectPath }) => { 
    const [code, setCode] = useState(''); 
    const [error, setError] = useState(''); 

    const handleCodeChange = (e) => {
        const value = e.target.value.toUpperCase();
        const filteredValue = value.replace(/[^A-Z0-9]/g, ''); // Allow only uppercase letters and numbers
        setCode(filteredValue);
    };

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        if (VALID_UNIQUE_CODES.includes(code.trim())) { 
            handleLogin(code.trim()); 
            setCurrentPage(loginRedirectPath); 
        } else { 
            setError('code not accepted, retry.'); // Update the error message
        } 
    }; 
    
    return ( 
        <div className="min-h-screen bg-black flex items-center justify-center p-4 text-stone-100">
            <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
                <h2 className="text-4xl font-extrabold text-stone-100 mb-8 text-center">Enter Access Code</h2>
                <p className="text-center text-lg text-gray-300 mb-8">Please enter your unique code (mentioned in the wedding invitation) to view the photo gallery and RSVP.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input 
                        type="text" 
                        value={code} 
                        onChange={handleCodeChange} // Use the new handler
                        placeholder="Unique Code" 
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-center"
                    />
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    <button type="submit" className="w-full bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-stone-300">Enter</button>
                </form>
            </div>
        </div> 
    ); 
};

const AccommodationPage = ({ guestCode, setCurrentPage, setLoginRedirectPath, isAdmin }) => { 
    useEffect(() => { 
        if (!guestCode) { 
            setLoginRedirectPath('accommodation'); 
            setCurrentPage('login'); 
        } 
    }, [guestCode, setCurrentPage, setLoginRedirectPath]); 

    const isAuthorized = JIC_CODES.includes(guestCode) || MIC_CODES.includes(guestCode) || isAdmin; 
    
    if (!guestCode) return null; 
    
    if (!isAuthorized) { 
        return ( 
            <div className="min-h-screen bg-black flex items-center justify-center p-4 text-stone-100">
                <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700 text-center">
                    <h2 className="text-3xl font-extrabold text-stone-100 mb-4">Access Denied</h2>
                    <p className="text-lg text-gray-300">This page is only available to specific guests.</p>
                </div>
            </div> 
        ); 
    } 
    
    return ( 
        <div className="min-h-screen bg-black p-3 text-stone-100">
            <div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 mt-8 border border-gray-700">
                <h2 className="text-4xl font-extrabold text-stone-100 mb-8 text-center">Accommodation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="p-6 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-3xl font-bold text-stone-200 mb-4">Jamshedpur Stay</h3>
                        <p className="text-lg text-gray-300 mb-2"><span className="font-semibold">Check-in:</span> Wednesday, November 19, 2025, 12:00 PM</p>
                        <p className="text-lg text-gray-300 mb-4"><span className="font-semibold">Check-out:</span> Saturday, November 22, 2025, 11:00 AM</p>
                        <p className="text-lg text-gray-300 mb-4">Accommodation is arranged at The Altira Hotel, Plot No.300, Zone 5, Birsanagar, Telco Colony, Jamshedpur, Jharkhand 831004. Please confirm your travel dates via RSVP.</p>
                        <a href="https://maps.app.goo.gl/aqrU9nMRqWjwN48A9" target="_blank" rel="noopener noreferrer" className="block mt-6">
                            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.969248744165!2d86.15175967590807!3d22.76616422682979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3f4e3852c09%3A0x6733e839566395b2!2sThe%20Altira%20Hotel!5e0!3m2!1sen!2sin!4v1725883584989!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, pointerEvents: 'none' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Jamshedpur Accommodation"></iframe>
                            </div>
                        </a>
                    </section>
                    <section className="p-6 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-3xl font-bold text-stone-200 mb-4">Mumbai Stay</h3>
                        <p className="text-lg text-gray-300 mb-2"><span className="font-semibold">Check-in:</span> Saturday, November 29, 2025, 12:00 PM</p>
                        <p className="text-lg text-gray-300 mb-4"><span className="font-semibold">Check-out:</span> Monday, December 1, 2025, 11:00 AM</p>
                        <p className="text-lg text-gray-300 mb-4">Accommodation is arranged at Savana The Boutique Hotel, Building No 6, Hotel Unit, H-1, opp. Mari Gold Road, Beverly Park, Mira Road East, Thane, Mira Bhayandar, Maharashtra 401107. Please confirm your travel dates via RSVP.</p>
                        <a href="https://maps.app.goo.gl/qR3u4YrRpTGc95m69" target="_blank" rel="noopener noreferrer" className="block mt-6">
                            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.071987518559!2d72.8715834759203!3d19.278772245228587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b06a4aaaaaab%3A0x7d12f127c569bd89!2sSavana%20the%20boutique%20Hotel!5e0!3m2!1sen!2sin!4v1725890259779!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, pointerEvents: 'none' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mumbai Accommodation"></iframe>
                            </div>
                        </a>
                    </section>
                </div>
            </div>
        </div> 
    ); 
};
const ContactPage = () => { const [formData, setFormData] = useState({ name: '', email: '', message: '' }); const [isSubmitting, setIsSubmitting] = useState(false); const [submitMessage, setSubmitMessage] = useState(''); const [isModalOpen, setIsModalOpen] = useState(false); const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value }); const handleSubmit = async (e) => { e.preventDefault(); setIsSubmitting(true); console.log('Contact form submitted:', formData); setSubmitMessage('Message sent successfully!'); setIsModalOpen(true); setFormData({ name: '', email: '', message: '' }); setIsSubmitting(false); }; return ( <div className="min-h-screen bg-black p-3 text-stone-100"><div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 mt-8 border border-gray-700"><h2 className="text-4xl font-extrabold mb-8 text-center">Contact Us</h2><form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6"><input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"/><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"/><textarea name="message" value={formData.message} onChange={handleChange} rows="6" required placeholder="Your Message" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"></textarea><button type="submit" disabled={isSubmitting} className="w-full bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold">{isSubmitting ? 'Sending...' : 'Send Message'}</button></form></div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold mb-4 text-center text-stone-100">Message Status</h3><p className="text-lg text-gray-300 text-center">{submitMessage}</p></Modal></div> ); };

// --- ** MODIFIED COMPONENTS ** ---

const RSVPPage = ({ guestCode, setCurrentPage, setLoginRedirectPath }) => {
  const [formData, setFormData] = useState({ fullName: '', comingFrom: '', attending: '', guests: 1, eventsAttending: [], message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FIX: Moved useEffect to top level and put condition inside.
  useEffect(() => {
    if (!guestCode) {
      setLoginRedirectPath('rsvp');
      setCurrentPage('login');
    }
  }, [guestCode, setCurrentPage, setLoginRedirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/rsvps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, guestCode }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setSubmitMessage('Your RSVP has been submitted successfully! Thank you!');
      setFormData({ fullName: '', comingFrom: '', attending: '', guests: 1, eventsAttending: [], message: '' });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitMessage(`Failed to submit RSVP: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }
  };
  
  // Early return after hooks if not logged in
  if (!guestCode) { return null; }

  const visibleEventTitles = getVisibleEvents(guestCode);
  const eventsToDisplay = allEvents.filter(event => visibleEventTitles.includes(event.title));
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleEventChange = (e) => { const { value, checked } = e.target; setFormData(prev => ({ ...prev, eventsAttending: checked ? [...prev.eventsAttending, value] : prev.eventsAttending.filter(event => event !== value) })); };
  return ( <div className="min-h-screen bg-black p-3 text-stone-100"><div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 mt-8 border border-gray-700"><h2 className="text-4xl font-extrabold mb-8 text-center">RSVP</h2><form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6"><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your Full Name" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"/><input type="text" name="comingFrom" value={formData.comingFrom} onChange={handleChange} required placeholder="Locality?" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"/><div className="flex items-center space-x-4"><label className="flex items-center text-lg text-gray-300"><input type="radio" name="attending" value="Yes" checked={formData.attending === 'Yes'} onChange={handleChange} required className="form-radio mr-2 h-5 w-5"/>Yes, Attending</label><label className="flex items-center text-lg text-gray-300"><input type="radio" name="attending" value="No" checked={formData.attending === 'No'} onChange={handleChange} required className="form-radio mr-2 h-5 w-5"/>No, Regretfully</label></div><div><label htmlFor="guests" className="block text-lg text-gray-300 mb-2">Number of Guests</label><select name="guests" id="guests" value={formData.guests} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg">{[...Array(10).keys()].map(i => (<option key={i + 1} value={i + 1}>{i + 1}</option>))}</select></div><div><label className="block text-lg text-gray-300 mb-2">Which events will you be attending?</label><div className="space-y-2">{eventsToDisplay.map(event => ( <label key={event.title} className="flex items-center text-lg text-gray-300"><input type="checkbox" value={event.title} onChange={handleEventChange} checked={formData.eventsAttending.includes(event.title)} className="form-checkbox mr-2 h-5 w-5" />{event.title}</label>))}</div></div><textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Any comments?" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"></textarea><button type="submit" disabled={isSubmitting} className="w-full bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-stone-300 transition duration-300 disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit'}</button></form></div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold mb-4 text-center text-stone-100">RSVP Status</h3><p className="text-lg text-gray-300 text-center">{submitMessage}</p></Modal></div> );
};

const GiftRegistryPage = ({ guestCode, setCurrentPage, setLoginRedirectPath }) => {
  const [duas, setDuas] = useState([]);
  const [newDua, setNewDua] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // FIX: Moved useEffect to top level and put condition inside.
  useEffect(() => {
    if (!guestCode) {
      setLoginRedirectPath('giftRegistry');
      setCurrentPage('login');
    }
  }, [guestCode, setCurrentPage, setLoginRedirectPath]);
  
  const fetchDuas = async () => {
    try {
      const response = await fetch(new URL(`${API_BASE_URL}/duas`, window.location.origin));
      const data = await response.json();
      setDuas(data);
    } catch (error) {
      console.error("Failed to fetch duas:", error);
    }
  };

  useEffect(() => {
    if (guestCode) fetchDuas();
  }, [guestCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newDua.name.trim() || !newDua.message.trim()) {
      setSubmitMessage("Please fill out both your name and your dua.");
      setIsModalOpen(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(new URL(`${API_BASE_URL}/duas`, window.location.origin), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newDua, guestCode }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setSubmitMessage("Thank you for your dua! It has been sent for review.");
      setNewDua({ name: '', message: '' });
    } catch (error) {
      console.error("Error submitting dua:", error);
      setSubmitMessage(`Sorry, there was an error submitting your dua: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }
  };
  
  // Early return after hooks if not logged in
  if (!guestCode) { return null; }
  
  const handleChange = (e) => setNewDua(prev => ({ ...prev, [e.target.name]: e.target.value }));
  return ( <div className="min-h-screen bg-black p-3 text-stone-100"><div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 mt-8 border border-gray-700"><h2 className="text-4xl font-extrabold mb-4 text-center">Duas</h2><p className="text-xl text-gray-300 mb-8 text-center">Your presence is the only gift we need! If you wish to give something, we have a Duas section. Please leave us some great duas.</p><div className="max-w-2xl mx-auto"><div className="bg-gray-800 rounded-lg p-4 h-96 overflow-y-auto mb-6 flex flex-col space-y-4">{duas.map(dua => ( <div key={dua.id} className="bg-gray-700 rounded-lg p-3 shadow"><p className="text-white font-semibold">{dua.name}</p><p className="text-gray-300">{dua.message}</p></div>))}</div><form onSubmit={handleSubmit} className="space-y-4"><input type="text" name="name" value={newDua.name} onChange={handleChange} placeholder="Your Name" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg" /><textarea name="message" value={newDua.message} onChange={handleChange} rows="3" placeholder="Leave your dua here..." className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"></textarea><button type="submit" disabled={isSubmitting} className="w-full bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-stone-300 transition duration-300 disabled:opacity-50">{isSubmitting ? 'Sending...' : 'Send Dua'}</button></form></div></div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold mb-4 text-center text-stone-100">Thank You!</h3><p className="text-lg text-gray-300 text-center">{submitMessage}</p></Modal></div> );
};

const GalleryPage = ({ guestCode, setCurrentPage, setLoginRedirectPath, isAdmin }) => {
    const [mediaItems, setMediaItems] = useState([]);
    const [mediaType, setMediaType] = useState('images');
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const fetchMedia = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/media?approved=true`);
            const data = await response.json();
            setMediaItems(data);
        } catch (error) {
            console.error("Failed to fetch media:", error);
        }
    };

    useEffect(() => {
        if (guestCode) fetchMedia();
    }, [guestCode]);
    
    useEffect(() => { 
        if (!guestCode) { 
            setLoginRedirectPath('gallery'); 
            setCurrentPage('login'); 
        } 
    }, [guestCode, setCurrentPage, setLoginRedirectPath]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true); 

        try {
            // This is the new direct upload method
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': file.type,
                    'X-File-Name': encodeURIComponent(file.name),
                    'X-File-Type': file.type.startsWith('image/') ? 'image' : 'video',
                },
                body: file,
            });

            if (!response.ok) {
                let errorDetails = `HTTP status ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorDetails = errorData.error || JSON.stringify(errorData);
                } catch (jsonError) {
                    errorDetails = await response.text();
                }
                throw new Error(errorDetails);
            }

            setModalMessage("Thank you! Your media has been submitted for approval.");
            setIsModalOpen(true);
            fetchMedia(); // Refresh the gallery to show the new (unapproved) item in admin panel
            
        } catch (error) {
            console.error("Upload failed:", error);
            setModalMessage(`Upload failed: ${error.message}`);
            setIsModalOpen(true);
        } finally {
            setUploading(false);
        }
    };

    const isAuthorized = JIC_CODES.includes(guestCode) || MIC_CODES.includes(guestCode) || isAdmin;
    if (!guestCode) return null;
    if (!isAuthorized) { return ( <div className="min-h-screen bg-black flex items-center justify-center p-4 text-stone-100"><div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700 text-center"><h2 className="text-3xl font-extrabold text-stone-100 mb-4">Access Denied</h2><p className="text-lg text-gray-300">This page is only available to specific guests.</p></div></div> ); }
    const filteredMedia = mediaItems.filter(item => item.type === mediaType.slice(0, -1));
    return ( <div className="min-h-screen bg-black p-3 text-stone-100"><div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 mt-8 border border-gray-700"><h2 className="text-4xl font-extrabold mb-8 text-center">Gallery</h2><div className="flex justify-center mb-6"><button onClick={() => fileInputRef.current.click()} className="bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-stone-300 transition duration-300">Upload Media</button><input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*" /></div>{uploading && (<div className="w-full bg-gray-700 rounded-full h-2.5 mb-4"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `100%` }}></div></div>)}<div className="flex justify-center space-x-4 mb-8"><button onClick={() => setMediaType('images')} className={`px-6 py-2 rounded-lg font-semibold ${mediaType === 'images' ? 'bg-stone-200 text-black' : 'bg-gray-700'}`}>Images</button><button onClick={() => setMediaType('videos')} className={`px-6 py-2 rounded-lg font-semibold ${mediaType === 'videos' ? 'bg-stone-200 text-black' : 'bg-gray-700'}`}>Videos</button></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{filteredMedia.length > 0 ? filteredMedia.map(item => ( <div key={item.id} className="rounded-lg overflow-hidden cursor-pointer group" onClick={() => item.type === 'image' && setSelectedImage(item.url)}>{item.type === 'image' ? ( <img src={item.url} alt="Gallery content" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"/> ) : ( <video controls src={item.url} className="w-full h-auto"></video> )}</div> )) : ( <p className="text-center text-lg text-gray-300 col-span-full">No {mediaType} yet. Be the first to upload!</p> )}</div></div>{selectedImage && ( <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}><img src={selectedImage} alt="Full screen view" className="max-w-full max-h-full"/></div> )}<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold mb-4 text-center text-stone-100">Upload Status</h3><p className="text-lg text-gray-300 text-center">{modalMessage}</p></Modal></div> );
};

const AdminPanelPage = () => {
  const [rsvps, setRsvps] = useState([]);
  const [duas, setDuas] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
      setLoading(true);
      try {
          const [rsvpsRes, duasRes, mediaRes] = await Promise.all([
              fetch(`${API_BASE_URL}/rsvps`),
              fetch(`${API_BASE_URL}/duas/all`),
              fetch(`${API_BASE_URL}/media`),
          ]);
          setRsvps(await rsvpsRes.json());
          setDuas(await duasRes.json());
          setMedia(await mediaRes.json());
      } catch (error) {
          console.error("Failed to fetch admin data:", error);
      } finally {
          setLoading(false);
      }
  };
  
  useEffect(() => { fetchData(); }, []);

  const updateDuaStatus = async (id, status) => {
    await fetch(`${API_BASE_URL}/duas/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ status }) });
    fetchData(); // Refresh data
  };

  const handleApproveMedia = async (id) => {
    await fetch(`${API_BASE_URL}/media/${id}`, { method: 'PUT' });
    fetchData(); // Refresh data
  };
  
  const handleRejectMedia = async (mediaId, mediaUrl) => {
      try {
          const key = mediaUrl.substring(mediaUrl.lastIndexOf('/') + 1);
          await fetch(`${API_BASE_URL}/delete-object`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) });
          await fetch(`${API_BASE_URL}/media/${mediaId}`, { method: 'DELETE' });
          fetchData(); // Refresh data
      } catch (error) { console.error("Error rejecting media:", error); }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Admin Data...</div>;

  return (
    <div className="min-h-screen bg-black p-3 text-stone-100">
      <div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 mt-8 border border-gray-700">
        <h2 className="text-4xl font-extrabold mb-8 text-center">Admin Panel</h2>
        
        <section className="mb-12 p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">Approve Media</h3><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{media.filter(m => !m.approved).map(item => ( <div key={item.id} className="bg-gray-700 p-2 rounded-lg">{item.type === 'image' ? <img src={item.url} alt="Awaiting approval" className="w-full h-40 object-cover rounded"/> : <video src={item.url} className="w-full h-40 object-cover rounded" controls/>}<div className="flex justify-around mt-2"><button onClick={() => handleApproveMedia(item.id)} className="bg-green-600 px-3 py-1 rounded-md text-sm">Approve</button><button onClick={() => handleRejectMedia(item.id, item.url)} className="bg-red-600 px-3 py-1 rounded-md text-sm">Reject</button></div></div> ))}</div></section>
        
        <section className="mb-12 p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">Pending Duas for Review</h3><div className="overflow-x-auto"><table className="min-w-full bg-gray-900"><thead><tr className="bg-gray-700 text-left text-lg"><th className="p-3">Name</th><th className="p-3">Message</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead><tbody>{duas.filter(d => d.status === 'pending').map(dua => (<tr key={dua.id} className="border-b border-gray-700"><td className="p-3">{dua.name}</td><td className="p-3 truncate max-w-sm">{dua.message}</td><td className="p-3"><span className="px-2 py-1 rounded-full text-sm bg-yellow-900 text-yellow-200">Pending</span></td><td className="p-3 space-x-2"><button onClick={() => updateDuaStatus(dua.id, 'approved')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Approve</button><button onClick={() => updateDuaStatus(dua.id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button></td></tr>))}</tbody></table></div></section>

        <section className="mb-12 p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">RSVP Responses</h3><div className="overflow-x-auto"><table className="min-w-full bg-gray-900"><thead><tr className="bg-gray-700 text-left text-lg"><th className="p-3">Full Name</th><th className="p-3">Coming From?</th><th className="p-3">Code</th><th className="p-3">Attending</th><th className="p-3">Guests</th><th className="p-3">Events</th><th className="p-3">Message</th></tr></thead><tbody>{rsvps.map(rsvp => (<tr key={rsvp.id} className="border-b border-gray-700"><td className="p-3">{rsvp.fullName}</td><td className="p-3">{rsvp.comingFrom}</td><td className="p-3">{rsvp.guestCode}</td><td className="p-3">{rsvp.attending}</td><td className="p-3">{rsvp.guests}</td><td className="p-3">{JSON.parse(rsvp.eventsAttending).join(', ')}</td><td className="p-3 truncate max-w-xs">{rsvp.message}</td></tr>))}</tbody></table></div></section>

        <section className="p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">Archived Duas</h3><div className="overflow-x-auto"><table className="min-w-full bg-gray-900"><thead><tr className="bg-gray-700 text-left text-lg"><th className="p-3">Name</th><th className="p-3">Message</th><th className="p-3">Status</th></tr></thead><tbody>{duas.filter(d => d.status === 'rejected').map(dua => (<tr key={dua.id} className="border-b border-gray-700"><td className="p-3">{dua.name}</td><td className="p-3 truncate max-w-sm">{dua.message}</td><td className="p-3"><span className="px-2 py-1 rounded-full text-sm bg-red-900 text-red-200">Rejected</span></td></tr>))}</tbody></table></div></section>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [guestCode, setGuestCode] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [loginRedirectPath, setLoginRedirectPath] = useState('gallery');
  
  const handleLogin = (code) => { setGuestCode(code); if (code === ADMIN_CODE) setIsAdmin(true); };
  const handleLogout = () => { setGuestCode(null); setIsAdmin(false); setCurrentPage('home'); };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} isAdmin={isAdmin} guestCode={guestCode} handleLogout={handleLogout} />;
      case 'eventDetails': return <EventDetailsPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} />;
      case 'rsvp': return <RSVPPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} />;
      case 'accommodation': return <AccommodationPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} isAdmin={isAdmin} />;
      case 'giftRegistry': return <GiftRegistryPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} />;
      case 'gallery': return <GalleryPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} isAdmin={isAdmin} />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage handleLogin={handleLogin} setCurrentPage={setCurrentPage} loginRedirectPath={loginRedirectPath} />;
      case 'adminPanel': return isAdmin ? <AdminPanelPage /> : <HomePage setCurrentPage={setCurrentPage} isAdmin={isAdmin} guestCode={guestCode} handleLogout={handleLogout} />;
      default: return <HomePage setCurrentPage={setCurrentPage} isAdmin={isAdmin} guestCode={guestCode} handleLogout={handleLogout} />;
    }
  };

  return (
    <div className="font-sans antialiased bg-black">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&family=Nanum+Myeongjo&family=Quintessential&family=Satisfy&display=swap'); body { font-family: 'Quintessential', cursive; background-color: #000; } .font-nanum-myeongjo { font-family: 'Nanum Myeongjo', serif; } .font-satisfy { font-family: 'Satisfy', cursive; } .font-finger-paint { font-family: 'Finger Paint', cursive; }`}</style>
      <Modal isOpen={showLoginModal && !guestCode && currentPage === 'home'} onClose={() => setShowLoginModal(false)}>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-center text-stone-100">Welcome!</h3>
          <p className="text-lg text-gray-300 mb-6">Please log in to access all features of our website.</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => { 
                setShowLoginModal(false); 
                setLoginRedirectPath('home'); // Set redirect path to home
                setCurrentPage('login'); 
              }} 
              className="bg-stone-200 text-black px-6 py-2 rounded-lg font-semibold"
            >
              Login
            </button>
            <button onClick={() => setShowLoginModal(false)} className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold">Skip for now</button>
          </div>
        </div>
      </Modal>
      {currentPage !== 'home' && <Navbar setCurrentPage={setCurrentPage} handleLogout={handleLogout} isAdmin={isAdmin} guestCode={guestCode} />}
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;

