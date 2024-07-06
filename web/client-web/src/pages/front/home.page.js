import "../../assets/user-css/hero.css"
import {  useNavigate } from 'react-router-dom';
const HomePage = () => {
const navigate = useNavigate()
    return (
        <>

<div className="hero">
      <div className="hero-content">
        <h1 style={{fontSize:'3.2rem'}}>Realtime Financial Transaction Anomaly Detection</h1>
        <p style={{fontSize:'2.2rem'}}>Stay ahead of financial threats with our advanced fraud detection solutions.</p>
        <em style={{fontSize:'2.2rem'}}>This is a simulator app describing how this anomaly detection system can be integrate with existing financial service provider.</em>
        {/* <button className="cta-button">Learn More</button> */}
      </div>
    </div>
</>

    );
}

export default HomePage;