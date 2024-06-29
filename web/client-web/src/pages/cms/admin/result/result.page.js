import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllResult } from "../../../../services/result.service";
import { toast } from "react-toastify";

const ResultPage = () => {
    const getResults = async () => {
        try {
            let response = await getAllResult('all');
            if (response.status) {
                setData(response.result);
            } else {
                toast.error(response.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    const [data, setData] = useState([]);
    
    useEffect(() => {
        getResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container-fluid px-4">
            <h2>Results</h2>
            <Row>
                <Col sm={12}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Election Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Positions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.election_id.title}</td>
                                    <td>{result.election_id.start_date}</td>
                                    <td>{result.election_id.end_date}</td>
                                    <td>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Position</th>
                                                    <th>Winner</th>
                                                    <th>Votes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.positions.map((position, idx) => (
                                                    <tr key={idx}>
                                                        <td>{position.position}</td>
                                                        <td>{position.winner.candidate.name}</td>
                                                        <td>{position.candidates.find(candidate => candidate.candidate._id === position.winner._id).votes}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
}

export default ResultPage;
