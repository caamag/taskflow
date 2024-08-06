
import './projectCard.css'
import { useState, useEffect } from 'react';
import { useAuthValue } from '../../context/authContext';
import { useFetchDocs } from '../../hooks/useDocs';

const ProjectCard = ({ setCardVisible, projectName, customerSelected, price, details, isFavorite }) => {

    const [newDetails, setNewDetails] = useState('')
    const [newPrice, setNewPrice] = useState()
    const [newTitle, setNewTitle] = useState('')

    const { user } = useAuthValue()
    const { doc: docCustomer } = useFetchDocs(user.uid, 'Clientes')


    return <div className='project-card-container'>
        <div className='card'>
            <button className='close-card' onClick={() => { setCardVisible(false) }}>x</button>

            <div className='card-btns'>
                <button className='delete-customer'>Deletar</button>
                <button className='update-user'>Salvar</button>
            </div>

            <div className='card-content'>
                <div className='details-content'>
                    <h2>{projectName}</h2>
                    <p>Edite as informações do seu projeto ou exclua-o se for necessário.</p><br /><br />
                    <textarea
                        className='details-text'
                        value={details}
                        onChange={(e) => { setNewDetails(e.target.value) }}
                    ></textarea>
                </div>

                <div className='project-content'>
                    <select>
                        <option value="">Prioridade:</option>
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                    </select><br />

                    <select>
                        <option>Cliente:</option>
                        {docCustomer.map(customer => (
                            <option
                                value={customer.name + '_' + customer.id}
                                key={customer.id}
                            >
                                {customer.name}
                            </option>
                        ))}
                    </select><br />

                    <input
                        type="number"
                        placeholder={`Preço: ${price}`}
                        value={newPrice}
                        onChange={(e) => { setNewPrice(e.target.value) }}
                    /><br />

                    <input
                        type="text"
                        placeholder={`Título: ${projectName}`}
                        value={newTitle}
                        onChange={(e) => (setNewTitle(e.target.value))}
                    /><br />

                    <label>
                        <input
                            type="checkbox"
                            checked={isFavorite}
                        />
                        {isFavorite ? 'Desfavoritar projeto' : 'Favoritar projeto'}
                    </label>
                </div>
            </div>
        </div>
    </div>
}

export default ProjectCard;