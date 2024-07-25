
import './newProject.css'
import searchIcon from '../customers/assets/search.png'
import loadingIcon from '../../../public/loading.jpg'

import { db } from '../../firebase/config'
import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/authContext'
import PopupError from '../../components/popupError/popup'
import PopupSuccess from '../../components/popupSuccess/popupSucess'
import Subtitle from '../../components/subtitle/subtitle'


const NewProject = () => {

    const [projectName, setProjectName] = useState('')
    const [price, setPrice] = useState(null)
    const [details, setDetails] = useState('')

    console.log(price);

    return <div className='container new-project-container'>
        <Subtitle
            subtitle={'Adicionar novo projeto'}
            description={'Crie novos projetos para melhorar a organização do seu trabalho.'}
        />

        <form>
            <input
                type="text"
                placeholder='Título do projeto:'
                value={projectName}
                onChange={(e) => { setProjectName(e.target.value) }}
                required
            />

            <input
                type="number"
                placeholder='Preço:'
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
                required
            />

            <textarea
                placeholder='Detalhes do projeto (opicional):'>
            </textarea>

            <select>
                <option value="-">-</option>
                <option value="Caio">Caio</option>
                <option value="Caio">Caio</option>
            </select>
        </form>
    </div>
}

export default NewProject;
