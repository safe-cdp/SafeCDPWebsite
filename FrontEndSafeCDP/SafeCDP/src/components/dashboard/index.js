import React from "react";

import UploadFile from "../uploadFile";
import EditSiteText from "../editSiteText";
import Error404 from "../Error404";

const Dashboard = props => {
  const history = _ => {
    props.history.push("/");
  };
  if (props.verifyUser(props.user) && props.verifyUser(props.user).admin)
    return (
      <section className="dashboard">
        <h1 className="dashboard_title">Dashboard</h1>
        <UploadFile history={_ => history()} getConfig={props.getConfig} />
        <EditSiteText history={_ => history()} getConfig={props.getConfig} />
      </section>
    );
  else return <Error404 />;
};

export default Dashboard;
