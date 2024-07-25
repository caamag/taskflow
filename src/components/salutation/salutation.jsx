
import './salutation.css'
import { NavLink } from 'react-router-dom';

//images
import projectIcon from '../assets/project-icon.png'
import avatar from '../assets/avatar-empty.png'
import categorieIcon from '../assets/categorie-icon.png'

const Salutation = ({ userName }) => {

    const categories = [
        {
            title: 'Dashboard',
            url: '/dashboard'
        },
        {
            title: 'Novo Cliente',
            url: '/customer/create'
        },
        {
            title: 'Novo Projeto',
            url: '/customers'
        }
    ]

    return <div className='salutation-container'>
        <h1 className='salutation-title'>{`Olá${userName ? ', ' + userName : ''}!`}</h1>
        <h3 className='salutation-subtitle'>O que faremos hoje?</h3>
        <ul className='primary-list'>
            <li>
                <NavLink to={'/projects/my'}>
                    <img src={projectIcon} alt="project" />
                    Projetos
                </NavLink>
            </li>
            <li>
                <NavLink to={'/customers'}>
                    <img src={avatar} alt="avatar" />
                    Clientes
                </NavLink>
            </li>
        </ul>

        <div className='home-categories'>
            {categories.map((categorie) => (
                <NavLink to={categorie.url}>
                    <div className='categorie'>
                        <img src={categorieIcon} alt="" />
                        <p>{categorie.title}</p>
                    </div>
                </NavLink>
            ))}
        </div>
    </div>
}

export default Salutation;