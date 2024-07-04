import { NavLink } from "react-router-dom";
import { getAllTxn } from "../../../services/transaction.service";
import { useEffect, useState } from "react";
import { Bar, Line, Pie, Doughnut, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import HeatMap from 'react-heatmap-grid';
import * as d3 from 'd3';

ChartJS.register(...registerables);

const AdminDashBoard = () => {
    const [txn, setTxn] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllTransactions = async () => {
            const response = await getAllTxn();
            if (response.status) {
                setTxn(response.result);
            } else {
                console.log("Error fetching the data.");
            }
            setLoading(false);
        };

        getAllTransactions();
    }, []);

    // Process data for charts
    const anomalyScores = txn.map(t => t.score);
    const amounts = txn.map(t => t.amount);
    const sessionLengths = txn.map(t => t.sessionLen);
    const txnPurposes = txn.map(t => t.txnPurpose);
    const txnStatuses = txn.map(t => t.status);
    const txnTimes = txn.map(t => new Date(t.timeStamp).toLocaleDateString());
    const flaggedTxns = txn.filter(t => t.isFlagged);
    const accountNames = [...new Set(txn.map(t => t.accountNumber.name))];
    const receiverNames = [...new Set(txn.map(t => t.receiverAccNo.name))];

    const colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(199, 199, 199, 0.6)'
    ];

    const chartData = {
        anomalyScoreDistribution: {
            labels: anomalyScores,
            datasets: [
                {
                    label: 'Anomaly Scores',
                    data: anomalyScores,
                    backgroundColor: colors,
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                },
            ],
        },
        transactionAmountOverTime: {
            labels: txnTimes,
            datasets: [
                {
                    label: 'Transaction Amounts',
                    data: amounts,
                    fill: false,
                    backgroundColor: colors,
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        },
        sessionLengthDistribution: {
            labels: sessionLengths,
            datasets: [
                {
                    label: 'Session Lengths',
                    data: sessionLengths,
                    backgroundColor: colors,
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                },
            ],
        },
        sessionLengthVsAmount: {
            datasets: [
                {
                    label: 'Session Length vs Amount',
                    data: txn.map(t => ({ x: t.sessionLen, y: t.amount })),
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        },
        txnPurposeDistribution: {
            labels: [...new Set(txnPurposes)],
            datasets: [
                {
                    label: 'Transaction Purposes',
                    data: txnPurposes.map(purpose => txn.filter(t => t.txnPurpose === purpose).length),
                    backgroundColor: colors,
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        },
        txnStatusDistribution: {
            labels: [...new Set(txnStatuses)],
            datasets: [
                {
                    label: 'Transaction Statuses',
                    data: txnStatuses.map(status => txn.filter(t => t.status === status).length),
                    backgroundColor: colors,
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        },
        flaggedTransactionsOverTime: {
            labels: flaggedTxns.map(t => new Date(t.timeStamp).toLocaleDateString()),
            datasets: [
                {
                    label: 'Flagged Transactions',
                    data: flaggedTxns.map(t => t.amount),
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                },
            ],
        },
        amountVsAnomalyScore: {
            datasets: [
                {
                    label: 'Amount vs Anomaly Score',
                    data: txn.map(t => ({ x: t.score, y: t.amount })),
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        },
        txnPerAccount: {
            labels: accountNames,
            datasets: [
                {
                    label: 'Transactions Per Account',
                    data: accountNames.map(name => txn.filter(t => t.accountNumber.name === name).length),
                    backgroundColor: colors,
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        },
        txnPerReceiver: {
            labels: receiverNames,
            datasets: [
                {
                    label: 'Transactions Per Receiver',
                    data: receiverNames.map(name => txn.filter(t => t.receiverAccNo.name === name).length),
                    backgroundColor: colors,
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        },
    };

    const accountActivityData = accountNames.map(account => {
        const accountTxns = txn.filter(t => t.accountNumber.name === account);
        return txnTimes.map(time => accountTxns.filter(t => new Date(t.timeStamp).toLocaleDateString() === time).length);
    });

    const renderNetworkGraph = () => {
        const width = 800;
        const height = 600;
        const nodes = accountNames.concat(receiverNames).map(name => ({ id: name, type: accountNames.includes(name) ? 'account' : 'receiver' }));
        const links = txn.map(t => ({
            source: t.accountNumber.name,
            target: t.receiverAccNo.name,
            value: t.amount
        }));
    
        const svg = d3.select("#networkGraph")
            .attr("width", width)
            .attr("height", height);
    
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));
    
        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", d => Math.sqrt(d.value))
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6);
    
        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("r", 10)
            .attr("fill", d => d.type === 'account' ? 'blue' : 'green')
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
    
        const label = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("dy", -3)
            .attr("dx", 12)
            .text(d => d.id);
    
        node.append("title")
            .text(d => `${d.type === 'account' ? 'Account' : 'Receiver'}: ${d.id}`);
    
        link.append("title")
            .text(d => `Amount: ${d.value}`);
    
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
    
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
    
            label
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });
    
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
    
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
    
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    };
    

    useEffect(() => {
        if (!loading) {
            renderNetworkGraph();
        }
    }, [txn, loading]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="chart-container">
                    <h2>Anomaly Score Distribution</h2>
                    <div style={{ width: '75%', height: '75%' }}>
                        <Bar data={chartData.anomalyScoreDistribution} />
                    </div>

                    <h2>Transaction Amount Analysis</h2>
                    <div style={{ width: '75%', height: '75%' }}>
                        <Line data={chartData.transactionAmountOverTime} />
                    </div>

                    <h2>Session Length Analysis</h2>
                    <div style={{ width: '75%', height: '75%' }}>
                        <Bar data={chartData.sessionLengthDistribution} />
                    </div>
                    <div style={{ width: '75%', height: '75%' }}>
                        <Scatter data={chartData.sessionLengthVsAmount} />
                    </div>

                    <h2>Transaction Purposes</h2>
                    {/* <div style={{ width: '75%', height: '75%' }}>
                        <Pie data={chartData.txnPurposeDistribution} />
                    </div> */}
                    <div style={{ width: '75%', height: '75%' }}>
                        <Bar data={chartData.txnPurposeDistribution} />
                    </div>

                    {/* <h2>Transaction Status</h2> */}
                    {/* <div style={{ width: '75%', height: '75%' }}>
                        <Pie data={chartData.txnStatusDistribution} />
                    </div> */}
                    {/* <div style={{ width: '75%', height: '75%' }}>
                        <Bar data={chartData.txnStatusDistribution} />
                    </div> */}

                    <h2>Flagged Transactions</h2>
                    <div style={{ width: '75%', height: '75%' }}>
                        <Bar data={chartData.flaggedTransactionsOverTime} />
                    </div>
                    <div style={{ width: '75%', height: '75%' }}>
                        <Scatter data={chartData.amountVsAnomalyScore} />
                    </div>

                    <h2>Account Activity</h2>
                    <div style={{ width: '75%', height: '75%' }}>
                        <HeatMap
                            xLabels={txnTimes}
                            yLabels={accountNames}
                            data={accountActivityData}
                        />
                    </div>
                    <div style={{ width: '75%', height: '75%' }}>
                        <Bar data={chartData.txnPerAccount} />
                    </div>

                    <h2>Receiver Analysis</h2>
                    <div style={{ width: '75%', height: '75%' }}>
                        <Bar data={chartData.txnPerReceiver} />
                    </div>
                    <svg id="networkGraph" style={{ width: '90%', height: '90%' }}></svg>
                </div>
            )}
        </div>
    );
};

export default AdminDashBoard;
