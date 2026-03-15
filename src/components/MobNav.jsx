import I from './Icons';

const MobNav = ({ page, setPage }) => {
  const links = [
    { id:'dashboard', label:'Home',      icon:I.dash },
    { id:'sleep',     label:'Sleep',     icon:I.sleep },
    { id:'water',     label:'Water',     icon:I.water },
    { id:'recipes',   label:'Recipes',   icon:I.recipe },
    { id:'community', label:'Community', icon:I.feed },
  ];
  return (
    <div className="mob-nav" style={{ position:'fixed', bottom:0, left:0, right:0, background:'#0A0A0A', borderTop:'1px solid rgba(255,255,255,.06)', padding:'10px 0 20px', display:'none', justifyContent:'space-around', zIndex:200 }}>
      {links.map(l => (
        <div key={l.id} onClick={() => setPage(l.id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, cursor:'pointer', padding:'4px 10px', color: page === l.id ? '#FF1E44' : '#404040' }}>
          {l.icon}
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:.3 }}>{l.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MobNav;
