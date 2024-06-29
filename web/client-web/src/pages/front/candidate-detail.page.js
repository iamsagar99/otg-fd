import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCandidateBySlug } from '../../services/candidate.service';
import SliderComponent from '../../component/front/slider.component';

const CandidateDetailPage = () => {
    const params = useParams();
    const [data, setData] = useState({});
    const [sliderData, setSliderData] = useState([]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getCandidate = async () => {
        try {
            let response = await getCandidateBySlug(params.slug);
            if (response.status) {
                const candidate = response.result[0].candidate;
                const images = [candidate.image]; // Wrap the candidate's image in an array
                const sliders = images.map((img, index) => ({
                    image: img,
                    title: ``, // Provide a title for each image if needed
                }));
                setSliderData(sliders);
                setData(response.result[0]);
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCandidate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ backgroundColor: 'rgb(4,14,27)', minHeight: '100vh', color: 'white' }}>
            <div className="row mb-4 mx-3">
                <div className="col-md-6">
                    <SliderComponent type="user" data={sliderData} />
                </div>
                <div className="col-md-6">
                    <h2 className="my-5">{data?.candidate?.name}</h2>
                    <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        <strong>Date Of Birth:</strong> {formatDate(data?.candidate?.dob)}
                    </p>
                    <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        <strong>Email :</strong> {data?.candidate?.email}
                    </p>
                    <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        <strong>Election :</strong> {data?.election_id?.title}
                    </p>
                    <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        <strong>Positions:</strong> {data?.position}
                    </p>
                    <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        <strong>Organization:</strong> {data?.organization}
                    </p>
                </div>
            </div>
            <div className="row m-lg-5" style={{ border: '2px solid rgb(34,87,192)', borderRadius: '17px' }}>
                <div className="col" dangerouslySetInnerHTML={{ __html: data?.manifesto }}></div>
            </div>
        </div>
    );
};

export default CandidateDetailPage;
