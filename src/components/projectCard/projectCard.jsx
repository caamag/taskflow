
import './projectCard.css'
import { useState, useEffect } from 'react';
import { useAuthValue } from '../../context/authContext';
import { useFetchDocs } from '../../hooks/useDocs';
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config';
import { formatDate } from '../../hooks/formatDate';
import PopupSuccess from '../popupSuccess/popupSucess';
import PopupError from '../popupError/popup';
import FinishModal from '../finishModal/modal';

const ProjectCard = ({
    setCardVisible,
    projectName,
    customerSelected,
    price,
    details,
    isFavorite,
    priority,
    lastUpdate,
    projectId
}) => {

    const [newDetails, setNewDetails] = useState(details)
    const [newPrice, setNewPrice] = useState()
    const [newTitle, setNewTitle] = useState('')
    const [checked, setChecked] = useState(isFavorite)
    const [newPriority, setNewPriority] = useState('')
    const [newCustomer, setNewCustomer] = useState();
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)

    const { user } = useAuthValue()
    const { doc: docCustomer } = useFetchDocs(user.uid, 'Clientes')

    const lastUpdateString = new Date(lastUpdate.seconds * 1000);
    const lastUpdateFormat = formatDate(lastUpdateString).dateWithDayWeek;

    const updateProject = async () => {
        try {
            await updateDoc(doc(db, 'users', user.uid, 'Projetos', projectId), {
                projectName: newTitle ? newTitle : projectName,
                price: newPrice ? Number(newPrice) : price,
                details: newDetails ? newDetails : details,
                priority: newPriority ? newPriority : priority,
                isFavorite: checked,
                customerSelected: newCustomer ? newCustomer : customerSelected,
                lastUpdate: serverTimestamp(),
            })
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                window.location.reload()
            }, 1000)

        } catch (error) {
            setError(true)
            setTimeout(() => { setError(false) }, 4000)
        }
    }

    const deleteProject = async () => {
        try {
            await deleteDoc(doc(db, 'users', user.uid, 'Projetos', projectId))
            window.location.reload()
        } catch (error) {
            setError(true)
            setTimeout(() => { setError(false) }, 4000)
        }
    }

    return <div className='project-card-container'>
        {success && <PopupSuccess successMessage={'Projeto atualizado com sucesso'} />}
        {error && <PopupError errorMessage={'Erro! Tente mais tarde'} />}

        <div className='card'>
            <button className='close-card' onClick={() => { setCardVisible(false) }}>x</button>

            <div className='card-btns'>
                <button className='delete-customer' onClick={deleteProject}>Deletar</button>
                <button className='update-user' onClick={updateProject}>Salvar</button>
            </div>

            <button className='finish-btn' onClick={() => { setModal(true) }}>Finalizar</button>

            {modal && <FinishModal setModal={setModal} projectId={projectId} />}

            <div className='card-content'>
                <div className='details-content'>
                    <h2>{projectName}</h2>
                    <p>Edite as informações do seu projeto ou deletá-lo.</p><br /><br />
                    <textarea
                        className='details-text'
                        value={newDetails}
                        onChange={(e) => { setNewDetails(e.target.value) }}
                    ></textarea>
                    <p className='last-update'>Última atualização: {lastUpdateFormat}</p>
                </div>

                <div className='project-content'>
                    <select value={newPriority} onChange={(e) => { setNewPriority(e.target.value) }}>
                        <option value="">Prioridade:</option>
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                    </select><br />

                    <select value={newCustomer} onChange={(e) => { setNewCustomer(e.target.value) }}>
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
                            checked={checked}
                            value={checked}
                            onChange={(e) => { setChecked(e.target.checked) }}
                        />
                        {checked ? 'Adicionado aos favoritos' : 'Não adicionado aos favoritos'}
                    </label>
                </div>
            </div>
        </div>
    </div>
}

export default ProjectCard;