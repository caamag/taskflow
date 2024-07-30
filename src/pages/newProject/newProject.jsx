
import './newProject.css'
import loadingIcon from '../../../public/loading.jpg'

import { db } from '../../firebase/config'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/authContext'
import PopupError from '../../components/popupError/popup'
import PopupSuccess from '../../components/popupSuccess/popupSucess'
import Subtitle from '../../components/subtitle/subtitle'


const NewProject = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [customers, serCustomers] = useState([])

    const [projectName, setProjectName] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')
    const [customerSelected, setCustomerSelected] = useState('')

    const { user } = useAuthValue()
    const userId = user.uid

    useEffect(() => {
        const getCustomers = async () => {
            setLoading(true)
            const querySnapshot = await getDocs(collection(db, 'users', userId, 'Clientes'))
            const customerList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            customerList.sort((a, b) => b.createdAt - a.createdAt)
            serCustomers(customerList)
            setLoading(false)
        }
        getCustomers()
    }, [])

    const handleCreateProject = async (e) => {
        e.preventDefault();

        if (customerSelected === '' || customerSelected === '-') {
            setError(true)
            setErrorMessage('Selecione um cliente.')
            setTimeout(() => { setError(false) }, 5000)
            return;
        }

        try {
            setLoading(true)
            addDoc(collection(db, 'users', userId, 'Projetos'), {
                projectName,
                price: Number(price),
                details,
                customerSelected,
                createdAt: serverTimestamp(),
            })

            setSuccess(true)
            setTimeout(() => { setSuccess(false) }, 5000)
            setLoading(false)
            setProjectName('')
            setPrice('')
            setDetails('')
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

                <select value={customerSelected} onChange={(e) => { setCustomerSelected(e.target.value) }}>
                    <option>-</option>
                    {customers.map(customer => (
                        <option
                            value={customer.name}
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
