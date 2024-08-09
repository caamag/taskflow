
import './newProject.css'
import loadingIcon from '../../../public/loading.jpg'

import { db } from '../../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/authContext'
import PopupError from '../../components/popupError/popup'
import PopupSuccess from '../../components/popupSuccess/popupSucess'
import Subtitle from '../../components/subtitle/subtitle'
import { useFetchDocs } from '../../hooks/useDocs'


const NewProject = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)

    const [projectName, setProjectName] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')
    const [priority, setPriority] = useState('')
    const [customerSelected, setCustomerSelected] = useState('')

    const { user } = useAuthValue()
    const userId = user.uid

    const { doc: docCustomer } = useFetchDocs(user.uid, 'Clientes')

    const handleCreateProject = async (e) => {
        e.preventDefault();

        if (priority === '' || priority === 'Prioridade:') {
            setError(true)
            setErrorMessage('Selecione a prioridade!')
            setTimeout(() => { setError(false) }, 5000)
            return;
        }

        if (customerSelected === '' || customerSelected === 'Cliente:') {
            setError(true)
            setErrorMessage('Selecione um cliente!')
            setTimeout(() => { setError(false) }, 5000)
            return;
        }

        try {
            setLoading(true)
            addDoc(collection(db, 'users', userId, 'Projetos'), {
                projectName,
                price: Number(price),
                details,
                priority,
                isFavorite: false,
                customerSelected,
                createdAt: serverTimestamp(),
                lastUpdate: serverTimestamp(),
                yearCreation: new Date().getFullYear(),
                isFinished: false,
            })

            setSuccess(true)
            setTimeout(() => { setSuccess(false) }, 5000)
            setLoading(false)
            setProjectName('')
            setPrice('')
            setDetails('')
            setPriority('')
            setCustomerSelected('')
        } catch (error) {
            setError(true)
            setErrorMessage('Erro ao criar projeto.')
            setLoading(false)
            setTimeout(() => { setError(false) }, 5000)
        }
    }

    return <>
        {!loading && <div className='container new-project-container'>
            <Subtitle
                subtitle={'Adicionar novo projeto'}
                description={'Crie novos projetos para melhorar a organização do seu trabalho.'}
            />

            <form onSubmit={handleCreateProject}>
                <input
                    type="text"
                    placeholder='Título do projeto:'
                    value={projectName}
                    onChange={(e) => { setProjectName(e.target.value) }}
                    required
                />

                <input
                    type="number"
                    placeholder='Preço:'
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                    required
                />

                <textarea
                    placeholder='Detalhes do projeto (opicional):'
                    value={details}
                    onChange={(e) => { setDetails(e.target.value) }}
                ></textarea>

                <select value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                    <option value="">Prioridade:</option>
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                </select>

                <select value={customerSelected} onChange={(e) => { setCustomerSelected(e.target.value) }}>
                    <option>Cliente:</option>
                    {docCustomer.map(customer => (
                        <option
                            value={customer.name + '_' + customer.id}
                            key={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>

                <button type='submit'>Criar projeto</button>
            </form>
        </div>}

        {loading && <img className='loading-initial' src={loadingIcon} />}
        {error && <PopupError errorMessage={errorMessage} />}
        {success && <PopupSuccess successMessage={'Projeto criado com sucesso.'} />}
    </>
}

export default NewProject;
