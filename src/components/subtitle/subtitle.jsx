
import './subtitle.css'

const Subtitle = ({ subtitle, description }) => {
    return <>
        <h2 className='sub-title'>{subtitle}</h2>
        <p className='description'>{description}</p>
    </>
}

export default Subtitle;