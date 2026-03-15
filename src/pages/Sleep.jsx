import { useState, useEffect } from 'react';
import I from '../components/Icons';

const Sleep = () => {
  const [selDate, setSelDate] = useState(2);
  const [alarms, setAlarms] = useState([
    { id:1, t:'11:05 PM', from:'21h 38m from now', type:'sleep', on:false },
    { id:2, t:'8:05 AM',  from:'1d 5h 43m from now', type:'wake', on:false },
    { id:3, t:'11:05 PM', from:'1d 21h 38m from now', type:'sleep', on:true },
    { id:4, t:'8:05 AM',  from:'2d 5h 43m from now', type:'wake', on:true },
    { id:5, t:'11:05 PM', from:'2d 21h 38m from now', type:'sleep', on:false },
  ]);
  const [sec, setSec] = useState(45);

  useEffect(() => {
    const id = setInterval(() => setSec(s => s > 0 ? s - 1 : 59), 1000);
    return () => clearInterval(id);
  }, []);

  const dates = [
    { day:'Fri', n:12, mo:'April' },
    { day:'Sat', n:13, mo:'April' },
    { day:'Sun', n:14, mo:'April' },
    { day:'Mon', n:15, mo:'April' },
    { day:'Tue', n:16, mo:'April' },
  ];

  return (
    <div className="page main-area" style={{ padding:'32px 36px', maxWidth:720, width:'100%' }}>
      <h1 style={{ fontSize:28, fontWeight:900, fontFamily:'Barlow,sans-serif', marginBottom:28 }}>Sleep Tracker 🌙</h1>

      {/* Countdown */}
      <div className="card" style={{ padding:28, marginBottom:24, display:'flex', justifyContent:'space-between', alignItems:'center', gap:20 }}>
        <div>
          <div style={{ color:'#444', fontSize:13, marginBottom:8 }}>Your next sleep schedule is in</div>
          <div style={{ fontSize:38, fontWeight:900, fontFamily:'Barlow,sans-serif', color:'#FF1E44', letterSpacing:1 }}>
            21H 38M {String(sec).padStart(2,'0')}S
          </div>
          <button className="btn-red" style={{ marginTop:18, fontSize:14, padding:'12px 26px' }}>Learn More</button>
        </div>
        <div style={{ fontSize:80, opacity:.85, flexShrink:0, lineHeight:1 }}>🌙</div>
      </div>

      {/* Date strip */}
      <div style={{ display:'flex', gap:10, marginBottom:28, overflowX:'auto', paddingBottom:4 }}>
        {dates.map((d, i) => (
          <div key={i} className={`dchip ${selDate===i?'sel':''}`} onClick={() => setSelDate(i)} style={{ minWidth:76 }}>
            <span style={{ fontSize:11, fontWeight:500, color: selDate===i?'rgba(255,255,255,.65)':'#3A3A3A' }}>{d.day}, {d.mo}</span>
            <span style={{ fontSize:26, fontWeight:900, fontFamily:'Barlow,sans-serif', lineHeight:1.1, color: selDate===i?'#fff':'#505050' }}>{d.n}</span>
          </div>
        ))}
      </div>

      {/* Alarms */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <h2 style={{ fontSize:18, fontWeight:700 }}>Sleep Schedule</h2>
        <button className="btn-icon" style={{ width:36, height:36 }}>{I.edit}</button>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {alarms.map(a => (
          <div key={a.id} className="card" style={{ padding:'18px 22px', display:'flex', alignItems:'center', gap:16, border:`1px solid ${a.on?'rgba(255,30,68,.18)':'rgba(255,255,255,.05)'}`, transition:'border-color .25s' }}>
            <div style={{ width:50, height:50, borderRadius:16, background: a.type==='sleep'?'rgba(255,30,68,.1)':'rgba(255,255,255,.05)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
              {a.type==='sleep'?'😴':'⏰'}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:26, fontWeight:900, fontFamily:'Barlow,sans-serif', lineHeight:1, color:a.on?'#fff':'#444', transition:'color .25s' }}>{a.t}</div>
              <div style={{ fontSize:12, color:'#353535', marginTop:3 }}>{a.from}</div>
            </div>
            <div className={`tog ${a.on?'on':''}`} onClick={() => setAlarms(p=>p.map(x=>x.id===a.id?{...x,on:!x.on}:x))}/>
          </div>
        ))}
      </div>

      <button style={{ position:'fixed', bottom:36, right:36, width:56, height:56, borderRadius:'50%', background:'#FF1E44', color:'white', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 8px 28px rgba(255,30,68,.4)', zIndex:50, transition:'transform .2s' }}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
        {I.plus}
      </button>
    </div>
  );
};

export default Sleep;
