import { useState } from 'react';
import './styles.css';
import Sidebar from './components/Sidebar';
import MobNav from './components/MobNav';
import Onboarding from './components/Onboarding';
import Dashboard from './pages/Dashboard';
import Sleep from './pages/Sleep';
import Water from './pages/Water';
import Recipes from './pages/Recipes';
import NutriBot from './pages/NutriBot';
import Community from './pages/Community';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [onboard, setOnboard] = useState(true);

  const pages = { dashboard:Dashboard, sleep:Sleep, water:Water, recipes:Recipes, nutribot:NutriBot, community:Community };
  const Page = pages[page] || Dashboard;

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0D0D0D', color:'#F0F0F0' }}>
      <Sidebar page={page} setPage={setPage}/>
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflowY:'auto', position:'relative' }}>
        <Page setPage={setPage}/>
      </div>
      <MobNav page={page} setPage={setPage}/>
      {onboard && <Onboarding onClose={()=>setOnboard(false)}/>}
    </div>
  );
}
