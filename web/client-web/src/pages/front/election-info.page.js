import React, { useEffect, useState } from 'react';
import { getElection } from '../../services/election.service';
import { toast } from 'react-toastify';
import CardComponent from '../../component/front/card.component';
import { Row, Col } from 'react-bootstrap';

const Elections = () => {
    const [elections, setElections] = useState([]);

    const getElections = async () => {
        try {
            let response = await getElection('all');
            if (response.status) {
                setElections(response.result);
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while fetching elections.');
        }
    };

    useEffect(() => {
        getElections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ backgroundColor: 'rgb(4,14,27)', minHeight: '100vh', color: 'white' }}>
            <h3 className="text-center p-3"> Elections</h3>
            <Row className='mt-2 mx-5'>
                {elections && elections.map((item, index) => (
                    <Col sm={6} md={2} key={index} className="mb-3">
                        <CardComponent
                            img = {item.images[0]}
                            title={item.title}
                            slug={item.slug}
                            type="elections"
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Elections;
