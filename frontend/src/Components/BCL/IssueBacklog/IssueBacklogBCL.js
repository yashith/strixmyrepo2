import React, { useState,useEffect, } from 'react';
import SetPagination from '../../Common/Pagination/Pagination';
import { Table, Row, Col, Button, Card, NavLink, Form, FormControl, Modal, Badge } from 'react-bootstrap';
import IssueForm from '../CreateIssue/IssueForm'
import Issuecard from '../IssueTable/Issecard'
import './table.css';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Link, Switch,useLocation,useParams } from "react-router-dom";
import './IssueBacklogBCL.scss'
import getTickets from '../../../Services/TicketService';
import {GetProjetDetails} from '../../../Services/ProjectService';
import IssueTable from '../IssueTable/IssueTable'


//my
function bagetype(priority) {

  switch (priority) {
    case 'urgent':
      return 'danger';
    case 'high':
      return 'warning';
    case 'medium':
      return 'primary'
      case 'low':
        return 'success'
  }
}

function IssueBacklogBCL() {

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buglist, setbuglist] = useState([])
  const [pdetails,setpdetails]= useState([{description:"",projectname:""}])
  let loc=useLocation().project
  const columns = React.useMemo(
    () => [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Title',
        accessor: 'issuename'
    },
    {
        Header: 'Prority',
        accessor: 'priority',
        Cell:({ value }) => (<Badge variant={bagetype(value)}>{value}</Badge>)
      
        
    }
    ],
    []
)

 //<Badge variant={bagetype(bug.priority)}>{bug.priority}</Badge> 
 
  

  function tableticket(e) {
    for (var i = 0; i < buglist.length; i++) {
      if (buglist[i].id === e) {
        render(<Issuecard 
          name={pdetails[0].projectname}
          priority={buglist[i].priority} 
          type={buglist[i].bugtype} 
          summary={buglist[i].issuedescription} 
          variant={bagetype(buglist[i].priority)}
          severity={buglist[i].severity} />);
      }
    }

  }
  //check project id empty or not
  if(loc){
    sessionStorage.setItem("loc",loc)
    
  }
  async function fetchtickets(){
    let a=await getTickets(sessionStorage.getItem("loc"))
    setbuglist(a)
     
  }
  async function fetch_project_details(){
    let b= await GetProjetDetails(sessionStorage.getItem("loc"))
    setpdetails(b)
    
  }

  useEffect(() => {
    
    let isMounted = true; // cleanup mounting warning
    fetchtickets();
    fetch_project_details();
    return()=>{isMounted = false}
  },[])
  return (
    <div className="">

      <Row >
        <div className="ml-2 mt-2 col-md-9">
          <Col className="">
            <Row className="">
              <Card className="project_card">
                <Card.Header className="pchead">
                <Card.Title>{pdetails[0].projectname}</Card.Title>
                </Card.Header>
                <Card.Body>                  
                  <Card.Text>
                    {pdetails[0].description}
                    </Card.Text>
                </Card.Body>
              </Card>
            </Row>
            <Row className="border border-dark mt-2 mb-2" >
              <div className="d-flex p-2 bd-highlight">
                <Col md={4}>
                  <Button className="mr-sm-2" variant="info" data-toggle="tooltip" title="Go to issues"
                    onClick={() => setisModelOpen(true)}>
                    Add Issue</Button>
                  <Modal size="lg" show={isModelOpen}>
                    <Modal.Body>
                      <IssueForm cl={() => setisModelOpen(false)} project={sessionStorage.getItem("loc")} reload={()=>fetchtickets()}/>
                    </Modal.Body>

                  </Modal>

                </Col>
                <Col md={3}>
                  {/* sort here */}

                </Col>
                <Col md={5}>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" /> {/* Margin right(Padding , Small and up by 2) */}
                  </Form>
                </Col>
              </div>
            </Row>
            {/* <Row>

                          {
                              bug.map((bug) => <Issuecard id={'#' + bug.id} summ={bug.Summary} priority={bug.priority} badgetype={bagetype(bug.priority)} />)
                          }


                      </Row> */}
            <Row>
              {/* <Table>
                <thead>
                  <tr>
                    <th>
                      #id
                    </th>
                    <th>
                      Title
                    </th>
                    <th>
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    buglist.map((bug) =>
                      <tr className="highligh" id={bug.id} onClick={() => { tableticket(bug.id) }} key={bug.id}>
                        <td>{'#' + bug.id}</td>
                        <td className="noover"><div>{bug.issuename}</div></td>
                        <td><Badge variant={bagetype(bug.priority)}>{bug.priority}</Badge></td>
                      </tr>
                    )
                  }

                </tbody>
              </Table> */}
              <IssueTable columns={columns} data={buglist} />
            </Row>



            <Row >

              <div>
                <Card className=" mu-2">
                  <Card.Body>

                    {/* <SetPagination
                      IssuePerPage={IssuePerPage}
                      totalIssues={bugs.length}
                      paginate={paginate}
                    /> */}

                  </Card.Body>
                </Card>
              </div>
            </Row>
          </Col>
        </div>
      </Row>

    </div>
  )


}


export default IssueBacklogBCL;