import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css';
import Navbar from './components/Navbar';
import DailySum from './pages/DailySum';
import Collections from './pages/Collections';
import BarChart from './components/BarChart'

function App() {
  return (
    <div className="App">
      <Navbar/>
      
      <Router>
        
        <Routes>
          <Route path='/' exact element={<DailySum/>} />
          <Route path='/collections' exact element={<Collections/>} />
          <Route path='/chart' exact element={<BarChart/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
