import { useState } from 'react';
import I from '../components/Icons';
import Ring from '../components/Ring';

const Dashboard = ({ setPage }) => {
  const [selDate, setSelDate] = useState(2);
  const dates = [
    { d:'Fri', n:12 }, { d:'Sat', n:13 }, { d:'Sun', n:14 },
    { d:'Mon', n:15 }, { d:'Tue', n:16 },
  ];
  const cGoal = 2500, cRem = 1939, cBurned = 561;

  return (
    <div className="page main-area" style={{ padding:'32px 36px', maxWidth:1060, width:'100%' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
        <div>
          <div style={{ color:'#3A3A3A', fontSize:13, fontWeight:500, marginBottom:3 }}>Sunday, April 14 • 2024</div>
          <h1 style={{ fontSize:28, fontWeight:800, fontFamily:'Barlow,sans-serif' }}>Good morning, John 👋</h1>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button className="btn-icon">{I.bell}</button>
          <div style={{ width:40, height:40, borderRadius:'50%', background:'#1E1E1E', border:'1px solid #2A2A2A', display:'flex', alignItems:'center', justifyContent:'center', color:'#555', cursor:'pointer' }}>{I.user}</div>
        </div>
      </div>

      {/* Date strip */}
      <div style={{ display:'flex', gap:10, marginBottom:28, overflowX:'auto', paddingBottom:4 }}>
        {dates.map((d, i) => (
          <div key={i} className={`dchip ${selDate === i ? 'sel' : ''}`} onClick={() => setSelDate(i)}>
            <span style={{ fontSize:11, fontWeight:500, color: selDate === i ? 'rgba(255,255,255,.7)' : '#404040' }}>Apr</span>
            <span style={{ fontSize:22, fontWeight:900, fontFamily:'Barlow,sans-serif', color: selDate === i ? '#fff' : '#555', lineHeight:1.1 }}>{d.n}</span>
          </div>
        ))}
      </div>

      {/* Top row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        {/* Calorie card */}
        <div className="card" style={{ padding:28 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
            <span style={{ fontWeight:700, fontSize:17 }}>Calories</span>
            <button className="btn-icon" style={{ width:34, height:34 }}>{I.edit}</button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:22, flexWrap:'wrap' }}>
            <Ring value={cBurned} max={cGoal} size={148} sw={13} color="#E91E63">
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:26, fontWeight:900, fontFamily:'Barlow,sans-serif', lineHeight:1 }}>{cRem.toLocaleString()}</div>
                <div style={{ fontSize:11, color:'#444', marginTop:3 }}>Remaining</div>
              </div>
            </Ring>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[['Protein','#C88B3A','#8B5E1A'],['Carbs','#00B0FF','#0070A0'],['Fats','#7CB342','#4C8020']].map(([n,c,b]) => (
                <div key={n} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:54, height:54, borderRadius:'50%', border:`3px solid ${b}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:`${c}12` }}>
                    <span style={{ fontSize:13, fontWeight:800, color:c, lineHeight:1 }}>0g</span>
                    <span style={{ fontSize:9, color:'#3A3A3A', marginTop:1 }}>{n}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, color:'#555', fontSize:13 }}>{I.fire}<span>0 Calories Burned</span></div>
              <div style={{ display:'flex', alignItems:'center', gap:8, color:'#555', fontSize:13 }}>
                <span style={{ fontSize:15 }}>🍽️</span><span>0 Food Added</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, color:'#FF1E44', fontSize:13, cursor:'pointer', fontWeight:600 }}>
                {I.eye}<span>View Added Foods</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right quick cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {[
            { page:'water', emoji:'💧', label:'Water Intake', val:'2,000 ml', sub:'/ 2,500 ml goal', color:'#00B0FF', pct:80 },
            { page:'sleep', emoji:'🌙', label:'Next Sleep',   val:'11:05 PM',  sub:'in 21h 38m',    color:'#FF1E44', pct:null },
          ].map(item => (
            <div key={item.page} className="card card-hover" style={{ padding:'20px 22px', display:'flex', alignItems:'center', gap:16, cursor:'pointer', flex:1 }} onClick={() => setPage(item.page)}>
              <div style={{ width:50, height:50, borderRadius:16, background:`${item.color}14`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{item.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ color:'#444', fontSize:12, marginBottom:2 }}>{item.label}</div>
                <div style={{ fontSize:20, fontWeight:900, fontFamily:'Barlow,sans-serif', color:item.color }}>{item.val}</div>
                <div style={{ fontSize:11, color:'#3A3A3A', marginTop:1 }}>{item.sub}</div>
              </div>
              {item.pct && (
                <div style={{ width:52, height:6, background:'#1E1E1E', borderRadius:3, overflow:'hidden', flexShrink:0 }}>
                  <div style={{ width:`${item.pct}%`, height:'100%', background:item.color, borderRadius:3, transition:'width .6s' }}/>
                </div>
              )}
              <div style={{ color:'#303030', flexShrink:0 }}>{I.arr}</div>
            </div>
          ))}
          <div className="card card-hover" style={{ padding:'18px 22px', display:'flex', alignItems:'center', gap:16, cursor:'pointer' }} onClick={() => setPage('nutribot')}>
            <div style={{ width:50, height:50, borderRadius:16, background:'rgba(255,30,68,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>🤖</div>
            <div style={{ flex:1 }}>
              <div style={{ color:'#444', fontSize:12 }}>AI Assistant</div>
              <div style={{ fontSize:16, fontWeight:700, color:'#ccc', marginTop:2 }}>Ask NutriBot anything</div>
            </div>
            <div style={{ width:34, height:34, borderRadius:'50%', background:'#FF1E44', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Essentials grid */}
      <div>
        <h2 style={{ fontSize:20, fontWeight:800, fontFamily:'Barlow,sans-serif', marginBottom:16 }}>Essentials</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16 }}>
          {[
            { id:'sleep',    label:'Sleep',    emoji:'😴', color:'#FF1E44', sub:'Next: 11:05 PM' },
            { id:'water',    label:'Water',    emoji:'💧', color:'#00B0FF', sub:'2,000 / 2,500 ml' },
            { id:'nutribot', label:'NutriBot', emoji:'🤖', color:'#FF1E44', sub:'AI Powered' },
            { id:'recipes',  label:'Recipes',  emoji:'🍽️', color:'#FF8C42', sub:'Discover meals' },
          ].map(e => (
            <div key={e.id} className="card card-hover" style={{ padding:22, cursor:'pointer', minHeight:130, display:'flex', flexDirection:'column', justifyContent:'space-between' }} onClick={() => setPage(e.id)}>
              <span style={{ fontSize:13, fontWeight:700, color:'#444' }}>{e.label}</span>
              <span style={{ fontSize:34, display:'block', textAlign:'center' }}>{e.emoji}</span>
              <span style={{ fontSize:12, color:e.color, fontWeight:700 }}>{e.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search strip */}
      <div style={{ marginTop:24, background:'#FF1E44', borderRadius:20, padding:'20px 24px', display:'flex', alignItems:'center', gap:14 }}>
        <span style={{ fontSize:20 }}>🔍</span>
        <input placeholder="Search Food, Recipes, Nutrients..." style={{ background:'rgba(0,0,0,.25)', border:'none', borderRadius:50, padding:'10px 18px', color:'white', flex:1, fontFamily:'DM Sans,sans-serif', fontSize:14, outline:'none' }}/>
        <button style={{ background:'rgba(0,0,0,.3)', border:'none', color:'white', borderRadius:50, padding:'10px 20px', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>Search</button>
      </div>
    </div>
  );
};

export default Dashboard;
