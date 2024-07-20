import './card.css'
import defaultLogo from '../../pages/customers/assets/avatar.png'
import { useState } from 'react';

const CustomerCard = ({ setCard, name, email, tell, secondTell, cnpj, corporateReason, logo }) => {

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    return <div className='customer-card-container'>
        <div className='card'>
            <button
                className='close-card'
                onClick={() => { setCard(false) }}
            >
                x
            </button>

            <div style={{ alignItems: 'center' }}>
                <img src={logo ? logo : defaultLogo} alt="" className='logo' />
                <h3 style={{ textAlign: 'center' }}>{corporateReason}</h3>
            </div>

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
                </form>
            </div>
        </div>
    </div>
};

export default CustomerCard;