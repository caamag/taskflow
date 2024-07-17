import './createCustomer.css'

import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuthValue } from '../../context/authContext'
import PopupError from '../../components/popupError/popup'
import PopupSuccess from '../../components/popupSuccess/popupSucess'
import loadingIcon from '../../../public/loading.jpg'

const CreateCustomer = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [secondTell, setSecondTell] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [corporateReason, setCorporateReason] = useState('')
    const [logo, setLogo] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useAuthValue();

    const clearFields = () => {
        setName('')
        setEmail('')
        setTel('')
        setSecondTell('')
        setCnpj('')
        setCorporateReason('')
        setLogo('')
    }

    const isValidURL = (url) => {
        try {
            new URL(url)
            return true;
        } catch (e) {
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidURL(logo) && logo !== '') {
            setError(true)
            setErrorMessage('Inserir URL válida!')
            setTimeout(() => {
                setError(false)
                setErrorMessage('')
            }, 5000)
            return;
        }

        const userId = user.uid;
        try {
            setLoading(true)
            await addDoc(collection(db, 'users', userId, 'Clientes'), {
                name,
                email,
                tel,
                secondTell,
                cnpj,
                corporateReason,
                logo,
                createdAt: serverTimestamp(),
            })

            setSuccess(true)
            clearFields();
            setLoading(false)
            setTimeout(() => {
                setSuccess(false);
            }, 5000)
        } catch (error) {
            setError(true)
            setErrorMessage('Erro ao criar usuário!')
            setTimeout(() => {
                setError(false)
                setErrorMessage('')
            }, 5000)
        }
    }

    return <div className='container create-user-container'>
        <h2 className='sub-title'>Adicionar novo cliente</h2>
        <p className='description'>Adicione novos clientes e relacione-os com os seus novos projetos.</p>

        {error && <PopupError errorMessage={errorMessage} />}
        {success && <PopupSuccess successMessage={'Cliente criado com sucesso!'} />}

        <form onSubmit={handleSubmit}>
            <label>
                Nome completo:<br />
                <input
                    type="text"
                    value={name}
                    placeholder='Nome completo:'
                    onChange={(e) => { setName(e.target.value) }}
                    required
                /><br />
            </label>

            <label>
                Email:<br />
                <input
                    type="email"
                    value={email}
                    placeholder='Email:'
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                /><br />
            </label>

            <label>
                Telefone principal:<br />
                <input
                    type="tel"
                    value={tel}
                    onChange={(e) => { setTel(e.target.value) }}
                    placeholder='Telefone principal:'
                    required
                /><br />
            </label>

            <label>
                Telefone alternativo (opcional):<br />
                <input
                    type="tel"
                    value={secondTell}
                    onChange={(e) => { setSecondTell(e.target.value) }}
                    placeholder='Telefone secundário:'
                /><br />
            </label>

            <label>
                Razão social:<br />
                <input
                    type="text"
                    value={corporateReason}
                    onChange={(e) => { setCorporateReason(e.target.value) }}
                    placeholder='Razão social:'
                    required
                /><br />
            </label>

            <label>
                CNPJ:<br />
                <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => { setCnpj(e.target.value) }}
                    placeholder='CNPJ:'
                    required
                /><br />
            </label>

            <label>
                Logo (opcional):<br />
                <input
                    type="text"
                    placeholder='Inserir url da imagem:'
                    value={logo}
                    onChange={(e) => { setLogo(e.target.value) }}
                />
            </label><br />

            {!loading && <>
                <button onClick={clearFields} className='clear-button'>Limpar dados</button>
                <button>Criar cliente</button>
            </>}

            {loading && <img alt='loading-icon' src={loadingIcon} className='loading-icon' />}
        </form>
    </div>
}

export default CreateCustomer;