
import { setTokenAutoRefreshEnabled } from 'firebase/app-check';
import './loginPage.css'

import { useState } from 'react'

const LoginPage = ({ setLogin }) => {

    function handleSubmit(e) {
        e.preventDefault()

    }

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return <div className='login-content'>
        <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>

            <input type="email"
                placeholder='Informe o seu email:'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} /><br />

            <input type="password"
                placeholder='Informe a sua senha'
                value={pass}
                onChange={(e) => { setPass(e.target.value) }} /><br />

            <div className='btn-divider'>
                <button className='change-form-btn' onClick={() => { setLogin(false) }}>Criar conta</button>
                <button type='submit' className='login-btn'>Entrar</button><br />
            </div>

        </form>
    </div>

}

export default LoginPage;