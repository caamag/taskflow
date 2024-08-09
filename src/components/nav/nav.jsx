
import './nav.css'
import { NavLink } from 'react-router-dom'

//images
import logo from '../assets/logo.png'

const Nav = () => {

    return <nav className='nav-container'>

        <NavLink to={'/'} className='logo-link'><img src={logo} alt="" className='logo' /></NavLink>

        <h3 className='nav-subtitle'>Projetos</h3>
        <ul className='navigate-list'>
            <NavLink to={'/projects/my'}><li>Meus Projetos</li></NavLink>
            <NavLink to={'/projects/new'}><li>Novo Projeto</li></NavLink>
            <NavLink to={'/projects/finished'}><li>Finalizados</li></NavLink>
        </ul>

        <h3 className='nav-subtitle'>Clientes</h3>
        <ul className='navigate-list'>
            <NavLink to={'/customers'}><li>Meus Clientes</li></NavLink>
            <NavLink to={'/customer/create'}><li>Novo Cliente</li></NavLink>
        </ul>
    </nav>

}

export default Nav;