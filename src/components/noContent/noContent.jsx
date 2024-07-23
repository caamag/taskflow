
import './noContent.css'
import emptyIcon from '../assets/empty-icon.png'
import { NavLink } from 'react-router-dom'

const NoContent = ({ endpoint, linkText }) => {
    return <div className='no-content-container'>
        <img src={emptyIcon} alt="" />
        <h2>Nenhum conteúdo até o momento...</h2>
        <NavLink to={endpoint}>{linkText}</NavLink>
    </div>
}

export default NoContent;