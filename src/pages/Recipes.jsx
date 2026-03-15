import { useState } from 'react';
import I from '../components/Icons';
import Logo from '../components/Logo';

const Recipes = () => {
  const [q, setQ] = useState('');

  const cats = {
    'High Protein': [
      { id:1, name:'Fried Yellow Chicken with Fries', kcal:'650 kcal', p:'42g', img:'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=75' },
      { id:2, name:'Seared Salmon with Side Veggies', kcal:'480 kcal', p:'38g', img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=75' },
      { id:3, name:'Grilled Chicken Caesar Wrap',      kcal:'510 kcal', p:'45g', img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=75' },
    ],
    'Breakfast': [
      { id:4, name:'The "Morning Majesty"',  kcal:'520 kcal', p:'28g', img:'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&q=75' },
      { id:5, name:'High Protein Pancakes', kcal:'380 kcal', p:'24g', img:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&q=75' },
    ],
    'Salads & Bowls': [
      { id:6, name:'Asian Sesame Power Salad', kcal:'280 kcal', p:'12g', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=75' },
      { id:7, name:'Greek Protein Bowl',       kcal:'320 kcal', p:'18g', img:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=75' },
    ],
  };

  const all = Object.values(cats).flat();
  const filtered = q ? { 'Results': all.filter(r => r.name.toLowerCase().includes(q.toLowerCase())) } : cats;

  return (
    <div className="page main-area" style={{ padding:'32px 36px', maxWidth:1000, width:'100%' }}>
      {/* Hero */}
      <div style={{ borderRadius:24, overflow:'hidden', height:220, marginBottom:28, position:'relative' }}>
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=80" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.2) 60%, transparent 100%)', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:28 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {/* overlay logo */}
            <Logo size={20}/>
          </div>
          <h1 style={{ fontSize:32, fontWeight:900, fontFamily:'Barlow,sans-serif', marginTop:6 }}>Discover Recipes 🍽️</h1>
        </div>
      </div>

      {/* Search */}
      <div className="searchbar" style={{ marginBottom:32 }}>
        <span style={{ color:'#FF1E44', flexShrink:0 }}>{I.search}</span>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Recipe, Ingredients, Foods..."/>
        {q && <button onClick={()=>setQ('')} style={{ background:'none', border:'none', color:'#444', cursor:'pointer', fontSize:18, lineHeight:1 }}>✕</button>}
      </div>

      {Object.entries(filtered).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom:36 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h2 style={{ fontSize:18, fontWeight:700 }}>{cat}</h2>
            <span style={{ color:'#FF1E44', fontSize:13, cursor:'pointer', fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>See all {I.arr}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:16 }}>
            {items.map(r => (
              <div key={r.id} className="card card-hover" style={{ overflow:'hidden', cursor:'pointer' }}>
                <div style={{ height:165, overflow:'hidden' }}>
                  <img src={r.img} alt={r.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .4s' }}
                    onMouseEnter={e=>e.target.style.transform='scale(1.06)'} onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
                </div>
                <div style={{ padding:'14px 16px' }}>
                  <div style={{ fontSize:14, fontWeight:700, lineHeight:1.35, marginBottom:8 }}>{r.name}</div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:12, color:'#444' }}>{r.kcal}</span>
                    <span style={{ fontSize:12, color:'#FF8C42', fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>🔥 Protein: {r.p}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
