import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { Row, Col, Badge } from 'react-bootstrap';
import SliderComponent from '../../component/front/slider.component';
import { getResultByEid } from '../../services/result.service';
import { ImageViewComponent } from '../../component/common/image-view.component';

const ResultDetail = () => {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState(null);
    const [sliderData, setSliderData] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getResultByEid(id);
                if (response.status) {
                    setData(response.result);
                    setSliderData(response.result.election_id.images.map(img => ({ image: img, title: '' })));
                } else {
                    toast.error(response.msg);
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const formatDate = dateString => new Date(dateString).toLocaleDateString();
    const formatTime = timeString => new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        data && <div style={{ backgroundColor: 'rgb(4,14,27)', minHeight: '100vh', color: 'white' }}>
            <div className="row mb-4 mx-3">
                <div className="col-md-4">
                    <SliderComponent type="election" data={sliderData} />
                </div>
                <div className="col-md-8">
                    <h2 className="my-5 text-center">Result of {data?.election_id.title} Election</h2>
                    <span className="mb-2" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        <strong>Start Date:</strong> {formatDate(data?.election_id.start_date)} {formatTime(data?.election_id.start_date)}
                    </span>
                    <span className="mb-2 p-5" style={{ marginLeft: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        <strong>End Date:</strong> {formatDate(data?.election_id.end_date)} {formatTime(data?.election_id.end_date)}
                    </span>
                </div>
            </div>

            <div className="row m-5 ">
                <div>
                    <h2>Election Results</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#406387', textAlign: 'left' }}>Position</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px',backgroundColor: '#406387', textAlign: 'left' }}>Winner</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px',backgroundColor: '#406387', textAlign: 'left' }}>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.positions.map((position) => (
                                <tr key={position._id}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{position.position}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '2px' }}>
                                        <div style={{ width: '180px', height: '250px', borderRadius: '50%', marginRight: '10px' }}>
                                            <ImageViewComponent src={"user/"+position.winner.candidate.image} alt={position.winner.candidate.name} style={{ width: '80px', height: '80px', borderRadius: '50%', marginRight: '10px' }} />
                                            <h3 style={{ fontSize: '16px', margin: '10px' }}>{position.winner.candidate.name}</h3>
                                            <h3 style={{ fontSize: '16px', margin: '10px' }}>{position.winner.candidate.organization}</h3>
                                        </div>
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{position.candidates[0].votes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row m-5">
                <div>
                    <h2>Candidate Results</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#406387', textAlign: 'left' }}>Candidate</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#406387', textAlign: 'left' }}>Organization</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#406387', textAlign: 'left' }}>Position</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#406387', textAlign: 'left' }}>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.positions.map((position) => (
                                <React.Fragment key={position._id}>
                                    {position.candidates.map((item) => (
                                        <tr key={`${position._id}-${item._id}`}>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.candidate.candidate.name}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.candidate.organization}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{position.position}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.votes}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{marginTop:'10px',height:"40px"}}></div>
        </div>
    )
}

export default ResultDetail;
