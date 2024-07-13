import './popupSuccess.css'
import successIcon from '../assets/success-icon.png'

const PopupSuccess = ({ successMessage }) => {
    return <div className='successPopup'>
        <img src={successIcon} alt="" />
        <p>{successMessage}</p>
    </div>
}

export default PopupSuccess;