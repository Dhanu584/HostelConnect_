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
  { id:2, title:'Cultural Night',       date:'2025-02-14', time:'6:00 PM',  category:'Cultural', color:'#a78bfa', description:'Evening of performances, music and dance.', postedBy:'Faculty'   },
  { id:3, title:'Fire Drill',           date:'2025-02-07', time:'10:00 AM', category:'Safety',   color:'#f87171', description:'Mandatory fire drill for all hostel residents.', postedBy:'Committee' },
];
const mealIcons  = { Breakfast:'☀️', Lunch:'🌤️', Snacks:'🌥️', Dinner:'🌙' };
const mealColors = {
  Breakfast: { bg:'#fffbeb', border:'#fde68a', accent:'#d97706', pill:'#fef3c7' },
  Lunch:     { bg:'#f0fdf4', border:'#bbf7d0', accent:'#16a34a', pill:'#dcfce7' },
  Snacks:    { bg:'#fff7ed', border:'#fed7aa', accent:'#ea580c', pill:'#ffedd5' },
  Dinner:    { bg:'#f5f3ff', border:'#ddd6fe', accent:'#7c3aed', pill:'#ede9fe' },
};
const mealTimes  = { Breakfast:'7:30–9:00 AM', Lunch:'12:30–2:00 PM', Snacks:'4:30–5:30 PM', Dinner:'8:00–9:30 PM' };
const categories = ['Sports','Cultural','Safety','Admin','Academic','General'];
const catColors  = { Sports:'#f59e0b', Cultural:'#a78bfa', Safety:'#f87171', Admin:'#60a5fa', Academic:'#34d399', General:'#94a3b8' };

function getToday(){ return days[new Date().getDay()===0?6:new Date().getDay()-1]; }
function formatDate(d){ return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); }
function daysUntil(ds){
  const t=new Date();t.setHours(0,0,0,0);
  const e=new Date(ds);e.setHours(0,0,0,0);
  const d=Math.round((e-t)/86400000);
  if(d<0) return{label:'Past',color:'#9ca3af',bg:'#f3f4f6'};
  if(d===0) return{label:'Today!',color:'#dc2626',bg:'#fef2f2'};
  if(d===1) return{label:'Tomorrow',color:'#d97706',bg:'#fffbeb'};
  return{label:`In ${d} days`,color:'#6b7280',bg:'#f9fafb'};
}

const inp = (extra={}) => ({
  width:'100%', padding:'9px 12px', borderRadius:'10px',
  background:'#f8faf8', border:'1.5px solid #d1e8d6',
  color:'#1e293b', fontSize:'13px', outline:'none',
  boxSizing:'border-box', fontFamily:"'Nunito',sans-serif",
  ...extra
});

