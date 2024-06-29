import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Badge } from 'react-bootstrap';
import SliderComponent from '../../component/front/slider.component';
import CardComponent from '../../component/front/card.component';
import { getElectionBySlug } from '../../services/election.service';
import { getCandidateByElectionSlug } from '../../services/candidate.service';
import { getResultByEid } from '../../services/result.service';

const ElectionDetailPage = () => {
    const localUser = JSON.parse(localStorage.getItem('auth_user'));
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [sliderData, setSliderData] = useState([]);
    const [isVoter, setIsVoter] = useState(false);
    const navigate = useNavigate();

    const isEndDatePassed = (endDate) => {
        const currentDate = new Date(); 
        const endDateTime = new Date(endDate); 
    
        return endDateTime > currentDate;
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getElectionBySlug(slug);
                if (response.status) {
                    const electionData = response.result;
                    setIsVoter(electionData.voters.includes(localUser._id));
                    setData(electionData);

                    const candidateResponse = await getCandidateByElectionSlug(electionData.slug);
                    if (candidateResponse.status) {
                        electionData.candidates = candidateResponse.result;
                        setData(electionData);
                    } else {
                        // toast.error(candidateResponse.msg);
                    }

                    const resultResponse = await getResultByEid(electionData._id);
                    if (resultResponse.status) {
                        electionData.result = true;
                        setData(electionData);
                    } else {
                        // toast.error(resultResponse.msg);
                    }

                    setSliderData(electionData.images.map(img => ({ image: img, title: '' })));
                } else {
                    // toast.error(response.msg);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [slug, localUser._id]);


    const formatDate = dateString => new Date(dateString).toLocaleDateString();
    const formatTime = timeString => new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // console.log("-data___",data.candidates)

    return (
        data && <div style={{ backgroundColor: 'rgb(4,14,27)', minHeight: '100vh', color: 'white' }}>
        <div className="row mb-4 mx-3">
            <div className="col-md-6">
                <SliderComponent type="election" data={sliderData} />
            </div>
            <div className="col-md-6">
                <h2 className="my-5">{data?.title}</h2>
                <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    <strong>Start Date:</strong> {formatDate(data?.start_date)} {formatTime(data?.start_date)}
                </p>
                <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    <strong>End Date:</strong> {formatDate(data?.end_date)} {formatTime(data?.end_date)}
                </p>
                <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    <strong>Positions:</strong> {data?.positions?.join(',')}
                </p>
                <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    <strong>Number of Voters:</strong> {data?.voters?.length}
                </p>
                <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    <strong>Status:</strong>{' '}
                    <Badge bg={data?.status === 'active' ? 'success' : 'danger'} style={{ fontSize: '1rem' }}>
                        {data?.status}
                    </Badge>
                </p>
                <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    <strong>Result :</strong>{' '}
                    <Badge bg={data?.result ? 'success' : 'warning'} style={{ fontSize: '1rem' }} onClick={(e) => {
                        if (data.result) {
                            navigate(`/results/${data.slug}/${data._id}`);
                        }
                    }}>
                        {data?.result ? 'Result has been published View Here' : 'waiting for result'}
                    </Badge>
                </p>
                <div>
                    <p className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        {isVoter && !data.end_date_passed ? (
                            <span className="text-success"> You are eligible to vote for this election <i className="fas fa-check" style={{ fontSize: '24px', color: 'green' }}></i></span>
                        ) : (
                            <span className="text-danger"> You are not eligible to vote for this election <i className="fas fa-times" style={{ fontSize: '24px', color: 'red' }}></i></span>
                        )}
                    </p>
                    {isVoter && isEndDatePassed(data.end_date) && (
                        <button
                        style={{
                            marginLeft: '40px',
                            fontSize: '1.2rem',
                            lineHeight: '1.6',
                            padding: '2px 5px', // Adding padding for better appearance
                            backgroundColor: 'green', // Blue background color
                            color: 'white', // White text color
                            border: 'none', // No border
                            borderRadius: '5px', // Rounded corners
                            cursor: 'pointer', // Cursor style on hover
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for depth
                            transition: 'background-color 0.3s ease', // Smooth transition on hover
                        }}
                        onClick={(e) => {
                            navigate(`/add-vote/${data.slug}/${data._id}`);
                        }}
                    >
                        Vote Candidate
                    </button>
                    
                    )}
                </div>
            </div>
        </div>
        <div className="row m-lg-5" style={{ border: '2px solid rgb(34,87,192)', borderRadius: '17px' }}>
            <div className="col" dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </div>
        <div >
            <h3>Candidates</h3>
            <div >
                <Row>
                    {data?.candidates?.map((item, index) => (
                        <Col sm={4} md={4} key={index}>
                            <CardComponent
                            name={item.candidate.name}
                            position={item.position}
                            img = {item.candidate.image}
                            title={item.candidate.name}
                            slug={item.slug}
                            type="candidates"
                        />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    </div>
    );
};

export default ElectionDetailPage;
