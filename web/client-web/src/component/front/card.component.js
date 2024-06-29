import React from 'react';
import { NavLink } from 'react-router-dom';

const CardComponent = ({ img=null, title, slug,position = null,type }) => {
    //console.log("card",img,title,slug,position);
    let src = null;
    if(type==='candidates'){
        src = process.env.REACT_APP_IMAGE_URL + "user/"+img;
    }else{
        src = process.env.REACT_APP_IMAGE_URL + "election/"+img;
    }
    
    return (
        <div style={{
            backgroundColor: '#1f2a44',
            color: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '300px',
            margin: '20px auto',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                width: '100%',
                height: '150px', // Set a fixed height for the image container
                overflow: 'hidden', // Hide overflowing content
                borderRadius: '10px 10px 0 0',
                marginBottom: '15px'
            }}>
            { img && <img src={src} alt="Card phot" style={{
                    width: '100%',
                    height: '100%', // Fill the container
                    objectFit: 'cover', // Scale image while maintaining aspect ratio
                }} />}
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{title}</h3>
            {position && <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>{position}</h4>}
            <p style={{ fontSize: '16px', lineHeight: '1.5' }}> 
            </p>
            <NavLink to={`/${type}/${slug}`} style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#273c7a',
                color: '#fff',
                borderRadius: '5px',
                textDecoration: 'none',
                marginTop: '10px'
            }}>View Details</NavLink>
            
        </div>
    )
}

export default CardComponent;
