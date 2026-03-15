const Ring = ({ value, max, size=160, sw=12, color='#FF1E44', bg='#1E1E1E', children }) => {
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(value / max, 0), 1);
  const offset = circ * (1 - pct);
  const c = size / 2;
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)', display:'block' }}>
        <circle cx={c} cy={c} r={r} fill="none" stroke={bg} strokeWidth={sw}/>
        <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition:'stroke-dashoffset .9s cubic-bezier(.4,0,.2,1)' }}/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        {children}
      </div>
    </div>
  );
};

export default Ring;
