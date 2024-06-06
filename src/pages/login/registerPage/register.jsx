import { useEffect, useState } from 'react';
import { useAuthentication } from '../../../hooks/useAuthentication';

import loadingIcon from '../assets/loading.jpg'

const Register = ({ setLogin }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [passConfirm, setPassconfirm] = useState('')
    const [systemError, setSystemError] = useState(false)
    const [error, setError] = useState('')

    const { createUser, error: authError } = useAuthentication();

    async function handleSubmit(e) {
        e.preventDefault()

        if (pass !== passConfirm) {
            setSystemError(true)
            setError('As senhas precisam ser iguais.')
            setTimeout(() => { setSystemError(false) }, 4000)
            return;
        }

        const user = {
            name,
            email,
            pass,
        }

        const res = await createUser(user)
    }

    useEffect(() => {
        if (authError) {
            setSystemError(true)
            setError(authError)
            setTimeout(() => {
                setSystemError(false)
            }, 4000);
        }
    }, [authError])

    return <div className='login-content'>
        <form onSubmit={handleSubmit}>
            <h1>Novo por aqui?</h1>

            <input type="text"
                placeholder='Diga-me o seu nome:'
                value={name}
                required
                onChange={(e) => { setName(e.target.value) }} /><br />

            <input type="email"
                placeholder='Informe um email válido:'
                value={email}
                required
                onChange={(e) => { setEmail(e.target.value) }} /><br />

            <input type="password"
                placeholder='Crie uma senha:'
                value={pass}
                required
                onChange={(e) => { setPass(e.target.value) }} /><br />

            <input type="password"
                placeholder='Confirme a senha:'
                value={passConfirm}
                required
                onChange={(e) => { setPassconfirm(e.target.value) }} /><br />

            <div className='btn-divider'>
                <button className='change-form-btn' onClick={() => { setLogin(true) }}>Ja tenho conta</button>
                <button type='submit' className='login-btn'>Criar conta</button>
            </div>
            {systemError && <div className='login-error-box'>{error}</div>}
        </form>
    </div>

}

export default Register;

