
import './search.css'

import { useState } from 'react';

//images
import searchIcon from '../assets/search.png'
import settingsIcon from '../assets/settings.png'

const Search = () => {

    const [keyword, setKeyword] = useState('');

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

            <button className='settings-btn'><img src={settingsIcon} alt="" /></button>

        </div>
    </div>

}

export default Search;