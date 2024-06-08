
import './search.css'

//hooks
import { useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { NavLink } from 'react-router-dom';

//images
import searchIcon from '../assets/search.png'
import settingsIcon from '../assets/settings.png'

const Search = () => {

    const [keyword, setKeyword] = useState('')
    const [settings, setSettings] = useState(false)

    const { logout } = useAuthentication()

    function handleSubmit(e) {
        e.preventDefault()
    }

    return <div className='search-container'>
        <h1>Página inicial</h1>

        <div className='search-content'>
            <form onSubmit={handleSubmit}>
                <div className='keyword-container'>
                    <img src={searchIcon} alt="search icon" />
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                        placeholder='Pesquisar:' />
                </div>
            </form>

            <button className='settings-btn' onClick={() => {
                if (settings) {
                    setSettings(false)
                } else {
                    setSettings(true)
                }
            }}><img src={settingsIcon} alt="" /></button>

            {settings && <ul className='settings-list'>
                <li><button><NavLink to={'/currentUser/account'}>Conta</NavLink></button></li>
                <li><button onClick={logout} className='logout-btn'>Sair</button></li>
            </ul>}

        </div>
    </div>

}

export default Search;