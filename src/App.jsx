import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages
import Home from './pages/home/home';
import Dashboards from './pages/dashboards/dashboard';

//components
import Nav from './components/nav';

function App() {

  return <div className='App'>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/dashboards' element={<Dashboards />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
