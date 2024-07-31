
import './projects.css'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthValue } from '../../context/authContext';
import { db } from '../../firebase/config';

import Subtitle from '../../components/subtitle/subtitle';
import Query from '../../components/query/query';
import { formatDate } from '../../hooks/formatDate';

//images
import defaultAvatar from '../customers/assets/avatar.png'


const Projects = () => {

    const [projetcs, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useAuthValue()

    useEffect(() => {
        const getProjects = async () => {
            setLoading(true)
            const userId = user.uid;
            const querySnapshot = await getDocs(collection(db, 'users', userId, 'Projetos'))
            const projectList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            projectList.sort((a, b) => b.createdAt - a.createdAt)
            setProjects(projectList)
            setLoading(false)
        }
        getProjects()
    }, [])

    console.log(projetcs);


    return <div className='container projects-container'>
        <Subtitle
            subtitle={'Meus Projetos'}
            description={'Visualize, edite e exclua os seus projetos existentes aqui.'}
        />
        <Query />

        {!loading && <div className='cards-container'>
            {projetcs.map(project => (
                <div className={`card`}>
                    <div className={`content ${project.priority}`}>
                        <img src={defaultAvatar} alt="" className='avatar' />
                        <h4 className='subtitle'>01 junho 2024</h4>
                        <p>{project.customerSelected}</p>
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

