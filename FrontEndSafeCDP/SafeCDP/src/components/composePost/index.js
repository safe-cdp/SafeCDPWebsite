import React, { Component } from "react";

import axios from "axios";
import moment from "moment";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

class ComposePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
      description: "",
      err: null
    };
  }
  options = token => {
    return { headers: { Authorization: token } };
  };
  handleChange = e =>
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  fileSelectedHandler = e => {
    if (this.props.verifyUser(this.props.user)) {
      const reader = new FileReader();
      const name = e.target.files[0].name;
      reader.addEventListener(
        "load",
        _ => this.setState({ file: reader.result, name }),
        false
      );
      e && reader.readAsDataURL(e.target.files[0]);
    } else this.props.history.push("/login");
  };
  fileUploadHandler = _ => {
    if (this.state.description && this.state.file)
      axios
        .post(BACKEND + "/posts", {
          description: this.state.description,
          likes: 0,
          image: this.state.file,
          user_id: this.props.verifyUser(this.props.user).id,
          token: this.props.user,
          created_at: moment()
        })
        .then(res => {
          this.props.history.push("/");
          this.props.getPosts(res.data);
        })
        .catch(err => {
          this.setState({
            err: <div>There was an issue uploading your post</div>
          });
        });
    else this.setState({ err: <div>You did not add a photo/description</div> });
  };
  render() {
    return (
      <div className="composePost">
        <div className="composePost_uploadContainer">
          <h3 className="composePost_uploadTitle">Create New Post</h3>
          <input
            style={{ display: "none" }}
            onChange={this.fileSelectedHandler}
            type="file"
            ref={fileInput => (this.fileInput = fileInput)}
          />
          <div className="composePost_uploadButtons">
            <button
              className="composePost_pickFile"
              style={{ display: "block" }}
              onClick={_ => this.fileInput.click()}
            >
              Choose Picture
            </button>
            <button
              className="composePost_uploadFile"
              style={{ display: this.state.file ? "block" : "none" }}
              onClick={this.fileUploadHandler}
            >
              Post
            </button>
          </div>
          {this.state.file ? (
            <form className="composePost_form">
              <span className="composePost_fileName">
                {this.state.err && this.state.err}
              </span>
              <img
                className="composePost_picture"
                src={this.state.file}
                alt="picked file"
              />

              <textarea
                className="composePost_input"
                data-name="description"
                type="text"
                placeholder="Add description"
                onChange={this.handleChange}
              />
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ComposePost;
