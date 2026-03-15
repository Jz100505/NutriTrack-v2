import { useState, useEffect } from 'react';
import Logo from './Logo';

const Onboarding = ({ onClose }) => {
  const [step, setStep]   = useState(0);
  const [slide, setSlide] = useState(0);
  const [sex,   setSex]   = useState('male');
  const [goals, setGoals] = useState([]);
  const [form,  setForm]  = useState({ age:'', weight:'', height:'', location:'Philippines' });
  const [acc,   setAcc]   = useState({ email:'', username:'', password:'' });
  const [errs,  setErrs]  = useState({});

  const slides = [
    { img:'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80', text:'Every step forward is a stride toward your best self.' },
    { img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', text:'Nutrition fuels your journey. Nourish to thrive.' },
    { img:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', text:'Self-care fuels strength. Listen, recover, thrive.' },
  ];

  useEffect(() => {
    if (step !== 0) return;
    const id = setInterval(() => setSlide(s=>(s+1)%slides.length), 3200);
    return () => clearInterval(id);
  }, [step]);

  const goalOpts = ['Weight Loss','Muscle Gain','Maintain Weight','Reduce Stress','Improve Mobility','Change Diet'];
  const toggleGoal = g => setGoals(p => p.includes(g) ? p.filter(x=>x!==g) : [...p,g]);

  const validateProfile = () => {
    const e = {};
    if (!form.age || isNaN(form.age) || +form.age < 13 || +form.age > 110) e.age = 'Enter a valid age (13–110)';
    if (!form.weight || isNaN(form.weight) || +form.weight < 20)  e.weight = 'Enter a valid weight';
    if (!form.height || isNaN(form.height) || +form.height < 50)  e.height = 'Enter a valid height';
    if (!goals.length) e.goals = 'Select at least one goal';
    setErrs(e); return !Object.keys(e).length;
  };
  const validateAcc = () => {
    const e = {};
    if (!acc.email.includes('@'))     e.email    = 'Enter a valid email or phone';
    if (acc.username.length < 3)      e.username = 'Username must be 3+ characters';
    if (acc.password.length < 8)      e.password = 'Minimum 8 characters required';
    setErrs(e); return !Object.keys(e).length;
  };

  const next = () => {
    if (step === 0) { setStep(1); return; }
    if (step === 1) { if (validateProfile()) setStep(2); return; }
    if (step === 2) { if (validateAcc()) onClose(); }
  };

  const Err = ({ k }) => errs[k] ? <div style={{ color:'#FF1E44', fontSize:12, marginTop:4 }}>{errs[k]}</div> : null;

  return (
    <div className="modal-bg" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.88)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:20 }}>
      <div className="modal-card" style={{ background:'#0D0D0D', borderRadius:26, width:'100%', maxWidth:460, border:'1px solid rgba(255,255,255,.09)', maxHeight:'92vh', overflowY:'auto', overflowX:'hidden' }}>
        <div style={{ textAlign:'center', padding:'30px 30px 0' }}>
          <Logo size={24}/>
          {step > 0 && (
            <div style={{ display:'flex', gap:8, marginTop:20 }}>
              {[1,2].map(s=>(
                <div key={s} style={{ flex:1, height:4, borderRadius:2, background:step>=s?'#FF1E44':'#1E1E1E', transition:'background .35s' }}/>
              ))}
            </div>
          )}
        </div>

        {/* STEP 0 — Slides */}
        {step === 0 && (
          <div style={{ padding:'24px 30px 30px' }}>
            <div style={{ borderRadius:20, overflow:'hidden', height:300, position:'relative', marginBottom:22 }}>
              {slides.map((s,i) => (
                <img key={i} src={s.img} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:slide===i?1:0, transition:'opacity .7s ease' }}/>
              ))}
            </div>
            <p style={{ textAlign:'center', fontWeight:800, fontSize:19, lineHeight:1.4, marginBottom:20, fontFamily:'Barlow,sans-serif' }}>
              {slides[slide].text}
            </p>
            <div style={{ display:'flex', justifyContent:'center', gap:7, marginBottom:26 }}>
              {slides.map((_,i) => (
                <div key={i} onClick={() => setSlide(i)} style={{ height:8, borderRadius:4, background:slide===i?'#FF1E44':'#252525', width:slide===i?22:8, transition:'all .3s', cursor:'pointer' }}/>
              ))}
            </div>
            <button className="btn-red" onClick={next} style={{ width:'100%', fontSize:16, padding:'15px' }}>Start Today!</button>
            <div style={{ textAlign:'center', marginTop:14, color:'#3A3A3A', fontSize:14, cursor:'pointer' }} onClick={onClose}>Log in</div>
          </div>
        )}

        {/* STEP 1 — Profile */}
        {step === 1 && (
          <div style={{ padding:'24px 30px 30px' }}>
            <h2 style={{ fontSize:22, fontWeight:900, fontFamily:'Barlow,sans-serif', marginBottom:6 }}>Let's start with yourself!</h2>
            <p style={{ color:'#3A3A3A', fontSize:13, marginBottom:24, lineHeight:1.55 }}>Your privacy matters to us. Your data is securely stored and used solely for calculating your personalized fitness needs.</p>

            <div style={{ display:'flex', gap:10, marginBottom:20 }}>
              {['male','female'].map(s => (
                <button key={s} onClick={()=>setSex(s)} style={{ flex:1, padding:'13px', borderRadius:50, fontWeight:700, fontSize:15, cursor:'pointer', transition:'all .2s', border:'none', fontFamily:'DM Sans,sans-serif', background:sex===s?'#FF1E44':'#1A1A1A', color:sex===s?'white':'#444' }}>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>

            {[
              { k:'age',    label:'How old are you?',  ph:'Enter your age (Years old)', suf:null },
              { k:'weight', label:'Your Weight?',       ph:'Enter Here', suf:'kg' },
              { k:'height', label:'Your Height?',       ph:'Enter Here', suf:'cm' },
            ].map(f => (
              <div key={f.k} style={{ marginBottom:14 }}>
                <label style={{ fontSize:14, fontWeight:700, display:'block', marginBottom:7 }}>{f.label}</label>
                <div style={{ position:'relative' }}>
                  <input className="inp-pill" value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} type="number"
                    style={{ paddingRight:f.suf?68:20 }}/>
                  {f.suf && <span style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', color:'#444', fontSize:12, background:'#131313', padding:'4px 10px', borderRadius:50, border:'1px solid #252525' }}>{f.suf}</span>}
                </div>
                <Err k={f.k}/>
              </div>
            ))}

            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:14, fontWeight:700, display:'block', marginBottom:7 }}>Where do you live?</label>
              <select className="inp-pill" value={form.location} onChange={e=>setForm(p=>({...p,location:e.target.value}))}>
                {['Philippines','United States','Japan','Australia','United Kingdom','Canada'].map(l=><option key={l}>{l}</option>)}
              </select>
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:14, fontWeight:700, display:'block', marginBottom:10 }}>What is your goal?</label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {goalOpts.map(g => (
                  <button key={g} onClick={()=>toggleGoal(g)} style={{ padding:'8px 16px', borderRadius:50, fontSize:13, cursor:'pointer', transition:'all .18s', fontFamily:'DM Sans,sans-serif', fontWeight:600, border:`1px solid ${goals.includes(g)?'#FF1E44':'#232323'}`, background:goals.includes(g)?'rgba(255,30,68,.14)':'transparent', color:goals.includes(g)?'#FF1E44':'#555' }}>
                    {goals.includes(g) && <span style={{ marginRight:4, fontSize:11 }}>✓</span>}{g}
                  </button>
                ))}
              </div>
              <Err k="goals"/>
            </div>

            <div style={{ display:'flex', gap:10 }}>
              <button className="btn-ghost" onClick={()=>setStep(0)} style={{ flex:1, padding:'13px' }}>Back</button>
              <button className="btn-red"   onClick={next}           style={{ flex:1, padding:'13px', fontSize:15 }}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 2 — Account */}
        {step === 2 && (
          <div style={{ padding:'24px 30px 30px' }}>
            <h2 style={{ fontSize:22, fontWeight:900, fontFamily:'Barlow,sans-serif', marginBottom:26 }}>Create your NutriTrack account!</h2>

            {[
              { k:'email',    label:'Email or Phone Number', ph:'Enter Here', type:'text' },
              { k:'username', label:'Create a User Name',    ph:'Enter Here', type:'text' },
              { k:'password', label:'Create a password',     ph:'Enter Here', type:'password', hint:'Minimum of 8 Characters' },
            ].map(f => (
              <div key={f.k} style={{ marginBottom:16 }}>
                <label style={{ fontSize:14, fontWeight:700, display:'block', marginBottom:8 }}>{f.label}</label>
                <input type={f.type} className="inp-pill" value={acc[f.k]} onChange={e=>setAcc(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph}/>
                {f.hint && <div style={{ color:'#3A3A3A', fontSize:12, marginTop:5, textAlign:'right' }}>{f.hint}</div>}
                <Err k={f.k}/>
              </div>
            ))}

            <div style={{ display:'flex', gap:10, marginTop:28 }}>
              <button className="btn-ghost" onClick={()=>setStep(1)} style={{ flex:1, padding:'13px' }}>Back</button>
              <button className="btn-red"   onClick={next}           style={{ flex:1, padding:'13px', fontSize:15 }}>Finish Up!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
