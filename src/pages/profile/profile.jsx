
import { useAuthentication } from '../../hooks/useAuthentication';
import { useUpdate } from '../../hooks/updateNameAndTel'
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
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('')
    const [tel, setTel] = useState('');
    const { loading: profileLoading, updateDisplayName } = useUpdate()

    const firstName = user.displayName ? user.displayName.split(' ')[0] : ''
    const secondName = user.displayName ? user.displayName.split(' ')[1] : ''

    async function handleProfileContent(e) {
        e.preventDefault()

        const userName = `${name} ${lastName}`
        await updateDisplayName(userName)
    }

    return <div className='container profile-container'>
        <div className='photo-container'>
            <div className='profile-photo' style={{
                backgroundImage: `url(${user.photoURL ? user.photoURL : defaultURLPhoto})`,
                filter: `${user.photoURL ? 'invert(0%)' : 'invert(80%)'}`
            }}></div>
            {profileLoading && <img src={loadingIcon} className='profile-loading' />}<br />
            {!profileLoading && <h3 className='user-name'>{user.displayName}</h3>}

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

        <form className='profile-form' onSubmit={handleProfileContent}>
            <h1>Meu Perfil</h1>
            <div>
                <label>
                    PRIMEIRO NOME <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder={firstName ? firstName : '...'}
                        required
                    />
                </label>

                <label>
                    SEGUNDO NOME <br />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                        placeholder={secondName ? secondName : '...'}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    E-MAIL <br />
                    <input
                        type="text"
                        placeholder={user.email}
                        required
                        disabled
                    />
                </label>
            </div>

            {profileLoading && <img src={loadingIcon} className='profile-loading' />}
            {!profileLoading && <button type='submit' className='update-profile'>Atualizar</button>}

            <h4>Dados da conta:</h4>
            <p>Data de criação da conta:  {user.metadata.creationTime}</p>
            <p>Último login: {user.metadata.lastSignInTime}</p>
        </form>
    </div>

}

export default Profile;