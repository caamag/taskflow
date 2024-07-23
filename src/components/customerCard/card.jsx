import './card.css'
import defaultLogo from '../../pages/customers/assets/avatar.png'
import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuthValue } from '../../context/authContext'
import { Navigate } from 'react-router-dom'

const CustomerCard = ({ setCard, name, email, tell, secondTell, cnpj, corporateReason, logo, customerId }) => {

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newTell, setNewTell] = useState('')
    const [newSecondTell, setNewSecondTell] = useState('')
    const [newCNPJ, setNewCNPJ] = useState('')
    const [newCorporate, setNewCorporate] = useState('')
    const [newLogo, setNewLogo] = useState('')

    const { user } = useAuthValue()

    const updateCustomer = async () => {
        const userID = user.uid;
        try {

            await updateDoc(doc(db, 'users', userID, 'Clientes', customerId), {
                name: newName ? newName : name,
                email: newEmail ? newEmail : email,
                tell: newTell ? newTell : tell,
                secondTell: newSecondTell ? newSecondTell : secondTell,
                cnpj: newCNPJ ? newCNPJ : cnpj,
                corporateReason: newCorporate ? newCorporate : corporateReason,
                logo: newLogo ? newLogo : logo
            })
            setCard(false)
            window.location.reload()

        } catch (error) {
            console.log(error.message);
            alert('Erro ao atualizar usuário. Tente novamente mais tarde.')
        }
    }

    return <div className='customer-card-container'>
        <div className='card'>
            <button
                className='close-card'
                onClick={() => { setCard(false) }}
            >
                x
            </button>

            <div>
                <form>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={name}
                    />

                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder={email}
                    />

                    <input
                        type="number"
                        value={newTell}
                        onChange={(e) => setNewTell(e.target.value)}
                        placeholder={tell}
                    />

                    <input
                        type="number"
                        value={newSecondTell}
                        onChange={(e) => setNewSecondTell(e.target.value)}
                        placeholder={secondTell ? secondTell : 'Sem telefone alternativo:'}
                    />

                    <input
                        type="text"
                        value={newCNPJ}
                        onChange={(e) => setNewCNPJ(e.target.value)}
                        placeholder={cnpj}
                    />

                    <input
                        type="text"
                        value={newCorporate}
                        onChange={(e) => setNewCorporate(e.target.value)}
                        placeholder={corporateReason}
                    />

                    <input
                        type="text"
                        value={newLogo}
                        onChange={(e) => setNewLogo(e.target.value)}
                        placeholder='URL:'
                    />
                </form>
            </div>

            <div style={{ alignItems: 'center' }}>
                <img src={logo ? logo : defaultLogo} alt="" className='logo' />
                <h3 style={{ textAlign: 'center' }}>{corporateReason}</h3>
            </div>

            <div className='card-btns'>
                <button className='delete-customer'>Deletar</button>

                <button
                    className='update-user'
                    onClick={() => { updateCustomer() }}
                >
                    Salvar
                </button>
            </div>
        </div>
    </div>
};

export default CustomerCard;