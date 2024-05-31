
import './nav.css'
import { NavLink } from 'react-router-dom'

//images
import logo from './assets/logo.png'

const Nav = () => {

    return <nav className='nav-container'>
        <img src={logo} alt="" className='logo' />

        <h3 className='nav-subtitle'>Projetos</h3>
        <ul className='navigate-list'>
            <NavLink><li>Meus Projetos</li></NavLink>
            <NavLink><li>Novo Projeto</li></NavLink>
            <NavLink><li>Favoritos</li></NavLink>
        </ul>
    </nav>

}

export default Nav;