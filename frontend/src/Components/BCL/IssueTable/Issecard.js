import React, { useState } from 'react';
import { Card, Container, Badge, Col, Row, Button, Modal } from 'react-bootstrap'
import Comment from './Comment'
function IssueCard(props) {
    const [modalopen, setmodalopen] = useState(true)
    return (
        <Modal size="xl" show={modalopen} >
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h5>Project : {props.name}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Type: <span style={{color:'gray'}}>{props.type} </span></h5>
                                </Col>
                                <Col>
                                    <h5 >Status: </h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Priority : <span><Badge variant={props.variant}>{props.priority}</Badge></span></h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Summery</h5>
                                    <Card>
                                        <Card.Body>{props.summary}</Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Row style={
                                {
                                    marginTop: '10px',
                                    marginLeft: '0px',
                                    marginRight: '0px',
                                    height: '100px',
                                    padding: '10px',
                                    border: '1px solid gray'
                                }
                            }>
                                <h4>Attachments</h4>
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
                                    <h5>Reporter: </h5>
                                    <h5>Created: </h5>
                                    <h5>Updated: </h5>
                                </Col>

                            </Row>
                            <Row>
                                <Col style={
                                    {
                                        padding: '20px',
                                    }}  >
                                    <Comment />
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
export default IssueCard;