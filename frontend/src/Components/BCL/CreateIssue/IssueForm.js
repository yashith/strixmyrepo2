import React from 'react';
import { useFormik } from 'formik';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import getTickets,{createTicket} from '../../../Services/TicketService';
import { light } from '@material-ui/core/styles/createPalette';

function IsseForm(props,) {



    async function create_Ticket(response){
        await createTicket(response);
        await props.reload();
    }

    const warningstyle = { color: 'red' };
    const validate = values => {

        const errors = {}
        if (!values.priority) {
            errors.priority = '*Required'
        }
        if (!values.title) {
            errors.title = '*Required'
        }
        if (!values.summary) {
            errors.summary = '*Required'
        }
        if (!values.bugtype) {
            errors.bugtype = '*Required'
        }
        if (!values.severity) {
            errors.severity = '*Required'
        }

        return errors;

    }
    const formik = useFormik({
        initialValues: {
            title: '',
            priority: '',
            bugtype: '',
            severity: '',           
            summary: '',
            project: '',
        },
        validate,
        onSubmit: values => {

            // props.setbuglist([...props.buglist, { priority: values.priority, bugtype: values.bugtype, summary: values.summary, title: values.title, id: Math.floor(Math.random() * 1000) }]);

            let response=({
                issuename: values.title,
                priority: values.priority,
                bugtype: values.bugtype,
                severity: values.severity, 
                issuedescription: values.summary,
                project:props.project,
                workstate:2,//Change
                externaluser:15,//Change
                totaleffort:0,//Change

                })

            create_Ticket(response);

            props.cl();
        },



    });
    async function startCapture(displayMediaOptions) {
        let Stream = null;
      
        try {
          Stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
         
            capstreme(Stream)
        
        } catch (err) {
          console.error("Error: " + err);
        }
        return Stream
       
      }
      let recordedChunks=[]
      function capstreme(stream) {
        let mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
      
        function handleDataAvailable(event) {
          console.log("data-available");
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
            console.log(recordedChunks);
            download();
          } else {
            // ...
          }
        }
        function download() {
          var blob = new Blob(recordedChunks, {
            type: "video/mp4"
          });
          var url = URL.createObjectURL(blob);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = "test.mp4";
          a.click();
          window.URL.revokeObjectURL(url);
        }
      }
      
    const prioritylist = ['low', 'medium', 'high', 'urgent'];
    const typelist = ['Functional', 'Performance','Usability', 'Compatibility', 'Security'];
    const severitylist = ['critical', 'high', 'medium', 'low']

    return (
        <div>

            <Form onSubmit={formik.handleSubmit}>

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.title}></Form.Control>
                    {formik.errors.title && formik.touched.title ? <Form.Text style={warningstyle}>{formik.errors.title}</Form.Text> : null}
                </Form.Group>

                <Form.Group >
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" name="priority" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.priority} >{/*set error handler*/}
                        <option value="">Select priority</option>
                        {prioritylist.map((priority) => <option value={priority} label={priority} key={priority}/>)}
                    </Form.Control>
                    {formik.errors.priority && formik.touched.priority ? <Form.Text style={warningstyle}>{formik.errors.priority}</Form.Text> : null}
                </Form.Group>

                <Form.Group >
                    <Form.Label>BugType</Form.Label>
                    <Form.Control as="select" name="bugtype" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.severity}>{/*set error handler*/}
                        <option value="">Select Type</option>
                        {typelist.map((bugtype) => <option value={bugtype} label={bugtype} key={bugtype}/>)}
                        
                    </Form.Control>
                    {formik.errors.bugtype && formik.touched.bugtype ? <Form.Text style={warningstyle}>{formik.errors.bugtype}</Form.Text> : null}
                </Form.Group>

                <Form.Group >
                    <Form.Label>Severity</Form.Label>
                    <Form.Control as="select" name="severity" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.bugtype}>{/*set error handler*/}
                    <option value="">Select severity</option>
                    {severitylist.map((severity) => <option value={severity} label={severity} key={severity} />)}


                    </Form.Control>
                    {formik.errors.severity && formik.touched.severity ? <Form.Text style={warningstyle}>{formik.errors.severity}</Form.Text> : null}
                </Form.Group>


                {/* summary of the bug */}
                <Form.Group>
                    <Form.Label>Summary</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="summary of the bug" name="summary" onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.summary}></Form.Control>
                    {formik.errors.summary && formik.touched.summary ? <Form.Text style={warningstyle}>{formik.errors.summary}</Form.Text> : null}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Attachments</Form.Label>
                    <Form.File name="attachments" ></Form.File>
                    <Button variant="danger" onClick={startCapture}>Record</Button>
                </Form.Group>

                <Button type='submit' style={{ marginRight: '20px' }} >Add issue</Button>
                <Button type='button' onClick={props.cl} >Close</Button>




            </Form>




        </div>
    )
}
export default IsseForm;