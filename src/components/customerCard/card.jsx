import './card.css'
import defaultLogo from '../../pages/customers/assets/avatar.png'
import { useState } from 'react'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuthValue } from '../../context/authContext'

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
            window.location.reload()

        } catch (error) {
            alert('Erro ao atualizar usuário. Tente novamente mais tarde.')
        }
    }

    const deleteUser = async () => {
        const userID = user.uid;
        try {

            await deleteDoc(doc(db, 'users', userID, 'Clientes', customerId))
            window.location.reload()

        } catch (error) {
            alert('Erro ao deletar, tente novamente.')
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
                    <h2>Configurações do cliente</h2>
                    <p>Edite informações ou delete o seu cliente.</p><br />

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
                <button
                    className='delete-customer'
                    onClick={() => { deleteUser() }}
                >
                    Deletar
                </button>

                <button
                    className='update-user'
                    onClick={(e) => {
                        updateCustomer()
                    }}
                >
                    Salvar
                </button>
            </div>
        </div>
    </div>
};

export default CustomerCard;