import React, { useState, useEffect, } from 'react';
import { Table, Row, Col, Button, Card, NavLink, Form, FormControl, Modal, Badge, ProgressBar } from 'react-bootstrap';
// import Issuecard from '../IssueTable/Issuecard'
import { buildQueries, render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams } from "react-router-dom";
// import { GetProjetDetails } from '../../../Services/ProjectService';
import MaterialTable from 'material-table'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';
import getSprintSummary from '../../Services/SprintSummaryService'




function SprintDashboard() {

    const [isModelOpen, setisModelOpen] = useState(false);
    const initial = {
        "id": '',
        "finished": '',
        "total": '',
        "active": '',
        "estimated_hours": '',
        "actual_hours": '',
        "name": '',
        "status": '',
        "startdate": '',
        "intialenddate": "",
        "enddate": "",
        "is_deleted": '',
        "createdby": '',
        "project": '',
        "ticketlist": []
    }
    const [sprintlist, setsprintlist] = useState([initial])

    async function getSprints() {
        let b = await getSprintSummary(1);
        setsprintlist(b)
    }

    useEffect(() => {

        let isMounted = true; // cleanup mounting warning
        getSprints();

        return () => { isMounted = false }
    }, [])
    return (
        <div>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <MaterialTable
                columns={
                    [{ title: 'Id', field: 'id' },
                    { title: 'Sprint', field: 'name' },
                    { title: 'Start date', field: 'startdate', field: 'enddate' },
                    {
                        title: 'Progress', render: rowData =>
                            <ProgressBar>
                                <ProgressBar striped variant="success" now={rowData.finished/rowData.total *100} key={1}  label={"Finished : ",rowData.finished}/>
                                <ProgressBar striped variant="danger" now={rowData.active/rowData.total *100} key={2} label={"Active : ",rowData.active} />
                            </ProgressBar>
                    }]
                }
                data={sprintlist}
                title="sprints"
            />

        </div>
    )


}


export default SprintDashboard;