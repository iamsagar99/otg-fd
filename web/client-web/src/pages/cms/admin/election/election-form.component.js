import { Form, Button, Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { toast } from "react-toastify";
import { getUserByRole } from "../../../../services/user.service";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ElectionCreateForm = ({ defaultData, handleSubmit }) => {
    const [allVoters, setAllVoters] = useState([]);
    // const [selectedVoters, setSelectedVoters] = useState([]);
    // const logged_in_user = JSON.parse(localStorage.getItem("auth_user"));
    // const [positions, setPositions] = useState([]);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        description: Yup.string().required('Description is Required'),
        start_date: Yup.date().required('Start Date is Required'),
        end_date: Yup.date().required('End Date is Required'),
        positions: Yup.array().of(Yup.object().required('Position is Required')),
        images: Yup.array().min(1, 'At least one image is required'),
        voters: Yup.array().min(1, 'At least one voter is required')
    });



  

    const formik = useFormik({
        initialValues: defaultData,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // handleSubmit(values);
            //console.log("first")
            //console.log(values)
        }
    });

    const fetchAllVoters = async () => {
        try {
            const response = await getUserByRole('all');
            let voters = [];
            if (response.status) {

                let user = {};
                response.result.map((item) => {
                    user = {
                        value: item._id,
                        label: item.name
                    }
                    voters.push(user);
                    return voters;
                })
                setAllVoters(voters);
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Error fetching voters:", error);
            toast.error("Error fetching voters");
        }
    };

    useEffect(() => {
        fetchAllVoters();
    }, []);

    // const handleSelectAllVoters = () => {
    //     // Functionality to select all voters
    //     formik.setValues({
    //         ...formik.values,
    //         voters: allVoters.map(voter => voter._id)
    //     });
    // };


    return (
        <>

            {allVoters && <Form onSubmit={formik.handleSubmit}>
                {/* Other form fields */}
                <Form.Group className="row mb-3" controlId="title">
                    <Form.Label className="col-sm-3">Title: </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Brand Title"
                            required={true}
                            size={"sm"}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.errors.title && <em className="text-danger">{formik.errors.title}</em>
                        }
                    </Col>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="start_date">
                    <Form.Label className="col-sm-3">Start Date: </Form.Label>
                    <Col sm={9}>
                        <DatePicker
                            selected={formik.values.start_date}
                            onChange={(date) => formik.setFieldValue('start_date', date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd HH:mm:ss"                        />
                        {formik.errors.start_date && <em className="text-danger">{formik.errors.start_date}</em>}
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="end_date">
                    <Form.Label className="col-sm-3">End Date: </Form.Label>
                    <Col sm={9}>
                        <DatePicker
                            selected={formik.values.end_date}
                            onChange={(date) => formik.setFieldValue('end_date', date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd HH:mm:ss"                        />
                        {formik.errors.end_date && <em className="text-danger">{formik.errors.end_date}</em>}
                    </Col>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="description">
                    <Form.Label className="col-sm-3">Description: </Form.Label>
                    <Col sm={9}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formik.values.description || "  "} // Provide a default empty string if description is null
                            name="description"
                            onChange={(event, editor) => {
                                const data = editor.getData();

                                formik.setFieldValue("description", data);
                            }}
                        />
                        {
                            formik.errors.description && <em className="text-danger">{formik.errors.description}</em>
                        }
                    </Col>
                </Form.Group>


                <Form.Group className="row mb-3" controlId="positions">
                    <Form.Label className="col-sm-3">Positions:</Form.Label>
                    <Col sm={9}>
                        <CreatableSelect
                            isClearable
                            options={[]}
                            isMulti
                            name="positions"
                            value={formik.values.positions}
                            onChange={(selectedOptions) => {
                                // Update positions directly using spread operator
                                formik.setValues({
                                    ...formik.values,
                                    positions: selectedOptions,
                                })
                            }}
                        />
                        {formik.errors.positions && <em className="text-danger">{formik.errors.positions}</em>}
                    </Col>
                </Form.Group>


                <Form.Group className="row mb-3" controlId="voters">
                    <Form.Label className="col-sm-3">Select Voters:</Form.Label>
                    <Col sm={9}>
                        <Select
                            options={allVoters}
                            isMulti
                            name="voters"
                            value={formik.values.voters}

                            onChange={(selectedOptions) => {
                                formik.setValues({
                                    ...formik.values,
                                    voters: selectedOptions
                                })
                            }}
                        />
                        {formik.errors.voters && <em className="text-danger">{formik.errors.voters}</em>}
                        {/* <Button variant="link" onClick={handleSelectAllVoters}>Select All</Button> */}
                    </Col>
                </Form.Group>

                <Form.Group controlId="formFileSm" className="row mb-3">
                    <Form.Label className="col-sm-3">Images:</Form.Label>
                    <Col sm={3}>

                        <Form.Control type="file" multiple size="sm" name="image" required={formik.values.images ? false : true} onChange={(e) => {
                            // let file = e.target.files; it gives object of object
                            // to convert object of object to array following method should be followed
                            let file = Object.values(e.target.files);

                            formik.setValues({
                                ...formik.values,
                                images: file
                            })
                        }} />
                        {
                            formik.errors.images && <em className="text-danger">{formik.errors.images}</em>
                        }
                    </Col>

                </Form.Group>

                <Row>

                    {
                        formik.values.image ?
                            (
                                formik.values.image.map((img, key) => (
                                    <Col sm={1} key={key}>
                                        {typeof (img) === "string" ?
                                            <img src={process.env.REACT_APP_IMAGE_URL + "election/" + img} alt="" className="img img-fluid img-thumbnail mb-2" />

                                            :
                                            <img src={URL.createObjectURL(img)} alt="" className="img img-fluid img-thumbnail mb-2" />
                                        }
                                    </Col>
                                ))
                            )
                            :
                            <></>
                    }

                </Row>

                <Form.Group className="row  mb-3">
                    <Col sm={{ offset: 3, span: 9 }}>
                        <Button variant="danger" type="reset" size="sm" className="me-3" onClick={formik.resetForm}>Cancel <i className="fa fa-trash"></i></Button>
                        <Button variant="success" type="submit" size="sm" onClick={(e)=>{
                            e.preventDefault();
                            //console.log("sae")
                            //console.log(formik.values)
                            handleSubmit(formik.values)
                        }}>Submit <i className="fa fa-paper-plane"></i></Button>

                    </Col>
                </Form.Group>
            </Form>}
        </>
    );
};
