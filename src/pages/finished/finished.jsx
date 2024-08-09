
import './finished.css'
import { useFetchDocs } from '../../hooks/useDocs'
import Subtitle from '../../components/subtitle/subtitle'
import Query from '../../components/query/query'
import { useAuthValue } from '../../context/authContext'

import loadingIcon from '../../../public/loading.jpg'

const Finished = () => {

    const { user } = useAuthValue()
    const { doc, loading } = useFetchDocs(user.uid, 'Projetos')
    // const finishedProjects = doc.filter()


    return <div className='container finished-container'>
        <Subtitle
            subtitle={'Projetos finalizados'}
            description={'Visualize os projetos que já foram finalizados.'}
        />
        <Query />

        <div className='finished-content'>

        </div>
    </div>
}

export default Finished;