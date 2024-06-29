import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button,  Col, Row } from 'react-bootstrap';
import { getElectionBySlug } from '../../services/election.service';
import { getCandidateByElectionSlug } from '../../services/candidate.service';
import BallotComponent from '../../component/front/ballot.component';
import { addVote } from '../../services/vote.service';

const VotePage = () => {
    const { slug } = useParams();
    const [electionData, setElectionData] = useState(null);
    const [votes, setVotes] = useState({});
    const localUser = JSON.parse(localStorage.getItem('auth_user'));
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getElectionBySlug(slug);
                if (response.status) {
                    const election = response.result;
                    const candidateResponse = await getCandidateByElectionSlug(election.slug);
                    if (candidateResponse.status) {
                        const candidates = candidateResponse.result;
                        let ele = [];
                        election.positions.forEach(position => {
                            let pos = {};
                            pos.name = position;
                            pos.candidates = candidates.filter(candidate => candidate.position === position);
                            ele.push(pos);
                        });
                        setElectionData({ title: election.title, id: election._id, positions: ele })
                    } else {
                        // toast.error(candidateResponse.msg);
                    }
                } else {
                    // toast.error(response.msg);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [slug]);

    const handleVote = (positionName, candidateId) => {
        setVotes(prevVotes => ({
            ...prevVotes,
            [positionName]: candidateId
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        votes.election_id = electionData.id;
        votes.user_id = localUser._id;
        //console.log('Votes:', votes);
        try {

            let response = await addVote(votes);
            // console.log("first",response)
            if (response.status) {
                if(response.msg === "Some votes failed to save."){
                    toast.error(response.msg[0])
                }else{
                    toast.success(response.msg[0])
                    navigate('/')
                }
            } else {
                console.log(response.msg[0])
                toast.error(response.msg[0])
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response)
        }
    };
    
//console.log(electionData)
    return (
        <div style={{ backgroundColor: 'rgb(4,14,27)', minHeight: '100vh', color: 'white' }}>
            <h1 className="mb-4">{electionData ? electionData.title : 'Loading...'}</h1>
            <Form onSubmit={handleSubmit} style={{width:'100vw'}}>
                {electionData && electionData.positions.map(position => (
                    <>
                    <div  style={{ border: '1px solid #2257c0', borderRadius: '20px',marginLeft:'10px' ,width: '98vw'}} />
                    <div key={position.name} >
                        <h2>{position.name}</h2>
                        <div style={{ border: '1px solid #2257c0', borderRadius: '10px',marginLeft:'10px' ,width: '98vw'}}/>
                        <Row style={{ '--bs-gutter-x': '1.5rem', 'width': '100vw', '--bs-gutter-y': '0', 'display': 'flex', 'flexWrap': 'wrap', 'marginTop': 'calc(-1 * var(--bs-gutter-y))', 'marginRight': 'calc(-.5 * var(--bs-gutter-x))', 'marginLeft': 'calc(-.5 * var(--bs-gutter-x))' }}>
                            {position.candidates.map(candidate => (
                                <Col key={candidate._id} md={3} className="mb-3" >
                                    <BallotComponent
                                        img={candidate.candidate.image} // Pass candidate image
                                        name={candidate.candidate.name} // Pass candidate name
                                        position={`Candidate for ${position.name}`} // Pass position name
                                    />
                                    <Row style={{ marginLeft: '60%' }}>
                                        <Form.Check
                                            type="radio"
                                            id={candidate._id}
                                            label="Vote"
                                            checked={votes[position.name] === candidate._id}
                                            onChange={() => handleVote(position.name, candidate._id)}
                                        />
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </div>
                        </>
                ))}
                
                <Button variant="success" type="submit">Submit Vote</Button>
            </Form>
        </div>
    );
};

export default VotePage;
