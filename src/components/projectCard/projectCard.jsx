
import './projectCard.css'
import { useState, useEffect } from 'react';

const ProjectCard = ({ setCardVisible }) => {



    return <div className='project-card-container'>
        <div className='card'>
            <button className='close-card' onClick={() => { setCardVisible(false) }}>x</button>
        </div>
    </div>
}

export default ProjectCard;