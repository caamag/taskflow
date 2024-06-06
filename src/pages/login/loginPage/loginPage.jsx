
import './loginPage.css'

import { useState } from 'react'
import { useAuthentication } from '../../../hooks/useAuthentication'

import loadingIcon from '../assets/loading.jpg'

const LoginPage = ({ setLogin }) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const { login, error: authError, loading: authloading } = useAuthentication()

    async function handleSubmit(e) {
        e.preventDefault()

        const user = {
            pass: pass,
            email: email
        }
        const res = await login(user)
    }

    return <div className='login-content'>
        <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>

            <input type="email"
                placeholder='Informe o seu email:'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                required /><br />

            <input type="password"
                placeholder='Informe a sua senha'
                value={pass}
                onChange={(e) => { setPass(e.target.value) }}
                required /><br />

            <div className='btn-divider'>
                <button className='change-form-btn' onClick={() => { setLogin(false) }}>Criar conta</button>
                <button type='submit' className='login-btn'>Entrar</button><br />
            </div>
            {authloading && <img src={loadingIcon} alt="" className='loading-icon' />}
            {authError && <div className='login-error-box'>{authError}</div>}
        </form>
    </div>

}

export default LoginPage;