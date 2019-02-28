import React from "react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

export default class EditSiteTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      firstname: "",
      lastname: "",
      avatar: null,
      err: null
    };
  }
  componentDidMount() {
    axios.get(BACKEND + "/config").then(res =>
      this.setState({
        bio: res.data.username,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        avatar: res.data.avatar,
        err: this.props.err
      })
    );
  }
  handleChange = e =>
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  handleSubmit = e => {
    e.preventDefault();
    axios
      .put(BACKEND + "/config", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.bio,
        avatar: this.state.avatar
      })
      .then(res => {
        this.props.getConfig();
        this.props.history();
      });
  };
  render() {
    if (!this.props.type) return null;
    else
      return (
        <form onSubmit={this.handleSubmit} className="editSiteForm">
          {this.props.type === "bio" ? (
            <textarea
              className="editSiteForm_textarea"
              data-name={this.props.type}
              cols="30"
              rows="10"
              value={this.state.bio}
              onChange={this.handleChange}
              required
            />
          ) : (
            <input
              className="editSiteForm_input"
              type="text"
              data-name={this.props.type}
              value={this.state[this.props.type]}
              onChange={this.handleChange}
              required
            />
          )}
          <button className="editSiteForm_button">Submit</button>
        </form>
      );
  }
}
