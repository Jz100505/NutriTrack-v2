import { useState } from 'react';
import I from '../components/Icons';

const Community = () => {
  const [posts, setPosts] = useState([
    { id:1, user:'Natahaniel Brooks', ago:'21h', img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80', caption:'Planting seeds of health, one workout and garden bed at a time. 🌱💪', tags:['#FitnessGarden'], likes:1098, liked:false, comments:42 },
    { id:2, user:'Sarah Chen', ago:'3h', img:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80', caption:'Morning workout done! Nothing beats that post-workout feeling. 🏋️♀️ #MorningFitness', tags:['#GymLife'], likes:847, liked:false, comments:28 },
    { id:3, user:'Marcus Hill', ago:'6h', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80', caption:'Meal prepped for the whole week! Consistency is key 🥗', tags:['#MealPrep','#NutriTrack'], likes:623, liked:false, comments:19 },
  ]);

  const stories = [
    { n:'James', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80' },
    { n:'Anna', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80' },
    { n:'Mike', img:'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&q=80' },
    { n:'Lisa', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80' },
    { n:'Tom', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80' },
  ];

  const like = id => setPosts(p=>p.map(x=>x.id===id?{...x,liked:!x.liked,likes:x.liked?x.likes-1:x.likes+1}:x));

  return (
    <div className="page main-area" style={{ padding:'32px 36px', maxWidth:720, width:'100%' }}>
      <h1 style={{ fontSize:28, fontWeight:900, fontFamily:'Barlow,sans-serif', marginBottom:24 }}>Community 🌍</h1>

      {/* Stories */}
      <div style={{ display:'flex', gap:14, marginBottom:24, overflowX:'auto', paddingBottom:8 }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0, cursor:'pointer' }}>
          <div style={{ width:72, height:72, borderRadius:18, background:'#161616', border:'1px solid #2A2A2A', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
            <span style={{ color:'#3A3A3A' }}>{I.user}</span>
            <div style={{ position:'absolute', bottom:-5, right:-5, width:22, height:22, borderRadius:'50%', background:'#FF1E44', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #0A0A0A' }}>
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
          </div>
          <span style={{ fontSize:11, color:'#3A3A3A' }}>Your Story</span>
        </div>
        {stories.map(s => (
          <div key={s.n} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0, cursor:'pointer' }}>
            <div style={{ width:72, height:72, borderRadius:18, border:'2.5px solid #FF1E44', overflow:'hidden', padding:2.5 }}>
              <img src={s.img} alt={s.n} style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:14 }}/>
            </div>
            <span style={{ fontSize:11, color:'#555' }}>{s.n}</span>
          </div>
        ))}
      </div>

      {/* Compose */}
      <div className="card" style={{ padding:'14px 18px', marginBottom:22, display:'flex', gap:12, alignItems:'center', cursor:'pointer' }}>
        <div style={{ width:38, height:38, borderRadius:'50%', background:'#1E1E1E', display:'flex', alignItems:'center', justifyContent:'center', color:'#3A3A3A', flexShrink:0 }}>{I.user}</div>
        <span style={{ color:'#2E2E2E', fontSize:14, flex:1 }}>What's on your mind?</span>
        <span style={{ color:'#2E2E2E' }}>{I.edit}</span>
      </div>

      {/* Posts */}
      <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
        {posts.map(p => (
          <div key={p.id} className="card" style={{ overflow:'hidden' }}>
            <div style={{ padding:'16px 18px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:44, height:44, borderRadius:'50%', overflow:'hidden', border:'2px solid #FF1E44', background:'#1E1E1E', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <div style={{ width:'100%', height:'100%', background:`hsl(${p.id*80},40%,35%)` }}/>
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14 }}>{p.user}</div>
                  <div style={{ fontSize:12, color:'#3A3A3A', display:'flex', alignItems:'center', gap:4 }}>Posted {p.ago} ago <span>🌐</span></div>
                </div>
              </div>
              <button style={{ background:'none', border:'none', color:'#3A3A3A', cursor:'pointer' }}>{I.dots}</button>
            </div>
            <img src={p.img} alt="post" style={{ width:'100%', height:280, objectFit:'cover', display:'block' }}/>
            <div style={{ padding:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <div style={{ display:'flex', gap:18 }}>
                  {[
                    { ico:I.heart, color:p.liked?'#FF1E44':'#444', fn:()=>like(p.id), active:p.liked },
                    { ico:I.chat, color:'#444', fn:()=>{} },
                    { ico:I.share, color:'#444', fn:()=>{} },
                  ].map((b,i) => (
                    <button key={i} onClick={b.fn} style={{ background:'none', border:'none', color:b.color, cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:13, transition:'all .18s', transform: b.active?'scale(1.15)':'scale(1)' }}>{b.ico}</button>
                  ))}
                </div>
                <button style={{ background:'none', border:'none', color:'#3A3A3A', cursor:'pointer' }}>{I.flag}</button>
              </div>
              <div style={{ fontWeight:800, fontSize:14, marginBottom:6, fontFamily:'Barlow,sans-serif' }}>{p.likes.toLocaleString()} Likes</div>
              <div style={{ fontSize:14, color:'#bbb', lineHeight:1.55 }}>
                {p.caption}
                {p.tags.map(t => <span key={t} style={{ color:'#00B0FF', marginLeft:4 }}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
