import "../../assets/user-css/hero.css"
import {  useNavigate } from 'react-router-dom';
const HomePage = () => {
const navigate = useNavigate()
    return (
        <>

<div className="hero">
      <div className="hero-content">
        <h1>Realtime Financial Fraud Detection</h1>
        <p>Stay ahead of financial threats with our advanced fraud detection solutions.</p>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
</>

    );
}

export default HomePage;