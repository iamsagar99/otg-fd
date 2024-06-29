import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserByRole } from '../../../../services/user.service'; // Update with your user service path
import { getElection } from '../../../../services/election.service'; // Update with your election service path
import 'react-datepicker/dist/react-datepicker.css';

export const CandidateForm = ({ defaultData, handleSubmit, edit }) => {
    const [usersOptions, setUsersOptions] = useState([]);
    const [electionsOptions, setElectionsOptions] = useState([]);
    const [positionsOptions, setPositionsOptions] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchElections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUserByRole('all');
            if (response.status) {
                const options = response.result.map(user => ({
                    value: user._id,
                    label: user.name // Update with your user model field
                }));
                setUsersOptions(options);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchElections = async () => {
        try {
            const response = await getElection('all');
            if (response.status) {
                //console.log("responseelection", response.result)
                const currentDate = new Date();
                const options = response.result
                    .filter(election => currentDate < new Date(election.start_date) ) // Filter out elections with start_date in the past
                    .map(election => ({
                        value: election._id,
                        label: election.title, // Update with your election model field
                        positions: election.positions
                    }));
                setElectionsOptions(options);
                //console.log("first", electionsOptions);
            }
        } catch (error) {
            console.error('Error fetching elections:', error);
        }
    };
    

    const validationSchema = Yup.object().shape({
        candidate: Yup.string().required('Candidate is Required'),
        organization: Yup.string().required('Organization is Required'),
        election_id: Yup.string().required('Election is Required'),
        position: Yup.string().required('Position is Required'),
        manifesto: Yup.string().required('Manifesto is Required'),
    });

    const formik = useFormik({
        initialValues: defaultData,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //console.log("onSubmit", values);
            handleSubmit(values);
        }
    });

    useEffect(() => {
        if (defaultData) {
            formik.setValues({
                ...defaultData,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultData]);

    const handleElectionChange = (option) => {
        // formik.setFieldValue('election_id', option.value);
        //console.log(option)
        const selectedElection = electionsOptions.find(election => election.value === option);
        if (selectedElection) {
            setPositionsOptions(selectedElection.positions);
        } else {
            setPositionsOptions([]);
        }
    };
    

    return (
        <>
            <Container>
                <Row>
                    <Col sm={12} md={{ offset: 1, span: 9 }}>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="row mb-3" controlId="candidate">
                                <Form.Label className="col-sm-3">Candidate: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="select"
                                        name="candidate"
                                        onChange={formik.handleChange}
                                        value={formik.values.candidate}
                                    >
                                        <option value="">Select Candidate</option>
                                        {usersOptions.map(user => (
                                            <option key={user.value} value={user.value}>{user.label}</option>
                                        ))}
                                    </Form.Control>
                                    {formik.errors.candidate && <em className="text-danger">{formik.errors.candidate}</em>}
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3" controlId="organization">
                                <Form.Label className="col-sm-3">Organization: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="organization"
                                        placeholder="Enter organization"
                                        required={true}
                                        size={"sm"}
                                        value={formik.values.organization}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.organization && <em className="text-danger">{formik.errors.organization}</em>}
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3" controlId="election_id">
                                <Form.Label className="col-sm-3">Election: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="select"
                                        name="election_id"
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            handleElectionChange(e.target.value);
                                        }}
                                        value={formik.values.election_id}
                                    >
                                        <option value="">Select Election</option>
                                        {electionsOptions.map(election => (
                                            <option key={election.value} value={election.value}>{election.label}</option>
                                        ))}
                                    </Form.Control>
                                    {formik.errors.election_id && <em className="text-danger">{formik.errors.election_id}</em>}
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3" controlId="position">
                                <Form.Label className="col-sm-3">Position: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="select"
                                        name="position"
                                        onChange={formik.handleChange}
                                        value={formik.values.position}
                                    >
                                        <option value="">Select Position</option>
                                        {positionsOptions.map((position , index) => (
                                            <option key={index} value={position}>{position}</option>
                                        ))}
                                    </Form.Control>
                                    {formik.errors.position && <em className="text-danger">{formik.errors.position}</em>}
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3" controlId="manifesto">
                                <Form.Label className="col-sm-3">Manifesto: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="textarea"
                                        name="manifesto"
                                        placeholder="Enter manifesto"
                                        required={true}
                                        rows={3}
                                        value={formik.values.manifesto}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.manifesto && <em className="text-danger">{formik.errors.manifesto}</em>}
                                </Col>
                            </Form.Group>
                            <Form.Group className="row  mb-3">
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button variant="danger" type="reset" size="sm" className="me-3" onClick={formik.resetForm}>Cancel <i className="fa fa-trash"></i></Button>
                                    <Button variant="success" type="submit" size="sm">Submit <i className="fa fa-paper-plane"></i></Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
