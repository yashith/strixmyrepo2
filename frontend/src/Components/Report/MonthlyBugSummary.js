import React, { useState, useEffect, } from 'react';
import { Table, Row, Col, Button, Card, NavLink, Form, FormControl, Modal, Badge, ProgressBar } from 'react-bootstrap';
// import Issuecard from '../IssueTable/Issuecard'
import { buildQueries, render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams } from "react-router-dom";
// import { GetProjetDetails } from '../../../Services/ProjectService';
import MaterialTable, { MTable, MTableToolbar } from 'material-table'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';
import { getMonthlyBugSummary } from '../../Services/TicketService'
import SprintModal from './SprintSummaryModal';
import { FormGroup,CircularProgress } from '@material-ui/core';



function MonthlyBugSummary() {

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buglist, setbuglist] = useState([])
  const [year, setyear] = useState(2020)
  const [month, setmonth] = useState(11)
  const [isloading, setisloading] = useState(false)



  async function getBugs(year,month) {
    setbuglist([])
    let a = await getMonthlyBugSummary(year, month)
    console.log(a)
    setbuglist(a)
    setisloading(false)
  }

  useEffect(() => {

    let isMounted = true; // cleanup mounting warning
    // getBugs();
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

  function handleYear(e) {
    setyear(e.target.value)
  }
  function handleMonth(e) {
    setmonth(e.target.value)

  }
  function handleSubmit(){
    setbuglist([])
    setisloading(true)
    getBugs(year,month);
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
        isLoading={isloading}
        data={buglist}
        title='Monthly Bug Summary'
        components={
          {
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ margin: '10px', display: 'flex' }}>
                  <Form style={{ margin: '10px', display: 'flex' }}  onSubmit={handleSubmit}>
                    <FormGroup style={{ padding: '10px' }}>

                      <Form.Label>Year</Form.Label>
                      <Form.Control as='select' name='year' onChange={handleYear} value={year}>
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                      </Form.Control>
                    </FormGroup>
                    <FormGroup style={{ padding: '10px' }}>
                      <Form.Label>Month</Form.Label>
                      <Form.Control as='select' name='month' onChange={handleMonth} value={month}>
                        <option value='01'>1</option>
                        <option value='02'>2</option>
                        <option value='03'>3</option>
                        <option value='04'>4</option>
                        <option value='05'>5</option>
                        <option value='06'>6</option>
                        <option value='07'>7</option>
                        <option value='08'>8</option>
                        <option value='09'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                      </Form.Control>
                    </FormGroup>
                    <div>
                      <Button type='submit'>Filter</Button>
                    </div>
                  </Form>
                </div>
              </div>
            )
          }
        }
      />
    </>
  )

}


export default MonthlyBugSummary;