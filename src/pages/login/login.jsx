
import './login.css'

//login components
import Register from './registerPage/register';
import LoginPage from './loginPage/loginPage';

import { useState } from 'react';

const Login = () => {

    const [login, setLogin] = useState(true);

    return <div className='login-container container'>
        <div className='login-banner'>
            <div className='banner'></div>

            <div className='login-forms'>
                {login && <LoginPage setLogin={setLogin} />}
                {!login && <Register setLogin={setLogin} />}
            </div>
        </div>
    </div>
}

export default Login;