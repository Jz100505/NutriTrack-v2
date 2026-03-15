import I from './Icons';
import Logo from './Logo';

const Sidebar = ({ page, setPage }) => {
  const links = [
    { id:'dashboard', label:'Dashboard', icon:I.dash },
    { id:'sleep',     label:'Sleep',     icon:I.sleep },
    { id:'water',     label:'Water',     icon:I.water },
    { id:'recipes',   label:'Recipes',   icon:I.recipe },
    { id:'nutribot',  label:'NutriBot',  icon:I.bot },
    { id:'community', label:'Community', icon:I.feed },
  ];
  return (
    <div className="sidebar-d" style={{ width:230, minHeight:'100vh', background:'#0A0A0A', borderRight:'1px solid rgba(255,255,255,.05)', display:'flex', flexDirection:'column', padding:'26px 14px', position:'sticky', top:0, flexShrink:0 }}>
      <div style={{ paddingLeft:8, marginBottom:36 }}><Logo/></div>
      <nav style={{ display:'flex', flexDirection:'column', gap:3, flex:1 }}>
        {links.map(l => (
          <div key={l.id} className={`nav-link ${page === l.id ? 'active' : ''}`} onClick={() => setPage(l.id)}>
            {l.icon}<span>{l.label}</span>
          </div>
        ))}
      </nav>
      <div style={{ borderTop:'1px solid rgba(255,255,255,.05)', paddingTop:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:12 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:'#1E1E1E', display:'flex', alignItems:'center', justifyContent:'center', color:'#444' }}>{I.user}</div>
          <div>
            <div style={{ fontSize:13, fontWeight:600 }}>John D.</div>
            <div style={{ fontSize:11, color:'#3A3A3A' }}>john@nutritrack.app</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
