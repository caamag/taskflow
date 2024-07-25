
import './query.css'
import searchIcon from '../assets/search.png'

const Query = ({ search, setSearch }) => {
    return <div className='search'>
        <div className='search-inner'>
            <img src={searchIcon} alt="" />
            <input
                type="text"
                placeholder='Pesquisar:'
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
            />
        </div>
    </div>
}

export default Query;