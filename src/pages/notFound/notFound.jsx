
import './notFound.css'

const NotFound = () => {

    function backPreviewPage() {
        window.history.back()
    }

    return <div className='not-found-container'>
        <h1>404</h1>
        <h2>PÁGINA NÃO ENCONTRADA</h2>
        <p>A página que você está procurando não exite.</p>
        <button onClick={() => { backPreviewPage() }}>
            Voltar para página anterior
        </button>
    </div>
}

export default NotFound;