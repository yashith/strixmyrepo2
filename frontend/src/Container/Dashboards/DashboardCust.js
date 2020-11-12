import React, { Component } from 'react';
import Aboutus from '../../Components/Common/Aboutus/Aboutus';
import Help from '../../Components/Common/Help/Help';
import Error from '../../Components/Common/Errors/Error';
import Projectlist from '../../Components/BCL/Project/Projectlist';
import ProjectIssues from '../../Components/BCL/Project/ProjectIssues'
import Newsfeed from '../../Components/BCL/Project/Newsfeed';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Layout from '../Layout';


function DashboardCus() {

  return (
    <Layout>
        <Switch>
              <h1>This is Customer page</h1>
        </Switch>
    </Layout>
  )

}

export default DashboardCus;