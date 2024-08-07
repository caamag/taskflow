
import './customers.css'
import { useAuthValue } from '../../context/authContext'
import { useState, useEffect, useId } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'
import CustomerCard from '../../components/customerCard/card'
import NoContent from '../../components/noContent/noContent'
import Subtitle from '../../components/subtitle/subtitle'
import Query from '../../components/query/query'

//images
import defaultAvatar from './assets/avatar.png'
import loadingIcon from '../../../public/loading.jpg'

const Customers = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuthValue()

    const [card, setCard] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [secondTell, setSecondTell] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [corporateReason, setCorporateReason] = useState('')
    const [logo, setLogo] = useState('')
    const [customerId, setCustomerId] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getCustomers = async () => {
            setLoading(true)
            const userId = user.uid;
            const querySnapshot = await getDocs(collection(db, 'users', userId, 'Clientes'))
            const customerList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            customerList.sort((a, b) => b.createdAt - a.createdAt)
            setCustomers(customerList)
            setLoading(false)
        }
        getCustomers()
    }, [])

    const handleSearch = (name, email, corporateReason) => {
        if (name.includes(search) || email.includes(search) || corporateReason.includes(search)) {
            return ''
        }
        return 'delete'
    }

    return <div className='container customer-container'>
        <Subtitle subtitle={'Meus clientes'} description={'Aqui você consegue visualizar todos os seus clientes.'} />

        <Query search={search} setSearch={setSearch} />

        {!loading && customers.map(customer => (
            <div className={`customer-details ${handleSearch(customer.name, customer.email, customer.corporateReason)}`}
                onClick={() => {
                    setCard(true)
                    setName(customer.name)
                    setEmail(customer.email)
                    setCorporateReason(customer.corporateReason)
                    setTel(customer.tel)
                    setSecondTell(customer.secondTell)
                    setCnpj(customer.cnpj)
                    setLogo(customer.logo)
                    setCustomerId(customer.id)
                }}>
                <img
                    src={customer.logo ? customer.logo : defaultAvatar}
                    alt=""
                    className={customer.logo ? 'avatar avatar-logo' : 'avatar'}
                />
                <div className='customer-data-container'>
                    <p>{customer.name}</p>
                    <p>{customer.email}</p>
                    <p>{customer.corporateReason}</p>
                    <p>{customer.tel}</p>
                    <p>{customer.secondTell ? customer.secondTell : 'Sem telefone alternativo'}</p>
                </div>
            </div>
        ))}

        {!loading && customers.length === 0 && (
            <NoContent endpoint={'/customer/create'} linkText={'Criar novo cliente'} />
        )}

        {card && <CustomerCard
            setCard={setCard}
            name={name}
            email={email}
            tell={tel}
            secondTell={secondTell}
            cnpj={cnpj}
            corporateReason={corporateReason}
            logo={logo}
            customerId={customerId}
        />}
        {loading && <img src={loadingIcon} alt="" className='loading-initial' />}

    </div>

}

export default Customers;