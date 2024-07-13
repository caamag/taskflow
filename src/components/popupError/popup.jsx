import './popup.css'
import errorIcon from '../assets/error-icon.png'

const PopupError = ({ errorMessage }) => {
    return <div className='errorPopup'>
        <img src={errorIcon} alt="" />
        <p>{errorMessage}</p>
    </div>
}

export default PopupError;