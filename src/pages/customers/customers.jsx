
import './customers.css'
import { useAuthValue } from '../../context/authContext'
import { useState, useEffect, useId } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'

//images
import searchIcon from './assets/search.png'
import defaultAvatar from './assets/avatar.png'
import loadingIcon from '../../../public/loading.jpg'
import deleteIcon from '../../../public/delete-icon.png'

const Customers = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuthValue()

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

    return <div className='container customer-container'>
        <h2 className='sub-title'>Meus clientes</h2>
        <p className='description'>Aqui você consegue visualizar todos os seus clientes.</p>
        <div className='search'>
            <div className='search-inner'>
                <img src={searchIcon} alt="" />
                <input type="text" placeholder='Pesquisar:' />
            </div>
        </div>

        {!loading && customers.map(customer => (
            <div className='customer-details'>
                <img src={customer.logo ? customer.logo : defaultAvatar} alt="" className='avatar' />
                <div className='customer-data-container'>
                    <p>{customer.name}</p>
                    <p>{customer.email}</p>
                    <p>{customer.corporateReason}</p>
                    <p>{customer.tel}</p>
                    <p>{customer.secondTell ? customer.secondTell : 'Sem telefone alternativo'}</p>
                </div>
            </div>
        ))}

        {loading && <img src={loadingIcon} alt="" className='loading-initial' />}

    </div>

}

export default Customers;