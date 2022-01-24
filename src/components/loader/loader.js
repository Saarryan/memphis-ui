import './loader.scss'
import loading from '../../assets/images/strech.gif'


const Loader = () => {
    return (
        <div className="loader-container">
            <div></div>
            <img src={loading} alt="loading"></img>
        </div>
    )

}

export default Loader