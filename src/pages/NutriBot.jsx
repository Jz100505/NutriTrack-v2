import { useState, useEffect, useRef, useCallback } from 'react';
import I from '../components/Icons';

const NutriBot = () => {
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs, loading]);

  const send = useCallback(async (text) => {
    const t = (text || inp).trim();
    if (!t || loading) return;
    setInp('');
    const userMsg = { role:'user', content:t };
    setMsgs(p => [...p, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system:`You are NutriBot, a friendly AI nutrition and fitness assistant built into the NutriTrack app. You help users with nutrition advice, meal planning, fitness tips, hydration goals, sleep habits, and calorie tracking. Keep responses conversational, helpful, and concise (2-4 sentences max). Use a friendly tone with occasional relevant emojis. Today's date is April 14, 2024.`,
          messages:[...msgs, userMsg].map(m=>({ role:m.role, content:m.content })),
        })
      });
      const data = await res.json();
      setMsgs(p => [...p, { role:'assistant', content:data.content[0].text }]);
    } catch {
      setMsgs(p => [...p, { role:'assistant', content:"I'm having a bit of trouble connecting right now. Please try again in a moment! 🔄" }]);
    }
    setLoading(false);
  }, [inp, msgs, loading]);

  const suggestions = ['What should I eat today?','How much water should I drink?','Tips for better sleep?','Best high-protein snacks?'];

  return (
    <div className="page" style={{ display:'flex', flexDirection:'column', height:'100vh', maxWidth:720, width:'100%' }}>
      {/* Header */}
      <div style={{ padding:'24px 32px 18px', borderBottom:'1px solid rgba(255,255,255,.05)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:50, height:50, borderRadius:16, background:'rgba(255,30,68,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>🤖</div>
          <div>
            <h1 style={{ fontSize:20, fontWeight:900, fontFamily:'Barlow,sans-serif' }}>NutriBot</h1>
            <div style={{ fontSize:12, display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#4CAF50', display:'inline-block', animation:'pulsate 2s infinite' }}/>
              <span style={{ color:'#4CAF50' }}>Online</span>
            </div>
          </div>
          <button className="btn-icon" style={{ marginLeft:'auto' }} onClick={()=>setMsgs([])}>{I.edit}</button>
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex:1, overflowY:'auto', padding:'24px 32px', display:'flex', flexDirection:'column', gap:16 }}>
        {msgs.length === 0 && (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'40px 20px' }}>
            <div style={{ fontSize:80, marginBottom:16, animation:'pulsate 3s ease infinite', lineHeight:1 }}>🤖</div>
            <h2 style={{ fontSize:26, fontWeight:900, fontFamily:'Barlow,sans-serif', marginBottom:8 }}>Hey, I'm NutriBot!</h2>
            <p style={{ color:'#3A3A3A', fontSize:14, maxWidth:320, lineHeight:1.65, marginBottom:28 }}>
              Your personal AI nutrition & fitness assistant. Ask me anything about your health journey!
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} style={{ padding:'9px 16px', borderRadius:50, background:'#161616', border:'1px solid #252525', color:'#555', fontSize:13, cursor:'pointer', transition:'all .18s', fontFamily:'DM Sans,sans-serif' }}
                  onMouseEnter={e=>{e.target.style.borderColor='#FF1E44';e.target.style.color='#FF1E44';}}
                  onMouseLeave={e=>{e.target.style.borderColor='#252525';e.target.style.color='#555';}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {msgs.map((m, i) => (
          <div key={i} style={{ display:'flex', justifyContent:m.role==='user'?'flex-end':'flex-start', gap:10, alignItems:'flex-start' }}>
            {m.role==='assistant' && (
              <div style={{ width:34, height:34, borderRadius:11, background:'rgba(255,30,68,.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:4, fontSize:16 }}>🤖</div>
            )}
            <div style={{ maxWidth:'75%', padding:'13px 17px', lineHeight:1.6, fontSize:14, color:'#F0F0F0', whiteSpace:'pre-wrap',
              background: m.role==='user'?'#FF1E44':'#181818',
              border: m.role==='assistant'?'1px solid rgba(255,255,255,.06)':'none',
              borderRadius: m.role==='user'?'18px 18px 4px 18px':'18px 18px 18px 4px',
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
            <div style={{ width:34, height:34, borderRadius:11, background:'rgba(255,30,68,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🤖</div>
            <div style={{ padding:'14px 18px', background:'#181818', border:'1px solid rgba(255,255,255,.06)', borderRadius:'18px 18px 18px 4px', display:'flex', gap:5, alignItems:'center' }}>
              {[0,1,2].map(i=><div key={i} className="tdot" style={{ animationDelay:`${i*.2}s` }}/>)}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Input */}
      <div style={{ padding:'14px 32px 24px', borderTop:'1px solid rgba(255,255,255,.05)', flexShrink:0 }}>
        <div style={{ display:'flex', gap:10, background:'#161616', border:'1px solid rgba(255,255,255,.07)', borderRadius:20, padding:'8px 8px 8px 20px', transition:'border-color .2s' }}
          onFocus={e=>e.currentTarget.style.borderColor='rgba(255,30,68,.35)'} onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,.07)'}>
          <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder="Ask NutriBot..."
            style={{ flex:1, background:'transparent', border:'none', color:'#F0F0F0', fontFamily:'DM Sans,sans-serif', fontSize:14, outline:'none' }}/>
          <button className="btn-icon">{I.mic}</button>
          <button onClick={()=>send()} disabled={!inp.trim()||loading}
            style={{ width:40, height:40, borderRadius:13, background:inp.trim()?'#FF1E44':'#1E1E1E', color:inp.trim()?'white':'#333', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:inp.trim()?'pointer':'not-allowed', transition:'all .2s' }}>
            {I.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutriBot;
