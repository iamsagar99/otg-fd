import { Col, Row } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { useEffect } from "react";
import { deleteElectionById, getElection } from "../../../../services/election.service";
import { useState } from "react";
import { toast } from "react-toastify";
import {ImageViewComponent} from "../../../../component/common/image-view.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
import { useNavigate } from "react-router";
import { getResultByEid,calculateElectionResult } from "../../../../services/result.service";



const ElectionPage = () => {
    const navigate = useNavigate();
    const deleteElection = async (id) => {
        try {
            let response = await deleteElectionById(id);
            if (response.status) {
                toast.success(response.msg)
                getAllElections()
            }
            else {
                toast.error(response.msg);
            }
        } catch (err) {
            console.log("delete", err)
        }
    }

    const ExpandableComponent = ({ data }) => (
        <div style={{ margin: '10px', fontSize: '14px' }}>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {data.images.map((image, index) => (
                    <ImageViewComponent key={index} preview={true} src={"election/" + image} />
                ))}
            </div>
            <hr style={{ borderTop: '3px solid #ff0000', marginTop: '10px' }} />
        </div>
    );

    const handleNavigate = (row)=>{
        return()=>{navigate('/admin/result/')}
      }


const calculateResult = (id)=>{
    let response  =  calculateElectionResult(id)
    if(!response.status){
        toast.error(response.msg)
        }else{
            //console.log(response)
            toast.success(response.msg)
    }
}

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Start Date',
            selector: row => row.start_date,
        },
        {
            name: 'End Date',
            selector: row => row.end_date,
        },
        {
            name: 'Positions',
            selector: row => row.positions.join(','),
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} onDeleteClick={deleteElection} updatePath={`/admin/election/` + row._id} />,
        },
        {
            name: 'Publish Result',
            cell: row => (
                <>
                    {(row.result_status) ? (
                        <>
                            <button  onClick={handleNavigate(row)}><i className="fas fa-eye"></i> View Result</button>

                        </>

                    ) : (
                        <button  onClick={() => {calculateResult(row._id)}} disabled={new Date(row.end_date) > new Date()}>
                        <i className='fas fa-gear'></i> Publish Result
                    </button>
                    
                    )}
                </>
            ),
            button: true,
            width: '10%'
        }
    ];
    
const getAllElections = async () => {
    try {
        let response = await getElection('all');
        //console.log("election response:", response);
        if (response.status) {
            response.result.map( async (ele)=>{
                let eid = ele._id;
                const res = await getResultByEid(eid)
                if(res.status){
                    ele.result_status = true;
                }else{
                    ele.result_status = false;
                }
            })
            setData(response.result)
            //console.log("finally",data)
        }
        else {
            toast.error(response.msg)
        }
    } catch (err) {
        console.log(err)
        toast.error(err)
    }
}



const [data, setData] = useState();
useEffect(() => {
    getAllElections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const expandableRowsComponent = ({ data }) => <ExpandableComponent data={data} />;

return (
    <>
        <div className="container-fluid px-4">
            <AdminBreadCrumb createUrl={"/admin/election/create"} type={"Election"} opt={"Listing"} />
            <Row>
                <Col sm={12}>

                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        expandableRows
                        expandableRowsComponent={expandableRowsComponent}
                        expandableRowDisabled={row => !row.description} // Disable expandable rows for rows without description
                    />
                </Col>
            </Row>
        </div>
    </>
)
}
export default ElectionPage;