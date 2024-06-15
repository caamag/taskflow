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
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Customers from './pages/customers/customers';
import CreateCustomer from './pages/createCustomer/createCustomer';

//components
import Nav from './components/nav/nav';

//images
import loading from '../public/loading.jpg'


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
    return <>
      <img src={loading} className='loading-initial' />
    </>
  }

  return <div className='App'>
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        {user && <Nav />}
        <Routes>
          <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} ></Route>
          <Route path='/' element={user ? <Home /> : <Navigate to={'/login'} />}></Route>
          <Route path='/currentUser/account' element={user ? <Profile /> : <Navigate to={'/login'} />}></Route>
          <Route path='/customers' element={user ? <Customers /> : <Navigate to={'/login'} />}></Route>
          <Route path='/customer/create' element={user ? <CreateCustomer /> : <Navigate to={'/login'} />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
}

export default App;
