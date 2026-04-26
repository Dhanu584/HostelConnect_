import { useState } from 'react';

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const defaultMenu = {
  Monday:    { Breakfast:{name:'Poha & Masala Chai',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Lunch:{name:'Dal Tadka, Rice & Roti',photo:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'}, Snacks:{name:'Samosa & Mint Chutney',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Dinner:{name:'Paneer Butter Masala & Naan',photo:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'} },
  Tuesday:   { Breakfast:{name:'Idli & Sambar',photo:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80'}, Lunch:{name:'Rajma Chawal',photo:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'}, Snacks:{name:'Bread Pakora & Ketchup',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Dinner:{name:'Chole Bhature',photo:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'} },
  Wednesday: { Breakfast:{name:'Paratha & Curd',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Lunch:{name:'Mix Veg & Chapati',photo:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'}, Snacks:{name:'Veg Puff & Cold Coffee',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Dinner:{name:'Kadai Paneer & Rice',photo:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'} },
  Thursday:  { Breakfast:{name:'Upma & Coconut Chutney',photo:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80'}, Lunch:{name:'Aloo Matar & Roti',photo:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'}, Snacks:{name:'Dhokla & Green Chutney',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Dinner:{name:'Dal Makhani & Jeera Rice',photo:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'} },
  Friday:    { Breakfast:{name:'Puri Bhaji',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Lunch:{name:'Palak Paneer & Rice',photo:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'}, Snacks:{name:'French Fries & Sauce',photo:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80'}, Dinner:{name:'Biryani & Raita',photo:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80'} },
  Saturday:  { Breakfast:{name:'Dosa & Sambar',photo:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80'}, Lunch:{name:'Chana Masala & Bhatura',photo:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'}, Snacks:{name:'Maggi & Juice',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Dinner:{name:'Shahi Paneer & Laccha Paratha',photo:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'} },
  Sunday:    { Breakfast:{name:'Chole Puri & Lassi',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Lunch:{name:'Special Thali',photo:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'}, Snacks:{name:'Gulab Jamun & Tea',photo:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'}, Dinner:{name:'Dum Biryani & Shorba',photo:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80'} },
};
const defaultEvents = [
  { id:1, title:'Annual Sports Day',   date:'2025-02-10', time:'8:00 AM',  category:'Sports',   color:'#f59e0b', description:'Annual inter-hostel sports competition.', postedBy:'Committee' },
  { id:2, title:'Cultural Night',       date:'2025-02-14', time:'6:00 PM',  category:'Cultural', color:'#ec4899', description:'Evening of performances, music and dance.', postedBy:'Faculty'   },
  { id:3, title:'Fire Drill',           date:'2025-02-07', time:'10:00 AM', category:'Safety',   color:'#ef4444', description:'Mandatory fire drill for all hostel residents.', postedBy:'Committee' },
];
const mealIcons  = { Breakfast:'☀️', Lunch:'🌤️', Snacks:'🌥️', Dinner:'🌙' };
const mealColors = {
  Breakfast:{ bg:'rgba(251,191,36,0.08)',  border:'rgba(251,191,36,0.2)',  accent:'#fbbf24' },
  Lunch:    { bg:'rgba(34,197,94,0.08)',   border:'rgba(34,197,94,0.2)',   accent:'#22c55e' },
  Snacks:   { bg:'rgba(251,146,60,0.08)',  border:'rgba(251,146,60,0.2)',  accent:'#fb923c' },
  Dinner:   { bg:'rgba(139,92,246,0.08)', border:'rgba(139,92,246,0.2)', accent:'#8b5cf6' },
};
const mealTimes  = { Breakfast:'7:30–9:00 AM', Lunch:'12:30–2:00 PM', Snacks:'4:30–5:30 PM', Dinner:'8:00–9:30 PM' };
const categories = ['Sports','Cultural','Safety','Admin','Academic','General'];
const catColors  = { Sports:'#f59e0b', Cultural:'#ec4899', Safety:'#ef4444', Admin:'#6366f1', Academic:'#10b981', General:'#94a3b8' };

function getToday(){ return days[new Date().getDay()===0?6:new Date().getDay()-1]; }
function formatDate(d){ return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); }
function daysUntil(ds){
  const t=new Date();t.setHours(0,0,0,0);
  const e=new Date(ds);e.setHours(0,0,0,0);
  const d=Math.round((e-t)/86400000);
  if(d<0) return{label:'Past',color:'#475569'};
  if(d===0) return{label:'Today!',color:'#f87171'};
  if(d===1) return{label:'Tomorrow',color:'#fb923c'};
  return{label:`In ${d} days`,color:'#94a3b8'};
}

const inp = (extra={}) => ({ width:'100%', padding:'9px 12px', borderRadius:'8px', background:'#0d1a0f', border:'1px solid rgba(16,185,129,0.2)', color:'#ecfdf5', fontSize:'13px', outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", ...extra });

export default function FacultyToday() {
  const today = getToday();
  const [selDay,  setSelDay]  = useState(today);
  const [menu,    setMenu]    = useState(defaultMenu);
  const [events,  setEvents]  = useState(defaultEvents);
  const [editMeal,setEditMeal]= useState(null);
  const [mDraft,  setMDraft]  = useState({name:'',photo:''});
  const [showEvt, setShowEvt] = useState(false);
  const [editEvt, setEditEvt] = useState(null);
  const [eDraft,  setEDraft]  = useState({title:'',date:'',time:'',category:'General',description:''});

  const openMealEdit=(day,meal)=>{ setEditMeal({day,meal}); setMDraft({...menu[day][meal]}); };
  const saveMeal=()=>{ setMenu(p=>({...p,[editMeal.day]:{...p[editMeal.day],[editMeal.meal]:{...mDraft}}})); setEditMeal(null); };

  const openNew=()=>{ setEditEvt(null); setEDraft({title:'',date:'',time:'',category:'General',description:''}); setShowEvt(true); };
  const openEdit=(ev)=>{ setEditEvt(ev); setEDraft({title:ev.title,date:ev.date,time:ev.time,category:ev.category,description:ev.description}); setShowEvt(true); };
  const saveEvt=()=>{
    if(!eDraft.title||!eDraft.date) return;
    if(editEvt) setEvents(p=>p.map(e=>e.id===editEvt.id?{...e,...eDraft,color:catColors[eDraft.category],postedBy:'Faculty'}:e));
    else setEvents(p=>[...p,{id:Date.now(),...eDraft,color:catColors[eDraft.category],postedBy:'Faculty'}]);
    setShowEvt(false);
  };
  const delEvt=(id)=>setEvents(p=>p.filter(e=>e.id!==id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap');
        .fsc::-webkit-scrollbar{display:none}.fsc{-ms-overflow-style:none;scrollbar-width:none}
        .fmc{transition:transform 0.2s,box-shadow 0.2s}.fmc:hover{transform:translateY(-2px)}
        .feb{opacity:0;transition:opacity 0.18s}.fmc:hover .feb{opacity:1}
        .fec{transition:transform 0.18s}.fec:hover{transform:translateY(-2px)}
        @keyframes ffu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .ffu{animation:ffu 0.35s ease both}
        .fovl{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:200;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
        .fmdl{background:#081208;border:1px solid rgba(16,185,129,0.2);border-radius:16px;padding:28px;width:100%;max-width:440px;max-height:90vh;overflow-y:auto}
        .fmdl::-webkit-scrollbar{display:none}
      `}</style>

      <div style={{display:'flex',gap:'20px',height:'calc(100vh - 62px - 56px)',fontFamily:"'DM Sans',sans-serif"}}>

        {/* LEFT — Mess Menu */}
        <div style={{flex:'0 0 430px',display:'flex',flexDirection:'column',minWidth:0}}>
          <div style={{marginBottom:'14px'}} className="ffu">
            <p style={{margin:'0 0 3px',color:'#6b7280',fontSize:'12px',letterSpacing:'1px',textTransform:'uppercase',fontWeight:600}}>Edit Weekly</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <h2 style={{margin:0,fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:700,color:'#ecfdf5'}}>Mess Menu 🍽️</h2>
              <span style={{padding:'3px 10px',borderRadius:'20px',background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.2)',color:'#6ee7b7',fontSize:'11px',fontWeight:700}}>RECTOR</span>
            </div>
          </div>

          {/* Day pills */}
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'14px'}} className="ffu">
            {days.map(day=>(
              <button key={day} onClick={()=>setSelDay(day)} style={{
                padding:'5px 12px',borderRadius:'20px',border:'none',fontSize:'12px',fontWeight:600,cursor:'pointer',
                background:selDay===day?'linear-gradient(135deg,#10b981,#059669)':'rgba(255,255,255,0.05)',
                color:selDay===day?'#fff':'#6b7280',
                boxShadow:selDay===day?'0 0 12px rgba(16,185,129,0.35)':'none',
                outline:day===today&&selDay!==day?'1px solid rgba(16,185,129,0.3)':'none',
              }}>{day.slice(0,3)}{day===today&&<span style={{marginLeft:'4px',fontSize:'8px'}}>●</span>}</button>
            ))}
          </div>

          {/* Meal cards */}
          <div className="fsc" style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:'12px',paddingBottom:'16px'}}>
            {Object.entries(menu[selDay]).map(([meal,data],idx)=>{
              const c=mealColors[meal];
              return (
                <div key={meal} className="fmc ffu" style={{borderRadius:'14px',background:c.bg,border:`1px solid ${c.border}`,overflow:'hidden',animationDelay:`${idx*0.07}s`,position:'relative'}}>
                  <div style={{position:'relative',height:'130px',overflow:'hidden'}}>
                    <img src={data.photo} alt={data.name} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>e.target.style.display='none'}/>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,14,10,0.85) 0%,transparent 60%)'}}/>
                    <div style={{position:'absolute',top:'10px',left:'12px',display:'flex',alignItems:'center',gap:'5px',padding:'3px 9px',borderRadius:'20px',background:'rgba(5,14,10,0.7)',backdropFilter:'blur(8px)',border:`1px solid ${c.border}`}}>
                      <span style={{fontSize:'12px'}}>{mealIcons[meal]}</span>
                      <span style={{color:c.accent,fontSize:'10px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px'}}>{meal}</span>
                    </div>
                    <button className="feb" onClick={()=>openMealEdit(selDay,meal)}
                      style={{position:'absolute',top:'10px',right:'12px',padding:'4px 10px',borderRadius:'8px',background:'rgba(16,185,129,0.9)',border:'none',color:'#fff',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
                      ✏️ Edit
                    </button>
                  </div>
                  <div style={{padding:'10px 14px'}}>
                    <p style={{margin:0,color:'#ecfdf5',fontSize:'14px',fontWeight:600}}>{data.name}</p>
                    <p style={{margin:'3px 0 0',color:'#4b5563',fontSize:'12px'}}>{mealTimes[meal]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Events */}
        <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0}}>
          <div style={{marginBottom:'14px',display:'flex',alignItems:'flex-end',justifyContent:'space-between'}} className="ffu">
            <div>
              <p style={{margin:'0 0 3px',color:'#6b7280',fontSize:'12px',letterSpacing:'1px',textTransform:'uppercase',fontWeight:600}}>Manage</p>
              <h2 style={{margin:0,fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:700,color:'#ecfdf5'}}>Events & Notices 📌</h2>
            </div>
            <button onClick={openNew} style={{padding:'8px 16px',borderRadius:'10px',border:'none',marginBottom:'4px',background:'linear-gradient(135deg,#10b981,#059669)',color:'#fff',fontSize:'13px',fontWeight:600,cursor:'pointer',boxShadow:'0 0 14px rgba(16,185,129,0.3)'}}>+ Add Event</button>
          </div>

          <div className="fsc" style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:'10px',paddingBottom:'16px'}}>
            {events.sort((a,b)=>new Date(a.date)-new Date(b.date)).map((ev,idx)=>{
              const{label,color:dc}=daysUntil(ev.date);
              return (
                <div key={ev.id} className="fec ffu" style={{borderRadius:'14px',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',padding:'16px 18px',position:'relative',overflow:'hidden',boxShadow:'0 2px 10px rgba(0,0,0,0.2)',animationDelay:`${idx*0.06}s`}}>
                  <div style={{position:'absolute',left:0,top:0,bottom:0,width:'4px',background:ev.color,borderRadius:'14px 0 0 14px'}}/>
                  <div style={{paddingLeft:'8px'}}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'10px',marginBottom:'6px'}}>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'4px',flexWrap:'wrap'}}>
                          <span style={{padding:'2px 7px',borderRadius:'6px',fontSize:'10px',fontWeight:700,textTransform:'uppercase',background:`${ev.color}18`,color:ev.color,border:`1px solid ${ev.color}30`}}>{ev.category}</span>
                          <span style={{color:'#4b5563',fontSize:'11px'}}>by {ev.postedBy}</span>
                        </div>
                        <h3 style={{margin:0,color:'#ecfdf5',fontSize:'15px',fontWeight:600}}>{ev.title}</h3>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'6px',flexShrink:0}}>
                        <span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'11px',fontWeight:700,background:`${dc}15`,color:dc,border:`1px solid ${dc}30`}}>{label}</span>
                        <button onClick={()=>openEdit(ev)} style={{padding:'4px 8px',borderRadius:'7px',background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.2)',color:'#6ee7b7',cursor:'pointer',fontSize:'12px'}}>✏️</button>
                        <button onClick={()=>delEvt(ev.id)} style={{padding:'4px 8px',borderRadius:'7px',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.15)',color:'#f87171',cursor:'pointer',fontSize:'12px'}}>🗑️</button>
                      </div>
                    </div>
                    <p style={{margin:'0 0 10px',color:'#6b7280',fontSize:'13px',lineHeight:'1.55'}}>{ev.description}</p>
                    <div style={{display:'flex',gap:'14px'}}>
                      <span style={{color:'#4b5563',fontSize:'12px'}}>📅 {formatDate(ev.date)}</span>
                      <span style={{color:'#4b5563',fontSize:'12px'}}>🕐 {ev.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Meal Edit Modal */}
      {editMeal && (
        <div className="fovl" onClick={()=>setEditMeal(null)}>
          <div className="fmdl" onClick={e=>e.stopPropagation()}>
            <h3 style={{margin:'0 0 20px',color:'#ecfdf5',fontFamily:"'Playfair Display',serif",fontSize:'20px'}}>Edit {editMeal.meal} — {editMeal.day}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <div>
                <label style={{display:'block',color:'#6b7280',fontSize:'12px',fontWeight:600,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Dish Name</label>
                <input style={inp()} value={mDraft.name} onChange={e=>setMDraft(p=>({...p,name:e.target.value}))} placeholder="e.g. Poha & Masala Chai"/>
              </div>
              <div>
                <label style={{display:'block',color:'#6b7280',fontSize:'12px',fontWeight:600,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Photo URL</label>
                <input style={inp()} value={mDraft.photo} onChange={e=>setMDraft(p=>({...p,photo:e.target.value}))} placeholder="https://..."/>
              </div>
              {mDraft.photo && <img src={mDraft.photo} alt="preview" style={{width:'100%',height:'120px',objectFit:'cover',borderRadius:'10px',border:'1px solid rgba(16,185,129,0.2)'}} onError={e=>e.target.style.display='none'}/>}
            </div>
            <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
              <button onClick={saveMeal} style={{flex:1,padding:'10px',borderRadius:'10px',border:'none',background:'linear-gradient(135deg,#10b981,#059669)',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'14px'}}>Save Changes</button>
              <button onClick={()=>setEditMeal(null)} style={{flex:1,padding:'10px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'#9ca3af',cursor:'pointer',fontSize:'14px'}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEvt && (
        <div className="fovl" onClick={()=>setShowEvt(false)}>
          <div className="fmdl" onClick={e=>e.stopPropagation()}>
            <h3 style={{margin:'0 0 20px',color:'#ecfdf5',fontFamily:"'Playfair Display',serif",fontSize:'20px'}}>{editEvt?'Edit Event':'Add New Event'}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <div>
                <label style={{display:'block',color:'#6b7280',fontSize:'12px',fontWeight:600,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Title *</label>
                <input style={inp()} value={eDraft.title} onChange={e=>setEDraft(p=>({...p,title:e.target.value}))} placeholder="Event title"/>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <div style={{flex:1}}>
                  <label style={{display:'block',color:'#6b7280',fontSize:'12px',fontWeight:600,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Date *</label>
                  <input type="date" style={inp()} value={eDraft.date} onChange={e=>setEDraft(p=>({...p,date:e.target.value}))}/>
                </div>
                <div style={{flex:1}}>
                  <label style={{display:'block',color:'#6b7280',fontSize:'12px',fontWeight:600,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Time</label>
                  <input style={inp()} value={eDraft.time} onChange={e=>setEDraft(p=>({...p,time:e.target.value}))} placeholder="10:00 AM"/>
                </div>
              </div>
              <div>
                <label style={{display:'block',color:'#6b7280',fontSize:'12px',fontWeight:600,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Category</label>
                <select style={inp({cursor:'pointer'})} value={eDraft.category} onChange={e=>setEDraft(p=>({...p,category:e.target.value}))}>
                  {categories.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{display:'block',color:'#6b7280',fontSize:'12px',fontWeight:600,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Description</label>
                <textarea style={inp({resize:'vertical',minHeight:'80px'})} value={eDraft.description} onChange={e=>setEDraft(p=>({...p,description:e.target.value}))} placeholder="Details..."/>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
              <button onClick={saveEvt} style={{flex:1,padding:'10px',borderRadius:'10px',border:'none',background:'linear-gradient(135deg,#10b981,#059669)',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'14px'}}>{editEvt?'Save Changes':'Add Event'}</button>
              <button onClick={()=>setShowEvt(false)} style={{flex:1,padding:'10px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'#9ca3af',cursor:'pointer',fontSize:'14px'}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}