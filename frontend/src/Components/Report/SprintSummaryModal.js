import React, { useState } from 'react';
import { Card, Container, Badge, Col, Row, Button, Modal } from 'react-bootstrap'



function SprintModal(props) {
    const [modalopen, setmodalopen] = useState(true)
    return (
        <Modal size="xl" show={modalopen} >
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h5>Sprint : {props.name}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Total: <span style={{color:'gray'}}>{props.total} </span></h5>
                                </Col>
                                <Col>
                                    <h5 >Start date:<span>{props.sdate}</span></h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Active : {props.active}</h5>
                                </Col>
                                <Col>
                                    <h5>End date : <span>{props.edate}</span></h5>
                                </Col>
                            </Row>
                            <Row>
                            <Col>
                                    <h5>Completed : <span>{props.compleated}</span></h5>
                                </Col>
                            </Row>
                        </Col>

                        <Col >
                            <Row>
                                <Col style={
                                    {

                                        border: '1px solid gray',
                                        padding: '20px'
                                    }
                                }>
                                    <h5>Assignee: </h5>
                                    <h5>Reporter:{props.reporter} </h5>
                                    <h5>Created:{props.created} </h5>
                                    <h5>Updated: </h5>
                                </Col>

                            </Row>
                            <Row>
                                <Col style={
                                    {
                                        padding: '20px',
                                    }}  >
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                    <Row>
                        <Col style={{
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button onClick={() => setmodalopen(false)}>Close</Button>
                        </Col>
                    </Row>
                </Container>

            </Modal.Body>


        </Modal>

    )
}
export default SprintModal;