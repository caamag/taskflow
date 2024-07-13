
import './customers.css'
import { useAuthValue } from '../../context/authContext'
import { useState, useEffect, useId } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'

const Customers = () => {

    const [customers, setCustomers] = useState([])
    const { user } = useAuthValue()

    useEffect(() => {
        const getCustomers = async () => {
            const userId = user.uid;
            const querySnapshot = await getDocs(collection(db, 'users', userId, 'Clientes'))
            const customerList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setCustomers(customerList)
        }
    }, [])

    return <div className='container cusutomer-container'>


    </div>

}

export default Customers;