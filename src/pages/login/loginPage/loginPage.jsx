
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
            <h1>Bem-vindo de volta!</h1>

            <input type="email"
                placeholder='Informe o seu email:'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} /><br /><br />

            <input type="password"
                placeholder='Informe a sua senha'
                value={pass}
                onChange={(e) => { setPass(e.target.value) }} /><br /><br />

            <button type='submit'>Entrar</button><br /><br />

            <button onClick={() => { setLogin(false) }}>Criar conta</button>

        </form>
    </div>

}

export default LoginPage;