import React from "react";
import { Link } from "react-router-dom";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      err: null
    };
  }
  componentDidMount() {
    this.setState({ err: this.props.err });
  }
  handleChange = e =>
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.user && this.state.pass)
      this.props.findUser({
        username: this.state.user,
        password: this.state.pass
      });
    else this.setState({ err: "Please fill out all forms" });
  };
  render() {
    return (
      <div className="form_container">
        <form onSubmit={this.handleSubmit} className="login">
          <h2 className="login_title">Log In</h2>
          {this.state.err && (
            <div className="login_error">
              <div className="login_error_text">{this.state.err}</div>
            </div>
          )}
          <input
            className="login_input"
            type="text"
            data-name="user"
            placeholder="Username"
            value={this.state.user}
            onChange={this.handleChange}
            required
          />
          <input
            className="login_input"
            type="password"
            data-name="pass"
            placeholder="Password"
            value={this.state.pass}
            onChange={this.handleChange}
            required
          />
          <button
            onSubmit={this.handleSubmit}
            onClick={this.handleSubmit}
            className="login_button"
          >
            Log In
          </button>
          <Link className="login_signupContainer" to="/signup">
            <div className="login_signup">Sign Up</div>
          </Link>
        </form>
      </div>
    );
  }
}
