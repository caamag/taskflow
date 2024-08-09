
import './modal.css'
import { useState } from 'react'
import { useAuthValue } from '../../context/authContext'
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import PopupSuccess from '../popupSuccess/popupSucess'
import PopupError from '../popupError/popup'

const FinishModal = ({ setModal, projectId }) => {

    const { user } = useAuthValue()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const finishProject = async () => {
        try {

            await updateDoc(doc(db, 'users', user.uid, 'Projetos', projectId), {
                isFinished: true
            })

            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                window.location.reload()
            }, 2000)

        } catch (error) {
            setError(true)
            setTimeout(() => { setError(false) }, 4000)
        }
    }

    return <div className='finish-modal'>
        {error && <PopupError errorMessage={'Algo deu errado'} />}
        {success && <PopupSuccess successMessage={'Projeto finalizado'} />}

        <div className='modal-content'>

            <button className='close-card' onClick={() => { setModal(false) }}>x</button>
            <h2>Deseja finalizar este projeto?</h2>
            <p>Ao realizar esta ação o projeto não poderá mais ser editado.</p>
            <button
                className='finish-project-btn'
                onClick={finishProject}
            >
                Finalizar
            </button>

        </div>
    </div>
}

export default FinishModal;