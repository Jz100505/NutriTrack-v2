import { useState } from 'react';
import I from '../components/Icons';
import WaterGauge from '../components/WaterGauge';

const Water = () => {
  const GOAL = 2500;
  const [water, setWater] = useState(2000);
  const [amt, setAmt] = useState(250);
  const [showAmt, setShowAmt] = useState(false);
  const [history, setHistory] = useState([
    { id:1, label:'Water', ml:300, t:'2:55 PM' },
    { id:2, label:'Water', ml:300, t:'2:55 PM' },
    { id:3, label:'Water', ml:300, t:'2:55 PM' },
    { id:4, label:'Water', ml:250, t:'1:30 PM' },
    { id:5, label:'Water', ml:500, t:'9:00 AM' },
  ]);

  const drink = () => {
    setWater(p => Math.min(p + amt, GOAL));
    const t = new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
    setHistory(p => [{ id:Date.now(), label:'Water', ml:amt, t }, ...p]);
  };
  const remove = id => {
    const e = history.find(h => h.id === id);
    if (e) setWater(p => Math.max(0, p - e.ml));
    setHistory(p => p.filter(h => h.id !== id));
  };

  return (
    <div className="page main-area" style={{ padding:'32px 36px', maxWidth:720, width:'100%' }}>
      <h1 style={{ fontSize:28, fontWeight:900, fontFamily:'Barlow,sans-serif', marginBottom:28 }}>Water Tracker 💧</h1>

      <div className="card" style={{ padding:36, marginBottom:24, textAlign:'center' }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}>
          <WaterGauge value={water} max={GOAL}/>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14, flexWrap:'wrap' }}>
          <button className="btn-blue" onClick={drink} style={{ fontSize:15, padding:'14px 36px' }}>
            Drink ({amt} ml)
          </button>
          <button className="btn-icon" onClick={() => setShowAmt(p=>!p)} style={{ width:44, height:44 }}>{I.edit}</button>
        </div>

        {showAmt && (
          <div className="slide-in" style={{ marginTop:18, display:'flex', alignItems:'center', gap:8, justifyContent:'center', flexWrap:'wrap' }}>
            <span style={{ color:'#444', fontSize:13, marginRight:4 }}>Custom:</span>
            {[100,150,200,250,300,500].map(v => (
              <button key={v} onClick={() => setAmt(v)} style={{ padding:'7px 14px', borderRadius:50, fontSize:13, fontWeight:700, cursor:'pointer', transition:'all .18s', fontFamily:'DM Sans,sans-serif', border:`1px solid ${amt===v?'#00B0FF':'#2A2A2A'}`, background:amt===v?'rgba(0,176,255,.15)':'transparent', color:amt===v?'#00B0FF':'#555' }}>
                {v}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <h2 style={{ fontSize:18, fontWeight:700 }}>Drink History</h2>
        <span style={{ color:'#3A3A3A', fontSize:13 }}>{history.length} entries today</span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {history.length === 0
          ? <div style={{ textAlign:'center', padding:'50px 0', color:'#333' }}><div style={{ fontSize:40, marginBottom:10 }}>💧</div><div>No entries yet. Stay hydrated!</div></div>
          : history.map(item => (
            <div key={item.id} className="card2" style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', transition:'all .18s' }}>
              <div style={{ width:46, height:46, borderRadius:14, background:'rgba(0,176,255,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🥤</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:15, fontFamily:'Barlow,sans-serif', letterSpacing:.3 }}>{item.label}</div>
                <div style={{ color:'#3A3A3A', fontSize:12, marginTop:2 }}>{item.t}</div>
              </div>
              <span style={{ fontWeight:800, color:'#00B0FF', fontSize:16, fontFamily:'Barlow,sans-serif' }}>{item.ml} ml</span>
              <button onClick={() => remove(item.id)} style={{ background:'none', border:'none', color:'#2E2E2E', cursor:'pointer', padding:'4px 8px', fontSize:16, lineHeight:1, borderRadius:8, transition:'color .18s' }}
                onMouseEnter={e=>e.target.style.color='#FF1E44'} onMouseLeave={e=>e.target.style.color='#2E2E2E'}>✕</button>
            </div>
          ))
        }
      </div>

      <button onClick={drink} style={{ position:'fixed', bottom:36, right:36, width:56, height:56, borderRadius:'50%', background:'#00B0FF', color:'#0A0A0A', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 8px 28px rgba(0,176,255,.4)', transition:'all .2s', zIndex:50 }}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
        {I.plus}
      </button>
    </div>
  );
};

export default Water;
