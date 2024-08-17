
import './finished.css'
import { useFetchDocs } from '../../hooks/useDocs'
import Subtitle from '../../components/subtitle/subtitle'
import Query from '../../components/query/query'
import { useAuthValue } from '../../context/authContext'
import { useState } from 'react'

import loadingIcon from '../../../public/loading.jpg'
import correctIcon from '../../../public/correct-icon.png'
import arrow from '../../../public/arrow.png'

const Finished = () => {

    const { user } = useAuthValue()
    const { doc, loading } = useFetchDocs(user.uid, 'Projetos')
    const finishedProjects = doc.filter(doc => doc.isFinished)

    const [isVisible, setIsVisible] = useState(null);
    const [search, setSearch] = useState('')

    const changeVisibility = (projectId) => {
        setIsVisible(isVisible === projectId ? null : projectId)
    }

    const formatDate = (date) => {
        const newdate = new Date(date * 1000)

        return {
            month: newdate.toString().split(' ')[1],
            day: newdate.toString().split(' ')[2]
        }
    }

    const handleSearch = (projectName, customer, price) => {
        if (projectName.toLowerCase().includes(search)
            || projectName.includes(search)
            || customer.toLowerCase().includes(search)
            || price.toString().includes(search)) {
            return ''
        }
        return 'delete'
    }

    return <div className='container finished-container'>
        <Subtitle
            subtitle={'Projetos finalizados'}
            description={'Visualize os projetos que já foram finalizados.'}
        />
        <Query search={search} setSearch={setSearch} />

        {loading && <img src={loadingIcon} className='loading-initial' />}

        <div className='finished-content'>
            {!loading && finishedProjects.map(project => (
                <div
                    key={project.id}
                    className={`finish-container ${handleSearch(project.projectName, project.customerSelected, project.price)}`}
                    style={{ height: `${isVisible === project.id ? '300px' : '80px'}` }}
                >
                    <div className='project-title'>
                        <img src={correctIcon} alt="correct-icon" className='correct-icon' />
                        <h2>{project.projectName}</h2>
                    </div>
                    <img
                        src={arrow}
                        alt="arrow"
                        className='arrow-icon'
                        onClick={() => { changeVisibility(project.id) }}
                        style={{ transform: `${isVisible === project.id ? 'rotate(180deg)' : ''}` }}
                    />

                    <div className='finish-content'>
                        <div>
                            <ul>
                                <li><strong>Cliente</strong>: {project.customerSelected.split('_')[0]}</li>
                                <li><strong>Projeto</strong>: {project.projectName}</li>
                                <li><strong>Valor cobrado</strong>: R${project.price},00</li>
                                <li><strong>Prioridade</strong>: {project.priority}</li>
                                <li><strong>Data de criação</strong>: {formatDate(project.createdAt).day} {formatDate(project.createdAt).month} {project.yearCreation}</li>
                                <li><strong>Projeto favoritado: {project.isFavorite ? 'Sim' : 'Não'}</strong></li>
                            </ul>
                        </div>

                        <div className='finish-details'>
                            <strong>Detalhes do projeto:</strong><br />
                            <p>
                                {project.details}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default Finished;