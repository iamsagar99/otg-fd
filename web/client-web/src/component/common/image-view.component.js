import React, { useEffect } from 'react';
import LightGallery from 'lightgallery/react';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

// Import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

export const ImageViewComponent = ({ src }) => {
    useEffect(() => {
        // Initialize LightGallery manually if using React Hooks
        lightGallery(document.getElementById('lightgallery'), {
            plugins: [lgThumbnail, lgZoom],
            speed: 150,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let path = process.env.REACT_APP_IMAGE_URL + src;

    return (
        <div id="lightgallery">
            <a href={path}>
                <img src={path} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
            </a>
        </div>
    );
};

export const ImageViewComponentWithoutPreview = ({ src }) => { 
    let path = process.env.REACT_APP_IMAGE_URL + src;
    // console.log("env",process.env.REACT_APP_NOT_SECRET_CODE)
    const onInit = (e)=>{

    }
    return (<>
        <LightGallery
            onInit={onInit}
            speed={150}
            plugins={[lgThumbnail, lgZoom]}
        >
            <a href={path}>
                    view-image
                </a>
        </LightGallery>
    </>)
};
