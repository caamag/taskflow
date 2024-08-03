
import './projects.css'
import { useState } from 'react';
import { useAuthValue } from '../../context/authContext';
import { useFetchDocs } from '../../hooks/useDocs';
import loadingIcon from '../../../public/loading.jpg'

import Subtitle from '../../components/subtitle/subtitle';
import Query from '../../components/query/query';
import ProjectCard from '../../components/projectCard/projectCard';

//images
import defaultAvatar from '../customers/assets/avatar.png'

const Projects = () => {

    const { user } = useAuthValue()
    const { loading, doc: docProject } = useFetchDocs(user.uid, 'Projetos')

    const [search, setSearch] = useState('')
    const [cardVisible, setCardVisible] = useState(false)

    const [projectName, setProjectName] = useState('')
    const [customer, setCustomer] = useState('')
    const [priority, setPriority] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')
    const [isFavorite, setIsFavorite] = useState()

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


    return <div className='container projects-container'>
        <Subtitle
            subtitle={'Meus Projetos'}
            description={'Visualize, edite e exclua os seus projetos existentes aqui.'}
        />
        <Query search={search} setSearch={setSearch} />

        {!loading && <div className='cards-container'>
            {docProject.map(project => (
                <>
                    <div className={`card ${handleSearch(project.projectName, project.customerSelected, project.price)}`}>
                        <div className={`content ${project.priority}`}>
                            <img src={defaultAvatar} alt="" className='avatar' />
                            <h4 className='subtitle'>{formatDate(project.createdAt).day} {formatDate(project.createdAt).month} {project.yearCreation}</h4>
                            <p>{project.customerSelected.split('_')[0]}</p>
                            <h2>
                                {project.projectName.split(' ')[0]} <br />
                                {project.projectName.split(' ').splice(1).map(text => (`${text} `))}
                            </h2>
                            <p>Prioridade:
                                {project.priority === 'low' ? ' Baixa' :
                                    project.priority === 'medium' ? ' Média' :
                                        project.priority === 'high' ? ' Alta' : ''}
                            </p>
                        </div>

                        <div className='details'>
                            <h4 className='price'>R${project.price},00</h4>
                            <button
                                onClick={() => {
                                    setCardVisible(true)

                                }}>
                                detalhes
                            </button>
                        </div>
                    </div>
                </>
            ))}
        </div>}

        {cardVisible && <ProjectCard
            setCardVisible={setCardVisible}

        />}

        {loading && <img alt='loading icon' src={loadingIcon} className='loading-initial' />}
    </div>
}

export default Projects;

