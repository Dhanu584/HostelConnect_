import { useState } from "react";

// ── Sample seed data ──────────────────────────────────────────────────────────
const SEED_ITEMS = [
  {
    id: 1,
    title: "Engineering Drawing Kit",
    price: 180,
    category: "Stationery",
    description: "Complete Staedtler drawing set — compass, drafter, scales. Used for 1 semester only. Like new condition.",
    contact: "Rahul Sharma — 9876543210",
    sellerRoom: "A-204",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80",
    postedOn: "27 Apr 2026",
  },
  {
    id: 2,
    title: "Organic Chemistry Textbook",
    price: 250,
    category: "Books",
    description: "Morrison & Boyd, 7th Edition. Minimal highlighting, all pages intact. Perfect for 2nd year students.",
    contact: "Priya Nair — 9123456780",
    sellerRoom: "C-108",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
    postedOn: "26 Apr 2026",
  },
  {
    id: 3,
    title: "Casio fx-991EX Calculator",
    price: 700,
    category: "Electronics",
    description: "Scientific calculator with 552 functions. Bought last year, works perfectly. Original box included.",
    contact: "Aman Verma — 9001234567",
    sellerRoom: "B-312",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    postedOn: "25 Apr 2026",
  },
  {
    id: 4,
    title: "Cycle — Hero Sprint",
    price: 1500,
    category: "Transport",
    description: "Hero Sprint 26T mountain bike. Minor scratches but mechanically sound. Great for campus rides.",
    contact: "Deepa Iyer — 9812345670",
    sellerRoom: "D-401",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400&q=80",
    postedOn: "24 Apr 2026",
  },
  {
    id: 5,
    title: "Desk Lamp (LED)",
    price: 300,
    category: "Electronics",
    description: "Adjustable neck LED desk lamp with USB charging port. Energy saving. Moving out, must sell.",
    contact: "Kiran Patel — 9765432100",
    sellerRoom: "A-115",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
    postedOn: "23 Apr 2026",
  },
  {
    id: 6,
    title: "Data Structures Notes (Hand-written)",
    price: 80,
    category: "Notes",
    description: "Complete semester notes for DS & Algo. Covers trees, graphs, DP. Very neat handwriting.",
    contact: "Sneha Reddy — 9654321089",
    sellerRoom: "C-220",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
    postedOn: "22 Apr 2026",
  },
];

const CATEGORIES = ["All", "Books", "Electronics", "Stationery", "Notes", "Transport", "Other"];

const categoryColors = {
  Books: "#f59e0b",
  Electronics: "#3b82f6",
  Stationery: "#10b981",
  Notes: "#8b5cf6",
  Transport: "#ef4444",
  Other: "#6b7280",
};

