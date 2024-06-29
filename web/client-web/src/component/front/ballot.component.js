import React from 'react';
// import { NavLink } from 'react-router-dom';

const BallotComponent = ({ img, name, position }) => {
    // Set image source using environment variable
    const src = img ? process.env.REACT_APP_IMAGE_URL + "user/" + img : '';

    return (
        <div style={{
            backgroundColor: '#1f2a44',
            color: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '250px',
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
               { src && <img src={src} alt="ima of card" style={{
                    width: '100%',
                    height: '100%', // Fill the container
                    objectFit: 'cover', // Scale image while maintaining aspect ratio
                }} />}
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{name}</h3>
            {position && <p style={{ fontSize: '15px', marginBottom: '10px' }}>{position}</p>}
        </div>
    )
}

export default BallotComponent;
