import './createCustomer.css'

import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuthValue } from '../../context/authContext'

const CreateCustomer = () => {

    const [name, setName] = useState('Cainho')
    const [email, setEmail] = useState('cainho@teste.com')
    const { user } = useAuthValue();

    const addCustomer = async () => {
        if (user) {
            const userId = user.uid;
            await addDoc(collection(db, 'users', userId, 'Clientes'), {
                name,
                email,
                createdAt: serverTimestamp(),
            }).then(response => {
                console.log(response);
            })
        } else {
            console.log('User logout now.');
        }
    }

    return <div className='container create-user-container'>
        <button onClick={() => { addCustomer() }}>criar cliente</button>
    </div>
}

export default CreateCustomer;