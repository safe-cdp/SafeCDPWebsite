import React from "react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

export default class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      all: null
    };
  }
  componentDidMount() {
    axios
      .get(BACKEND + "/config")
      .then(res => this.setState({ all: res.data }));
  }
  fileSelectedHandler = e => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      _ => this.setState({ file: reader.result }),
      false
    );
    e && reader.readAsDataURL(e.target.files[0]);
  };
  fileUploadHandler = _ =>
    axios
      .put(BACKEND + "/config", {
        firstname: this.state.all.firstname,
        lastname: this.state.all.lastname,
        username: this.state.all.username,
        avatar: this.state.file
      })
      .then(res => {
        this.props.getConfig();
        this.props.history();
      });
  render() {
    return (
      <div className="dashboard_uploadContainer">
        <h3 className="dashboard_uploadTitle">Change Profile Picture</h3>
        <input
          style={{ display: "none" }}
          onChange={this.fileSelectedHandler}
          type="file"
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <div className="dashboard_uploadButtons">
          <button
            className="dashboard_pickFile"
            style={{ display: "block" }}
            onClick={_ => this.fileInput.click()}
          >
            Pick File
          </button>
          <button
            className="dashboard_uploadFile"
            style={{ display: this.state.file ? "block" : "none" }}
            onClick={this.fileUploadHandler}
          >
            Upload File
          </button>
        </div>
        {this.state.file ? (
          <img
            className="dashboard_picture"
            src={this.state.file}
            alt="Picked File"
          />
        ) : null}
      </div>
    );
  }
}
