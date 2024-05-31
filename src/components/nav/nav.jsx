
import './nav.css'
import { NavLink } from 'react-router-dom'

//images
import logo from '../assets/logo.png'

const Nav = () => {

    return <nav className='nav-container'>

        <NavLink to={'/'} className='logo-link'><img src={logo} alt="" className='logo' /></NavLink>

        <h3 className='nav-subtitle'>Projetos</h3>
        <ul className='navigate-list'>
            <NavLink to={'/meusprojetos'}><li>Meus Projetos</li></NavLink>
            <NavLink to={'/novoprojeto'}><li>Novo Projeto</li></NavLink>
            <NavLink to={'/projetos/favoritos'}><li>Favoritos</li></NavLink>
        </ul>

        <h3 className='nav-subtitle'>Clientes</h3>
        <ul className='navigate-list'>
            <NavLink to={'/meusclientes'}><li>Meus Clientes</li></NavLink>
            <NavLink to={'/novocliente'}><li>Novo Cliente</li></NavLink>
        </ul>

        <h3 className='nav-subtitle'>Usuário</h3>
        <ul className='navigate-list'>
            <NavLink to={'/usuarios'}><li>Usuários</li></NavLink>
            <NavLink to={'/novousuario'}><li>Novo Usuário</li></NavLink>
        </ul>
    </nav>

}

export default Nav;