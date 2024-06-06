import { useEffect, useState } from 'react';
import { useAuthentication } from '../../../hooks/useAuthentication';

const Register = ({ setLogin }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const { createUser, error: authError, loading } = useAuthentication();

    async function handleSubmit(e) {
        e.preventDefault()

        const user = {
            name,
            email,
            pass,
        }

        const res = await createUser(user)
        console.log(res);
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return <div className='login-content'>
        <form onSubmit={handleSubmit}>
            <h1>Crie a sua conta</h1>

            <input type="text"
                placeholder='Informe o seu nome:'
                value={name}
                required
                onChange={(e) => { setName(e.target.value) }} /><br /><br />

            <input type="email"
                placeholder='Informe um email válido:'
                value={email}
                required
                onChange={(e) => { setEmail(e.target.value) }} /><br /><br />

            <input type="password"
                placeholder='Crie um senha:'
                value={pass}
                required
                onChange={(e) => { setPass(e.target.value) }} /><br /><br />

            <div className='btn-divider'>
                <button className='change-form-btn' onClick={() => { setLogin(true) }}>Ja tenho conta</button>
                <button type='submit' className='login-btn'>Criar conta</button><br /><br />
            </div>

        </form>
    </div>

}

export default Register;

