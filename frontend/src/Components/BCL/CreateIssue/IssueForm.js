import React from 'react';
import { useFormik } from 'formik';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';

function IsseForm(props,) {

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

            let response=({ priority: values.priority,
                title: values.title,
                priority: values.priority,
                bugtype: values.bugtype,
                severity: values.severity, 
                summary: values.summary,
                project:props.project,
                })

            console.log(JSON.stringify(response));
            props.cl();
        },



    });
    const prioritylist = ['low', 'medium', 'high', 'urgent'];
    const typelist = ['Functional', 'Performance Support', 'Usability', 'Compatibility', 'Security'];
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
                    <Form.Control as="select" name="priority" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.priority}>{/*set error handler*/}
                        {prioritylist.map((priority) => <option value={priority} label={priority} key={priority}/>)}
                    </Form.Control>
                    {formik.errors.priority && formik.touched.priority ? <Form.Text style={warningstyle}>{formik.errors.priority}</Form.Text> : null}
                </Form.Group>

                <Form.Group >
                    <Form.Label>BugType</Form.Label>
                    <Form.Control as="select" name="bugtype" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.severity}>{/*set error handler*/}
                        {severitylist.map((severity) => <option value={severity} label={severity} key={severity} />)}

                    </Form.Control>
                    {formik.errors.bugtype && formik.touched.bugtype ? <Form.Text style={warningstyle}>{formik.errors.bugtype}</Form.Text> : null}
                </Form.Group>

                <Form.Group >
                    <Form.Label>Severity</Form.Label>
                    <Form.Control as="select" name="severity" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.bugtype}>{/*set error handler*/}
                        {typelist.map((bugtype) => <option value={bugtype} label={bugtype} key={bugtype}/>)}

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
                </Form.Group>

                <Button type='submit' style={{ marginRight: '20px' }} >Add issue</Button>
                <Button type='button' onClick={props.cl} >Close</Button>




            </Form>




        </div>
    )
}
export default IsseForm;