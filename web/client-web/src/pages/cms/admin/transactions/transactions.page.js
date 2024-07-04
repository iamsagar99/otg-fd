import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
import '../user/UserPage.css'; 
import { getAllTxn, updateTransaction } from "../../../../services/transaction.service";


const TransactionPage = () => {
    
    const columns = [
        {
            name: 'SenderAccountNumber',
            selector: row => row.accountNumber._id,
            sortable: true,
        },
        {
            name: 'SenderName',
            selector: row => row.accountNumber.name,
            sortable: true,
        },
        {
            name: 'Transaction Purpose',
            selector: row => row.txnPurpose,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'ReceiverAccountNumber',
            selector: row => row.receiverAccNo._id,
            sortable: true,
        },
        {
            name: 'ReceiverName',
            selector: row => row.receiverAccNo.name,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Anomaly Score',
            selector: row => row.score,
            sortable: true,
        },
        {
            name: 'isFlagged',
            selector: row => row.isFlagged?"Yes":"No",
            sortable: true,
        },
        {
            name:"Timestamp",
            //show displayable timestamp
            selector: row => new Date(row.timeStamp).toLocaleString(),
            sortable:true
        },

        {
            name: 'Action',
            cell: row => <ActionButtons id={row._id} updatePath={`/admin/transaction/${row._id}`} />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const getAllTransactions = useCallback(async () => {
        try {
            let response = await getAllTxn();
            if (response.status) {
                setData(response.result);
            } else {
                toast.error(response.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }, []);

    const [data, setData] = useState([]);
    useEffect(() => {
        getAllTransactions();
    }, [getAllTransactions]);

    return (
        <>
            <div className="container-fluid px-4">
                <AdminBreadCrumb createUrl={"/admin/transaction"} type={"Transaction"} opt={"Listing"} />
                <Row>
                    <Col sm={12}>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default TransactionPage;