const categoryEmoji = {
  Books: "📚", Electronics: "⚡", Stationery: "✏️", Notes: "📝", Transport: "🚲", Other: "📦",
};

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .bs-root {
    font-family: 'DM Sans', sans-serif;
    background: #0f0f13;
    color: #e8e6f0;
    min-height: 100vh;
    padding: 0 0 60px 0;
  }

  .bs-header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    padding: 28px 32px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .bs-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .bs-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .bs-logo-icon {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, #e94560, #f7971e);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .bs-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .bs-logo-text span { color: #e94560; }

  .bs-tabs {
    display: flex;
    gap: 4px;
    background: rgba(255,255,255,0.05);
    border-radius: 12px 12px 0 0;
    padding: 6px 6px 0;
    width: fit-content;
  }
  .bs-tab {
    padding: 10px 28px;
    border-radius: 10px 10px 0 0;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.3px;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    background: transparent;
    color: rgba(255,255,255,0.4);
  }
  .bs-tab.active {
    background: #0f0f13;
    color: #fff;
  }
  .bs-tab.active.sell { color: #e94560; }
  .bs-tab.active.browse { color: #3b82f6; }
  .bs-tab-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #3b82f6;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    border-radius: 20px;
    padding: 1px 6px;
    margin-left: 6px;
  }

  .bs-content { padding: 28px 32px; }

  /* BROWSE */
  .bs-search-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px 18px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 16px;
  }
  .bs-search-input:focus { border-color: #3b82f6; }
  .bs-search-input::placeholder { color: rgba(255,255,255,0.3); }

  .bs-cat-scroll {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }
  .bs-cat-scroll::-webkit-scrollbar { display: none; }
  .bs-cat-pill {
    padding: 7px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: rgba(255,255,255,0.5);
    transition: all 0.2s;
  }
  .bs-cat-pill.active {
    background: rgba(59,130,246,0.15);
    border-color: #3b82f6;
    color: #3b82f6;
  }

  .bs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 18px;
  }
  .bs-card {
    background: #1a1a24;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .bs-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
    border-color: rgba(255,255,255,0.15);
  }
  .bs-card-img {
    width: 100%; height: 160px;
    object-fit: cover;
    display: block;
  }
  .bs-card-img-placeholder {
    width: 100%; height: 160px;
    background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
    display: flex; align-items: center; justify-content: center;
    font-size: 40px;
  }
  .bs-card-body { padding: 14px; }
  .bs-card-cat {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 20px;
    margin-bottom: 8px;
  }
  .bs-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 6px;
    line-height: 1.3;
  }
  .bs-card-price {
    font-size: 18px;
    font-weight: 700;
    color: #10b981;
  }
  .bs-card-price span {
    font-size: 12px;
    font-weight: 400;
    color: rgba(255,255,255,0.35);
    margin-left: 4px;
  }
  .bs-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 12px;
    color: rgba(255,255,255,0.35);
  }

  /* MODAL */
  .bs-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .bs-modal {
    background: #1a1a24;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    width: 100%;
    max-width: 520px;
    overflow: hidden;
    animation: slideUp 0.25s ease;
  }
  @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .bs-modal-img {
    width: 100%; height: 220px;
    object-fit: cover;
    display: block;
  }
  .bs-modal-img-placeholder {
    width: 100%; height: 220px;
    background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
    display: flex; align-items: center; justify-content: center;
    font-size: 64px;
  }
  .bs-modal-body { padding: 24px; }
  .bs-modal-top {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 14px; gap: 12px;
  }
  .bs-modal-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    line-height: 1.2;
    flex: 1;
  }
  .bs-modal-close {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .bs-modal-close:hover { background: rgba(255,255,255,0.14); }
  .bs-modal-price {
    font-size: 28px;
    font-weight: 800;
    color: #10b981;
    margin-bottom: 14px;
  }
  .bs-modal-desc {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255,255,255,0.65);
    margin-bottom: 20px;
  }
  .bs-modal-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }
  .bs-info-block {
    background: rgba(255,255,255,0.04);
    border-radius: 10px;
    padding: 12px;
  }
  .bs-info-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 4px;
  }
  .bs-info-value { font-size: 14px; font-weight: 500; }
  .bs-contact-box {
    background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(59,130,246,0.08));
    border: 1px solid rgba(16,185,129,0.25);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .bs-contact-icon {
    width: 40px; height: 40px;
    background: rgba(16,185,129,0.2);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .bs-contact-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    margin-bottom: 2px;
  }
  .bs-contact-value { font-size: 15px; font-weight: 600; color: #10b981; }

  /* SELL FORM */
  .bs-sell-header { margin-bottom: 28px; }
  .bs-sell-title {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 6px;
  }
  .bs-sell-subtitle { font-size: 14px; color: rgba(255,255,255,0.45); }
  .bs-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 560px;
  }
  .bs-field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 7px;
  }
  .bs-field input,
  .bs-field textarea,
  .bs-field select {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 13px 16px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }
  .bs-field input:focus,
  .bs-field textarea:focus,
  .bs-field select:focus { border-color: #e94560; }
  .bs-field select option { background: #1a1a24; }
  .bs-field input::placeholder,
  .bs-field textarea::placeholder { color: rgba(255,255,255,0.25); }
  .bs-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .bs-submit-btn {
    margin-top: 6px;
    padding: 15px 32px;
    background: linear-gradient(135deg, #e94560, #f7971e);
    border: none;
    border-radius: 14px;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: opacity 0.2s, transform 0.15s;
    align-self: flex-start;
  }
  .bs-submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .bs-submit-btn:active { transform: translateY(0); }

  .bs-toast {
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    background: #10b981;
    color: #fff;
    padding: 14px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    z-index: 200;
    animation: toastIn 0.3s ease;
    box-shadow: 0 8px 30px rgba(16,185,129,0.4);
  }
  @keyframes toastIn {
    from { transform: translateX(-50%) translateY(20px); opacity:0; }
    to   { transform: translateX(-50%) translateY(0); opacity:1; }
  }

  .bs-empty {
    text-align: center;
    padding: 60px 20px;
    color: rgba(255,255,255,0.3);
  }
  .bs-empty-icon { font-size: 48px; margin-bottom: 12px; }
  .bs-empty-text { font-size: 16px; font-weight: 500; }
`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function BuySell() {
  const [tab, setTab] = useState("browse");
  const [items, setItems] = useState(SEED_ITEMS);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [toast, setToast] = useState(false);

  const [form, setForm] = useState({
    title: "", price: "", category: "Books",
    description: "", contact: "", sellerRoom: "", image: "",
  });

  const filtered = items.filter((it) => {
    const matchCat = activeCat === "All" || it.category === activeCat;
    const matchSearch =
      it.title.toLowerCase().includes(search.toLowerCase()) ||
      it.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.title.trim() || !form.price || !form.contact.trim()) return;
    const newItem = {
      id: Date.now(),
      title: form.title,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      contact: form.contact,
      sellerRoom: form.sellerRoom,
      image: form.image || null,
      postedOn: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setItems([newItem, ...items]);
    setForm({ title: "", price: "", category: "Books", description: "", contact: "", sellerRoom: "", image: "" });
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    setTab("browse");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="bs-root">
        {/* Header */}
        <div className="bs-header">
          <div className="bs-header-top">
            <div className="bs-logo">
              <div className="bs-logo-icon">🏪</div>
              <div className="bs-logo-text">Hostel <span>Bazaar</span></div>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
              {items.length} active listings
            </div>
          </div>
          <div className="bs-tabs">
            <button
              className={`bs-tab browse ${tab === "browse" ? "active" : ""}`}
              onClick={() => setTab("browse")}
            >
              🛒 Browse
              <span className="bs-tab-badge">{items.length}</span>
            </button>
            <button
              className={`bs-tab sell ${tab === "sell" ? "active" : ""}`}
              onClick={() => setTab("sell")}
            >
              📤 Sell Item
            </button>
          </div>
        </div>

        <div className="bs-content">
          {/* ── BROWSE ── */}
          {tab === "browse" && (
            <>
              <input
                className="bs-search-input"
                placeholder="🔍  Search items, categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="bs-cat-scroll">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className={`bs-cat-pill ${activeCat === c ? "active" : ""}`}
                    onClick={() => setActiveCat(c)}
                  >
                    {c !== "All" && categoryEmoji[c] + " "}{c}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="bs-empty">
                  <div className="bs-empty-icon">🔍</div>
                  <div className="bs-empty-text">No items found</div>
                </div>
              ) : (
                <div className="bs-grid">
                  {filtered.map((item) => (
                    <div key={item.id} className="bs-card" onClick={() => setSelected(item)}>
                      {item.image
                        ? <img src={item.image} alt={item.title} className="bs-card-img" />
                        : <div className="bs-card-img-placeholder">{categoryEmoji[item.category] || "📦"}</div>
                      }
                      <div className="bs-card-body">
                        <span
                          className="bs-card-cat"
                          style={{
                            background: `${categoryColors[item.category] || "#6b7280"}22`,
                            color: categoryColors[item.category] || "#6b7280",
                          }}
                        >
                          {item.category}
                        </span>
                        <div className="bs-card-title">{item.title}</div>
                        <div className="bs-card-price">
                          ₹{item.price.toLocaleString()}
                          <span>negotiable</span>
                        </div>
                        <div className="bs-card-footer">
                          <span>🏠 {item.sellerRoom || "—"}</span>
                          <span>{item.postedOn}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── SELL ── */}
          {tab === "sell" && (
            <>
              <div className="bs-sell-header">
                <div className="bs-sell-title">List Your Item</div>
                <div className="bs-sell-subtitle">
                  Fill in the details — your listing goes live instantly for all students.
                </div>
              </div>
              <div className="bs-form">
                <div className="bs-field">
                  <label>Item Title *</label>
                  <input
                    name="title" value={form.title} onChange={handleFormChange}
                    placeholder="e.g. Fluid Mechanics Textbook"
                  />
                </div>
                <div className="bs-form-row">
                  <div className="bs-field">
                    <label>Price (₹) *</label>
                    <input
                      name="price" type="number" value={form.price} onChange={handleFormChange}
                      placeholder="e.g. 350"
                    />
                  </div>
                  <div className="bs-field">
                    <label>Category</label>
                    <select name="category" value={form.category} onChange={handleFormChange}>
                      {CATEGORIES.filter(c => c !== "All").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bs-field">
                  <label>Description</label>
                  <textarea
                    name="description" rows={3} value={form.description} onChange={handleFormChange}
                    placeholder="Condition, edition, why selling, anything relevant…"
                  />
                </div>
                <div className="bs-form-row">
                  <div className="bs-field">
                    <label>Your Contact (Name + Phone) *</label>
                    <input
                      name="contact" value={form.contact} onChange={handleFormChange}
                      placeholder="e.g. Rahul — 9876543210"
                    />
                  </div>
                  <div className="bs-field">
                    <label>Room Number</label>
                    <input
                      name="sellerRoom" value={form.sellerRoom} onChange={handleFormChange}
                      placeholder="e.g. B-204"
                    />
                  </div>
                </div>
                <div className="bs-field">
                  <label>Image URL (optional)</label>
                  <input
                    name="image" value={form.image} onChange={handleFormChange}
                    placeholder="Paste a direct image link…"
                  />
                </div>
                <button className="bs-submit-btn" onClick={handleSubmit}>
                  🚀 Post Listing
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── ITEM DETAIL MODAL ── */}
        {selected && (
          <div className="bs-modal-overlay" onClick={() => setSelected(null)}>
            <div className="bs-modal" onClick={(e) => e.stopPropagation()}>
              {selected.image
                ? <img src={selected.image} alt={selected.title} className="bs-modal-img" />
                : <div className="bs-modal-img-placeholder">{categoryEmoji[selected.category] || "📦"}</div>
              }
              <div className="bs-modal-body">
                <div className="bs-modal-top">
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        background: `${categoryColors[selected.category] || "#6b7280"}22`,
                        color: categoryColors[selected.category] || "#6b7280",
                        fontSize: 11, fontWeight: 700, letterSpacing: "0.5px",
                        textTransform: "uppercase", padding: "3px 9px",
                        borderRadius: 20, marginBottom: 8,
                      }}
                    >
                      {selected.category}
                    </span>
                    <div className="bs-modal-title">{selected.title}</div>
                  </div>
                  <button className="bs-modal-close" onClick={() => setSelected(null)}>✕</button>
                </div>

                <div className="bs-modal-price">₹{selected.price.toLocaleString()}</div>
                <div className="bs-modal-desc">{selected.description || "No description provided."}</div>

                <div className="bs-modal-info-grid">
                  <div className="bs-info-block">
                    <div className="bs-info-label">Room</div>
                    <div className="bs-info-value">{selected.sellerRoom || "—"}</div>
                  </div>
                  <div className="bs-info-block">
                    <div className="bs-info-label">Listed On</div>
                    <div className="bs-info-value">{selected.postedOn}</div>
                  </div>
                </div>

                <div className="bs-contact-box">
                  <div className="bs-contact-icon">📞</div>
                  <div>
                    <div className="bs-contact-label">Contact Seller to Buy</div>
                    <div className="bs-contact-value">{selected.contact}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="bs-toast">✅ Item listed successfully! Redirecting to Browse…</div>
        )}
      </div>
    </>
  );
}