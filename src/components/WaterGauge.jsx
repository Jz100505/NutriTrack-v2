const WaterGauge = ({ value, max }) => {
  const SZ = 260, SW = 22, R = (SZ / 2) - SW;
  const circ = 2 * Math.PI * R;
  const arc = circ * 0.75;
  const pct = Math.min(value / max, 1);
  const filled = arc * pct;
  const C = SZ / 2;
  const ticks = 13;

  return (
    <div style={{ position:'relative', width:SZ, height: SZ * 0.72 }}>
      <svg width={SZ} height={SZ} style={{ position:'absolute', top:0, left:0, transform:'rotate(135deg)', overflow:'visible' }}>
        {/* Tick marks */}
        {Array.from({ length: ticks }, (_, i) => {
          const ang = (i / (ticks - 1)) * (Math.PI * 1.5);
          const r1 = R - 16, r2 = R - 4;
          const cos = Math.cos(ang), sin = Math.sin(ang);
          return (
            <line key={i} x1={C + r1 * cos} y1={C + r1 * sin} x2={C + r2 * cos} y2={C + r2 * sin}
              stroke={i <= Math.round(pct * (ticks - 1)) ? '#00B0FF' : '#282828'}
              strokeWidth={2.5} strokeLinecap="round"/>
          );
        })}
        {/* BG arc */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="#1C1C1C" strokeWidth={SW}
          strokeDasharray={`${arc} ${circ}`} strokeLinecap="round"/>
        {/* Fill arc */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="url(#wg)" strokeWidth={SW}
          strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
          style={{ transition:'stroke-dasharray .9s cubic-bezier(.4,0,.2,1)' }}/>
        <defs>
          <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0080CC"/>
            <stop offset="100%" stopColor="#00D4FF"/>
          </linearGradient>
        </defs>
      </svg>
      {/* Center content */}
      <div style={{ position:'absolute', bottom:18, left:'50%', transform:'translateX(-50%)', textAlign:'center', pointerEvents:'none' }}>
        <div style={{ fontSize:14, color:'#444', marginBottom:2 }}>💧</div>
        <div style={{ fontSize:46, fontWeight:900, fontFamily:'Barlow,sans-serif', lineHeight:1, color:'#00B0FF', letterSpacing:-1 }}>
          {value.toLocaleString()}
        </div>
        <div style={{ color:'#444', fontSize:14, marginTop:2 }}>/ {max.toLocaleString()} ml</div>
        <div style={{ marginTop:8, fontSize:12, color:'#00B0FF', fontWeight:700 }}>
          {Math.round((value / max) * 100)}% of goal
        </div>
      </div>
    </div>
  );
};

export default WaterGauge;
