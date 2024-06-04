
import './register.css'

import { useState } from 'react';

const Register = ({ setLogin }) => {

    function handleSubmit(e) {
        e.preventDefault()
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return <div className='login-content'>
        <form onSubmit={handleSubmit}>
            <h1>Crie a sua conta</h1>

            <input type="text"
                placeholder='Informe o seu nome:'
                value={name}
                onChange={(e) => { setName(e.target.value) }} /><br /><br />

            <input type="email"
                placeholder='Informe um email válido:'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} /><br /><br />

            <input type="password"
                placeholder='Crie um senha:'
                value={pass}
                onChange={(e) => { setPass(e.target.value) }} /><br /><br />

            <button type='submit'>Criar conta</button><br /><br />

            <button onClick={() => { setLogin(true) }}>Ja tenho conta</button>

        </form>
    </div>

}

export default Register;

