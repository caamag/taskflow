import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider } from './context/authContext';

//pages
import Home from './pages/home/home';
import Dashboards from './pages/dashboards/dashboards';
import Login from './pages/login/login';

//components
import Nav from './components/nav/nav';


function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  const loadingUser = user === undefined;
  if (loadingUser) {
    return <p>carregando...</p>
  }

  return <div className='App'>
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        {user && <Nav />}
        <Routes>
          <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} ></Route>
          <Route path='/' element={user ? <Home /> : <Navigate to={'/login'} />}></Route>
          <Route path='/dashboards' element={user ? <Dashboards /> : <Navigate to={'/login'} />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
}

export default App;