export default function FacultyToday() {
  const today = getToday();
  const [selDay,  setSelDay]  = useState(today);
  const [menu,    setMenu]    = useState(defaultMenu);
  const [events,  setEvents]  = useState(defaultEvents);
  const [editMeal,setEditMeal]= useState(null);
  const [mDraft,  setMDraft]  = useState({name:'',photo:''});
  const [imageFile, setImageFile] = useState(null);
  const [showEvt, setShowEvt] = useState(false);
  const [editEvt, setEditEvt] = useState(null);
  const [eDraft,  setEDraft]  = useState({title:'',date:'',time:'',category:'General',description:''});

  const openMealEdit=(day,meal)=>{ setEditMeal({day,meal}); setMDraft({...menu[day][meal]}); setImageFile(null); };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setMDraft(p=>({...p,photo:reader.result}));
      reader.readAsDataURL(file);
    }
  };
  const saveMeal=()=>{ setMenu(p=>({...p,[editMeal.day]:{...p[editMeal.day],[editMeal.meal]:{...mDraft}}})); setEditMeal(null); setImageFile(null); };

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
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Fraunces:wght@600;700&display=swap');
        .fsc::-webkit-scrollbar{width:5px}.fsc::-webkit-scrollbar-track{background:#f0f4f0;border-radius:10px}.fsc::-webkit-scrollbar-thumb{background:#c7d9c0;border-radius:10px}.fsc::-webkit-scrollbar-thumb:hover{background:#9dbb96}
        .fsc{scrollbar-width:thin;scrollbar-color:#c7d9c0 #f0f4f0}
        .fmc{transition:transform 0.2s,box-shadow 0.2s}.fmc:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(100,130,90,0.13) !important}
        .feb{opacity:0;transition:opacity 0.18s}.fmc:hover .feb{opacity:1}
        .fec{transition:transform 0.18s,box-shadow 0.18s}.fec:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(100,120,90,0.12) !important}
        @keyframes ffu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .ffu{animation:ffu 0.35s ease both}
        .fovl{position:fixed;inset:0;background:rgba(30,41,59,0.45);z-index:200;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)}
        .fmdl{background:#ffffff;border:1.5px solid #d1e8d6;border-radius:20px;padding:28px;width:100%;max-width:440px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(100,130,90,0.18)}
        .fmdl::-webkit-scrollbar{display:none}
      `}</style>

      <div style={{display:'flex',gap:'20px',height:'calc(100vh - 62px - 56px)',fontFamily:"'Nunito',sans-serif"}}>

        {/* LEFT — Mess Menu */}
        <div style={{flex:'0 0 430px',display:'flex',flexDirection:'column',minWidth:0}}>
          <div style={{marginBottom:'14px'}} className="ffu">
            <p style={{margin:'0 0 3px',color:'#7c9e87',fontSize:'11px',letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700}}>Edit Weekly</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <h2 style={{margin:0,fontFamily:"'Fraunces',serif",fontSize:'24px',fontWeight:700,color:'#1e293b'}}>Mess Menu 🍽️</h2>
              <span style={{padding:'4px 11px',borderRadius:'20px',background:'#eef4f0',border:'1.5px solid #c2d9c7',color:'#5a7a62',fontSize:'11px',fontWeight:800,letterSpacing:'0.3px'}}>RECTOR</span>
            </div>
          </div>

          {/* Day pills */}
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'14px'}} className="ffu">
            {days.map(day=>(
              <button key={day} onClick={()=>setSelDay(day)} style={{
                padding:'5px 13px',borderRadius:'20px',border:'none',fontSize:'12px',fontWeight:700,cursor:'pointer',
                background:selDay===day?'#7c9e87':'#f0f4f0',
                color:selDay===day?'#fff':'#5a7a62',
                boxShadow:selDay===day?'0 4px 14px rgba(124,158,135,0.35)':'none',
                outline:day===today&&selDay!==day?'2px solid #c2d9c7':'none',
                outlineOffset:'1px',
              }}>{day.slice(0,3)}{day===today&&<span style={{marginLeft:'4px',fontSize:'8px'}}>●</span>}</button>
            ))}
          </div>

          {/* Meal cards */}
          <div className="fsc" style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:'12px',paddingBottom:'16px'}}>
            {Object.entries(menu[selDay]).map(([meal,data],idx)=>{
              const c=mealColors[meal];
              return (
                <div key={meal} className="fmc ffu" style={{borderRadius:'18px',background:c.bg,border:`1.5px solid ${c.border}`,overflow:'hidden',animationDelay:`${idx*0.07}s`,position:'relative',boxShadow:'0 2px 12px rgba(100,130,90,0.07)'}}>
                  {/* Dish name above photo */}
                  <div style={{padding:'10px 14px',borderBottom:`1px solid ${c.border}`,background:c.pill}}>
                    <p style={{margin:0,color:'#1e293b',fontSize:'14px',fontWeight:700,textAlign:'center'}}>{data.name}</p>
                  </div>

                  {/* Meal photo */}
                  <div style={{position:'relative',height:'180px',overflow:'hidden'}}>
                    <img src={data.photo} alt={data.name} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>e.target.style.display='none'}/>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(255,255,255,0.4) 0%,transparent 55%)'}}/>
                    <div style={{position:'absolute',top:'10px',left:'12px',display:'flex',alignItems:'center',gap:'5px',padding:'4px 10px',borderRadius:'20px',background:'rgba(255,255,255,0.88)',backdropFilter:'blur(8px)',border:`1px solid ${c.border}`,boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
                      <span style={{fontSize:'12px'}}>{mealIcons[meal]}</span>
                      <span style={{color:c.accent,fontSize:'10px',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.5px'}}>{meal}</span>
                    </div>
                    <button className="feb" onClick={()=>openMealEdit(selDay,meal)}
                      style={{position:'absolute',top:'10px',right:'12px',padding:'4px 11px',borderRadius:'10px',background:'#7c9e87',border:'none',color:'#fff',fontSize:'11px',fontWeight:700,cursor:'pointer',boxShadow:'0 2px 8px rgba(124,158,135,0.4)'}}>
                      ✏️ Edit
                    </button>
                  </div>
                  <div style={{padding:'10px 14px',background:c.bg}}>
                    <p style={{margin:0,color:'#94a3b8',fontSize:'12px',textAlign:'center',fontWeight:600}}>🕐 {mealTimes[meal]}</p>
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
              <p style={{margin:'0 0 3px',color:'#7c9e87',fontSize:'11px',letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700}}>Manage</p>
              <h2 style={{margin:0,fontFamily:"'Fraunces',serif",fontSize:'24px',fontWeight:700,color:'#1e293b'}}>Events & Notices 📌</h2>
            </div>
            <button onClick={openNew} style={{padding:'8px 18px',borderRadius:'12px',border:'none',marginBottom:'4px',background:'#7c9e87',color:'#fff',fontSize:'13px',fontWeight:700,cursor:'pointer',boxShadow:'0 4px 14px rgba(124,158,135,0.35)'}}>+ Add Event</button>
          </div>

          <div className="fsc" style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:'10px',paddingBottom:'16px'}}>
            {events.sort((a,b)=>new Date(a.date)-new Date(b.date)).map((ev,idx)=>{
              const{label,color:dc,bg:dBg}=daysUntil(ev.date);
              return (
                <div key={ev.id} className="fec ffu" style={{borderRadius:'18px',background:'#ffffff',border:'1.5px solid #e8eeea',padding:'16px 18px',position:'relative',overflow:'hidden',boxShadow:'0 2px 12px rgba(100,130,90,0.07)',animationDelay:`${idx*0.06}s`}}>
                  <div style={{position:'absolute',left:0,top:0,bottom:0,width:'4px',background:ev.color,borderRadius:'18px 0 0 18px'}}/>
                  <div style={{paddingLeft:'8px'}}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'10px',marginBottom:'6px'}}>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'4px',flexWrap:'wrap'}}>
                          <span style={{padding:'2px 8px',borderRadius:'7px',fontSize:'10px',fontWeight:800,textTransform:'uppercase',background:`${ev.color}18`,color:ev.color,border:`1px solid ${ev.color}30`}}>{ev.category}</span>
                          <span style={{color:'#94a3b8',fontSize:'11px',fontWeight:600}}>by {ev.postedBy}</span>
                        </div>
                        <h3 style={{margin:0,color:'#1e293b',fontSize:'15px',fontWeight:700}}>{ev.title}</h3>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'6px',flexShrink:0}}>
                        <span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'11px',fontWeight:700,background:dBg,color:dc,border:`1px solid ${dc}30`}}>{label}</span>
                        <button onClick={()=>openEdit(ev)} style={{padding:'4px 9px',borderRadius:'8px',background:'#eef4f0',border:'1.5px solid #c2d9c7',color:'#5a7a62',cursor:'pointer',fontSize:'12px',fontWeight:600}}>✏️</button>
                        <button onClick={()=>delEvt(ev.id)} style={{padding:'4px 9px',borderRadius:'8px',background:'#fef2f2',border:'1.5px solid #fecaca',color:'#ef4444',cursor:'pointer',fontSize:'12px',fontWeight:600}}>🗑️</button>
                      </div>
                    </div>
                    <p style={{margin:'0 0 10px',color:'#64748b',fontSize:'13px',lineHeight:'1.6',fontWeight:500}}>{ev.description}</p>
                    <div style={{display:'flex',gap:'14px'}}>
                      <span style={{color:'#94a3b8',fontSize:'12px',fontWeight:600}}>📅 {formatDate(ev.date)}</span>
                      <span style={{color:'#94a3b8',fontSize:'12px',fontWeight:600}}>🕐 {ev.time}</span>
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
            <h3 style={{margin:'0 0 20px',color:'#1e293b',fontFamily:"'Fraunces',serif",fontSize:'20px',fontWeight:700}}>Edit {editMeal.meal} — {editMeal.day}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <div>
                <label style={{display:'block',color:'#7c9e87',fontSize:'12px',fontWeight:800,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Dish Name</label>
                <input style={inp()} value={mDraft.name} onChange={e=>setMDraft(p=>({...p,name:e.target.value}))} placeholder="e.g. Poha & Masala Chai"/>
              </div>
              <div>
                <label style={{display:'block',color:'#7c9e87',fontSize:'12px',fontWeight:800,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Upload Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={inp({padding:'8px 12px',cursor:'pointer'})}/>
              </div>
              {mDraft.photo && <img src={mDraft.photo} alt="preview" style={{width:'100%',height:'140px',objectFit:'cover',borderRadius:'12px',border:'1.5px solid #c2d9c7'}} onError={e=>e.target.style.display='none'}/>}
            </div>
            <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
              <button onClick={saveMeal} style={{flex:1,padding:'11px',borderRadius:'12px',border:'none',background:'#7c9e87',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:'14px',boxShadow:'0 4px 14px rgba(124,158,135,0.3)'}}>Save Changes</button>
              <button onClick={()=>{setEditMeal(null);setImageFile(null);}} style={{flex:1,padding:'11px',borderRadius:'12px',border:'1.5px solid #e2e8f0',background:'#f8fafc',color:'#64748b',cursor:'pointer',fontSize:'14px',fontWeight:600}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEvt && (
        <div className="fovl" onClick={()=>setShowEvt(false)}>
          <div className="fmdl" onClick={e=>e.stopPropagation()}>
            <h3 style={{margin:'0 0 20px',color:'#1e293b',fontFamily:"'Fraunces',serif",fontSize:'20px',fontWeight:700}}>{editEvt?'Edit Event':'Add New Event'}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <div>
                <label style={{display:'block',color:'#7c9e87',fontSize:'12px',fontWeight:800,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Title *</label>
                <input style={inp()} value={eDraft.title} onChange={e=>setEDraft(p=>({...p,title:e.target.value}))} placeholder="Event title"/>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <div style={{flex:1}}>
                  <label style={{display:'block',color:'#7c9e87',fontSize:'12px',fontWeight:800,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Date *</label>
                  <input type="date" style={inp()} value={eDraft.date} onChange={e=>setEDraft(p=>({...p,date:e.target.value}))}/>
                </div>
                <div style={{flex:1}}>
                  <label style={{display:'block',color:'#7c9e87',fontSize:'12px',fontWeight:800,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Time</label>
                  <input style={inp()} value={eDraft.time} onChange={e=>setEDraft(p=>({...p,time:e.target.value}))} placeholder="10:00 AM"/>
                </div>
              </div>
              <div>
                <label style={{display:'block',color:'#7c9e87',fontSize:'12px',fontWeight:800,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Category</label>
                <select style={inp({cursor:'pointer'})} value={eDraft.category} onChange={e=>setEDraft(p=>({...p,category:e.target.value}))}>
                  {categories.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{display:'block',color:'#7c9e87',fontSize:'12px',fontWeight:800,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Description</label>
                <textarea style={inp({resize:'vertical',minHeight:'80px'})} value={eDraft.description} onChange={e=>setEDraft(p=>({...p,description:e.target.value}))} placeholder="Details..."/>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
              <button onClick={saveEvt} style={{flex:1,padding:'11px',borderRadius:'12px',border:'none',background:'#7c9e87',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:'14px',boxShadow:'0 4px 14px rgba(124,158,135,0.3)'}}>{editEvt?'Save Changes':'Add Event'}</button>
              <button onClick={()=>setShowEvt(false)} style={{flex:1,padding:'11px',borderRadius:'12px',border:'1.5px solid #e2e8f0',background:'#f8fafc',color:'#64748b',cursor:'pointer',fontSize:'14px',fontWeight:600}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}