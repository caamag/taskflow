
import './home.css'
import { useAuthValue } from '../../context/authContext';

//components
import Search from '../../components/search/search';
import Salutation from '../../components/salutation/salutation';

const Home = () => {

    const { user } = useAuthValue()
    const displayName = user.displayName;

    return <div className='container home-container'>
        <Search />
        <Salutation userName={displayName} />
    </div>

}

export default Home;