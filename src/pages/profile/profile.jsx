
import { useAuthentication } from '../../hooks/useAuthentication';
import './profile.css'

import { useState } from 'react';

//images
import loadingIcon from '../../../public/loading.jpg'

const Profile = () => {

    const [urlPicture, setUrlPicture] = useState('');
    const [formPicture, setformPicture] = useState(false);
    const [error, setError] = useState(false)

    const { loading, error: authError, updateProfilePicture, auth } = useAuthentication()

    const defaultURLPhoto = 'https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg'
    const user = auth.currentUser;

    async function handleUpdatePicture(e) {
        e.preventDefault()
        const regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!regexURL.test(urlPicture)) {
            setError(true)
            setUrlPicture('')
            setTimeout(() => { setError(false) }, 4000)
            return;
        }
        await updateProfilePicture(urlPicture)
        setUrlPicture('')
        setformPicture(false)
    }

    //profile form
    console.log(user);

    return <div className='container profile-container'>
        <div className='photo-container'>
            <div className='profile-photo' style={{
                backgroundImage: `url(${user.photoURL ? user.photoURL : defaultURLPhoto})`,
                filter: `${user.photoURL ? 'invert(0%)' : 'invert(80%)'}`
            }}></div>

            {!formPicture && <button onClick={() => { setformPicture(true) }}>Mudar Imagem</button>}

            {formPicture && <form className='picture-form' onSubmit={handleUpdatePicture}>
                {!loading && <>
                    <input
                        type="text"
                        required
                        value={urlPicture}
                        placeholder='URL da imagem:'
                        onChange={(e) => { setUrlPicture(e.target.value) }}
                    />
                    <button
                        type='button'
                        className='close-picture-form-btn'
                        onClick={() => { setformPicture(false) }}>X</button><br />

                    <button type='submit'>Mudar Imagem</button>
                </>}
                {error && <p className='error-message'>URL inválida!</p>}
                {loading && <img src={loadingIcon} className='loading-change-photo' />}
            </form>}
        </div>

        <form className='profile-form'>
            <h1>Meu Perfil</h1>

            <label>

            </label>
        </form>
    </div>

}

export default Profile;