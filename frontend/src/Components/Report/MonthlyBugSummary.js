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
import { getMonthlyBugSummary } from '../../Services/TicketService'
import SprintModal from './SprintSummaryModal';



function MonthlyBugSummary() {

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buglist, setbuglist] = useState([])

  async function getBugs() {
    let a = await getMonthlyBugSummary(2020, 11)
    console.log(a)
    setbuglist(a)
  }

  useEffect(() => {

    let isMounted = true; // cleanup mounting warning
    getBugs();
    return () => { isMounted = false }
  }, [])

  function bagetype(priority) {

    switch (priority) {
      case 'Urgent':
        return 'danger';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'primary'
      case 'Low':
        return 'success'
    }
  }
  function severitytype(severity) {

    switch (severity) {
      case 'Critical':
        return (<Tooltip title="Critical"><ArrowUpwardIcon style={{ color: "#dc3545" }} /></Tooltip>);
      case 'High':
        return (<Tooltip title="High"><ArrowUpwardIcon style={{ color: "#ffc107" }} /></Tooltip>);
      case 'Medium':
        return (<Tooltip title="Medium"><ArrowDownwardIcon style={{ color: "#007bff" }} /></Tooltip>);
      case 'Low':
        return (<Tooltip title="Low"><ArrowDownwardIcon style={{ color: "#28a745" }} /></Tooltip>);
    }
  }
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <MaterialTable
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Title', field: 'issuename' },
          { title: "Date", field: "date" },
          { title: 'Priority', field: 'priority', render: rowData => <Badge variant={bagetype(rowData.priority)}>{rowData.priority}</Badge> },
          { title: 'Severity', field: 'severity', render: rowData => severitytype(rowData.severity) }


        ]}
        data={buglist}
      />
    </>
  )

}


export default MonthlyBugSummary;