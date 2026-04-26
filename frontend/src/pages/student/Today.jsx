import { useState } from 'react';

// ── Default weekly mess menu (set by Faculty-Rectors, read-only for students) ──
const weeklyMenu = {
  Monday: {
    Breakfast: { name: 'Poha & Masala Chai', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Lunch:     { name: 'Dal Tadka, Rice & Roti', photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
    Snacks:    { name: 'Samosa & Mint Chutney', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Dinner:    { name: 'Paneer Butter Masala & Naan', photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  },
  Tuesday: {
    Breakfast: { name: 'Idli & Sambar', photo: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
    Lunch:     { name: 'Rajma Chawal', photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
    Snacks:    { name: 'Bread Pakora & Ketchup', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Dinner:    { name: 'Chole Bhature', photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  },
  Wednesday: {
    Breakfast: { name: 'Paratha & Curd', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Lunch:     { name: 'Mix Veg & Chapati', photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
    Snacks:    { name: 'Veg Puff & Cold Coffee', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Dinner:    { name: 'Kadai Paneer & Rice', photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  },
  Thursday: {
    Breakfast: { name: 'Upma & Coconut Chutney', photo: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
    Lunch:     { name: 'Aloo Matar & Roti', photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
    Snacks:    { name: 'Dhokla & Green Chutney', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Dinner:    { name: 'Dal Makhani & Jeera Rice', photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  },
  Friday: {
    Breakfast: { name: 'Puri Bhaji', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Lunch:     { name: 'Palak Paneer & Rice', photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
    Snacks:    { name: 'French Fries & Sauce', photo: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
    Dinner:    { name: 'Biryani & Raita', photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
  },
  Saturday: {
    Breakfast: { name: 'Dosa & Sambar', photo: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
    Lunch:     { name: 'Chana Masala & Bhatura', photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
    Snacks:    { name: 'Maggi & Juice', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Dinner:    { name: 'Shahi Paneer & Laccha Paratha', photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  },
  Sunday: {
    Breakfast: { name: 'Chole Puri & Lassi', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Lunch:     { name: 'Special Thali', photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
    Snacks:    { name: 'Gulab Jamun & Tea', photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
    Dinner:    { name: 'Dum Biryani & Shorba', photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
  },
};

// ── Sample events (added by Faculty / Committee, read-only for students) ──
const sampleEvents = [
  {
    id: 1,
    title: 'Annual Sports Day',
    date: '2025-02-10',
    time: '8:00 AM',
    category: 'Sports',
    color: '#f59e0b',
    description: 'Annual inter-hostel sports competition. All students must report to the ground by 7:45 AM.',
    postedBy: 'Committee',
  },
  {
    id: 2,
    title: 'Cultural Night',
    date: '2025-02-14',
    time: '6:00 PM',
    category: 'Cultural',
    color: '#ec4899',
    description: 'Evening of performances, music and dance. Participation forms available at the office.',
    postedBy: 'Faculty',
  },
  {
    id: 3,
    title: 'Fire Drill',
    date: '2025-02-07',
    time: '10:00 AM',
    category: 'Safety',
    color: '#ef4444',
    description: 'Mandatory fire drill for all hostel residents. Please evacuate calmly as per floor plan.',
    postedBy: 'Committee',
  },
  {
    id: 4,
    title: 'Hostel Fee Last Date',
    date: '2025-02-15',
    time: 'All Day',
    category: 'Admin',
    color: '#6366f1',
    description: 'Last date to pay hostel fee for Feb–Mar. Late fine of ₹50/day will be applied after this.',
    postedBy: 'Committee',
  },
  {
    id: 5,
    title: 'Guest Lecture: Career in Tech',
    date: '2025-02-12',
    time: '3:00 PM',
    category: 'Academic',
    color: '#10b981',
    description: 'Industry expert guest lecture in the seminar hall. Attendance is highly encouraged.',
    postedBy: 'Faculty',
  },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealIcons = { Breakfast: '☀️', Lunch: '🌤️', Snacks: '🌥️', Dinner: '🌙' };
const mealColors = {
  Breakfast: { bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)',  accent: '#fbbf24' },
  Lunch:     { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)',   accent: '#22c55e' },
  Snacks:    { bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)',  accent: '#fb923c' },
  Dinner:    { bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)',  accent: '#8b5cf6' },
};

function getToday() {
  return days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function daysUntil(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const event = new Date(dateStr); event.setHours(0,0,0,0);
  const diff = Math.round((event - today) / 86400000);
  if (diff < 0) return { label: 'Past', color: '#475569' };
  if (diff === 0) return { label: 'Today!', color: '#f87171' };
  if (diff === 1) return { label: 'Tomorrow', color: '#fb923c' };
  return { label: `In ${diff} days`, color: '#94a3b8' };
}

export default function Today() {
  const today = getToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const menu = weeklyMenu[selectedDay];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap');

        .today-scroll::-webkit-scrollbar { display: none; }
        .today-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .meal-card { transition: transform 0.2s, box-shadow 0.2s; }
        .meal-card:hover { transform: translateY(-2px); }

        .day-pill { transition: all 0.2s; cursor: pointer; }
        .day-pill:hover { opacity: 0.85; }

        .event-card { transition: transform 0.18s, box-shadow 0.18s; }
        .event-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
      `}</style>

      {/* ── Page wrapper: two columns, each independently scrollable ── */}
      <div style={{
        display: 'flex', gap: '20px',
        height: 'calc(100vh - 62px - 56px)',  /* viewport minus navbar minus page padding */
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* ════════════════════════════════
            LEFT COLUMN — Mess Menu
        ════════════════════════════════ */}
        <div style={{
          flex: '0 0 420px',
          display: 'flex', flexDirection: 'column',
          minWidth: 0,
        }}>

          {/* Header */}
          <div style={{ marginBottom: '16px' }} className="fade-up">
            <p style={{ margin: '0 0 4px', color: '#64748b', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Today's</p>
            <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>
              Mess Menu 🍽️
            </h2>
          </div>

          {/* Day selector pills */}
          <div style={{
            display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px',
          }} className="fade-up">
            {days.map(day => (
              <button
                key={day}
                className="day-pill"
                onClick={() => setSelectedDay(day)}
                style={{
                  padding: '5px 12px', borderRadius: '20px', border: 'none',
                  fontSize: '12px', fontWeight: 600,
                  background: selectedDay === day
                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                    : 'rgba(255,255,255,0.05)',
                  color: selectedDay === day ? '#fff' : '#64748b',
                  boxShadow: selectedDay === day ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
                  outline: day === today && selectedDay !== day ? '1px solid rgba(99,102,241,0.3)' : 'none',
                }}
              >
                {day.slice(0, 3)}
                {day === today && <span style={{ marginLeft: '4px', fontSize: '8px' }}>●</span>}
              </button>
            ))}
          </div>

          {/* Scrollable meal cards */}
          <div
            className="today-scroll"
            style={{
              flex: 1, overflowY: 'auto',
              display: 'flex', flexDirection: 'column', gap: '14px',
              paddingRight: '4px', paddingBottom: '16px',
            }}
          >
            {Object.entries(menu).map(([meal, data], idx) => {
              const colors = mealColors[meal];
              return (
                <div
                  key={meal}
                  className="meal-card fade-up"
                  style={{
                    borderRadius: '16px',
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    overflow: 'hidden',
                    animationDelay: `${idx * 0.08}s`,
                  }}
                >
                  {/* Meal photo */}
                  <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                    <img
                      src={data.photo}
                      alt={data.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 60%)',
                    }} />
                    {/* Meal label badge */}
                    <div style={{
                      position: 'absolute', top: '10px', left: '12px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '4px 10px', borderRadius: '20px',
                      background: 'rgba(10,15,30,0.7)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${colors.border}`,
                    }}>
                      <span style={{ fontSize: '13px' }}>{mealIcons[meal]}</span>
                      <span style={{ color: colors.accent, fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{meal}</span>
                    </div>
                  </div>

                  {/* Meal name */}
                  <div style={{ padding: '12px 16px' }}>
                    <p style={{ margin: 0, color: '#f1f5f9', fontSize: '15px', fontWeight: 600 }}>{data.name}</p>
                    <p style={{ margin: '4px 0 0', color: '#475569', fontSize: '12px' }}>
                      {meal === 'Breakfast' ? '7:30 – 9:00 AM'
                        : meal === 'Lunch'  ? '12:30 – 2:00 PM'
                        : meal === 'Snacks' ? '4:30 – 5:30 PM'
                        : '8:00 – 9:30 PM'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT COLUMN — Events
        ════════════════════════════════ */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          minWidth: 0,
        }}>

          {/* Header */}
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }} className="fade-up">
            <div>
              <p style={{ margin: '0 0 4px', color: '#64748b', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Upcoming</p>
              <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>
                Events & Notices 📌
              </h2>
            </div>
            <span style={{
              padding: '4px 12px', borderRadius: '20px',
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              color: '#a5b4fc', fontSize: '12px', fontWeight: 600,
              marginBottom: '4px',
            }}>
              {sampleEvents.length} events
            </span>
          </div>

          {/* Scrollable event cards */}
          <div
            className="today-scroll"
            style={{
              flex: 1, overflowY: 'auto',
              display: 'flex', flexDirection: 'column', gap: '12px',
              paddingRight: '4px', paddingBottom: '16px',
            }}
          >
            {sampleEvents
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event, idx) => {
                const { label, color: dColor } = daysUntil(event.date);
                return (
                  <div
                    key={event.id}
                    className="event-card fade-up"
                    style={{
                      borderRadius: '16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      padding: '18px 20px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                      animationDelay: `${idx * 0.07}s`,
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {/* Left color bar */}
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: '4px', background: event.color,
                      borderRadius: '16px 0 0 16px',
                    }} />

                    <div style={{ paddingLeft: '8px' }}>
                      {/* Top row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            {/* Category badge */}
                            <span style={{
                              padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700,
                              letterSpacing: '0.5px', textTransform: 'uppercase',
                              background: `${event.color}18`, color: event.color,
                              border: `1px solid ${event.color}30`,
                            }}>
                              {event.category}
                            </span>
                            {/* Posted by */}
                            <span style={{ color: '#475569', fontSize: '11px' }}>by {event.postedBy}</span>
                          </div>
                          <h3 style={{ margin: 0, color: '#f1f5f9', fontSize: '16px', fontWeight: 600, lineHeight: 1.3 }}>
                            {event.title}
                          </h3>
                        </div>

                        {/* Days until badge */}
                        <span style={{
                          padding: '4px 10px', borderRadius: '20px', whiteSpace: 'nowrap',
                          fontSize: '11px', fontWeight: 700,
                          background: `${dColor}15`, color: dColor,
                          border: `1px solid ${dColor}30`, flexShrink: 0,
                        }}>
                          {label}
                        </span>
                      </div>

                      {/* Description */}
                      <p style={{ margin: '0 0 12px', color: '#64748b', fontSize: '13px', lineHeight: '1.6' }}>
                        {event.description}
                      </p>

                      {/* Date & time */}
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <span style={{ color: '#475569', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          📅 {formatDate(event.date)}
                        </span>
                        <span style={{ color: '#475569', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          🕐 {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}