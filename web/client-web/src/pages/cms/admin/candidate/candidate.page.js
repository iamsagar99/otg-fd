import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { deleteCandidateById, getAllCandidate } from "../../../../services/candidate.service";
import { toast } from "react-toastify";
import {ImageViewComponentWithoutPreview} from "../../../../component/common/image-view.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";

const CandidatePage = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getCandidates();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCandidates = async () => {
        try {
            const response = await getAllCandidate();
            //console.log("candidate response:", response);
            if (response.status) {
                setData(response.result);
            } else {
                toast.error(response.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };

    const deleteCandidate = async (id) => {
        try {
            const response = await deleteCandidateById(id);
            if (response.status) {
                toast.success(response.msg);
                getCandidates();
            } else {
                toast.error(response.msg);
            }
        } catch (err) {
            console.log("delete", err);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter((item) =>
        Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const columns = [
        {
            name: 'Candidate',
            selector: row => row.candidate.name,
        },
        {
            name: 'Organization',
            selector: row => row.organization,
        },
        {
            name: 'Position',
            selector: row => row.position,
        },
        {
            name: 'Election',
            selector: row => row.election_id.title
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} onDeleteClick={deleteCandidate} updatePath={`/admin/candidates/` + row._id} />,
        },
    ];

    const expandableRowsComponent = ({ data }) => (
        <div style={{ margin: '10px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <ImageViewComponentWithoutPreview src={"user/" + data.candidate.image} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.manifesto }} />
            <hr style={{ borderTop: '3px solid #ff0000', marginTop: '10px' }} />
        </div>
    );

    return (
        <>
            <div className="container-fluid px-4">
                <AdminBreadCrumb createUrl={"/admin/candidate/create"} type={"Candidate"} opt={"Listing"} />
                <Row>
                    <Col sm={12}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{ marginBottom: '10px' }}
                        />
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            expandableRows
                            expandableRowsComponent={expandableRowsComponent}
                            expandableRowDisabled={row => !row.candidate.image && !row.manifesto}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CandidatePage;
