
import './projects.css'
import { useAuthValue } from '../../context/authContext';
import { useFetchDocs } from '../../hooks/useDocs';

import Subtitle from '../../components/subtitle/subtitle';
import Query from '../../components/query/query';

//images
import defaultAvatar from '../customers/assets/avatar.png'

const Projects = () => {

    const { user } = useAuthValue()
    const { loading, doc: docProject } = useFetchDocs(user.uid, 'Projetos')

    const formatDate = (date) => {
        const newdate = new Date(date * 1000)

        return {
            month: newdate.toString().split(' ')[1],
            day: newdate.toString().split(' ')[2]
        }
    }

    return <div className='container projects-container'>
        <Subtitle
            subtitle={'Meus Projetos'}
            description={'Visualize, edite e exclua os seus projetos existentes aqui.'}
        />
        <Query />

        {!loading && <div className='cards-container'>
            {docProject.map(project => (
                <div className={`card`}>
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
                        <button>detalhes</button>
                    </div>
                </div>
            ))}
        </div>}
    </div>
}

export default Projects;

