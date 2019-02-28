import React from "react";
import { Link } from "react-router-dom";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fName: "",
      lName: "",
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
    if (
      !this.state.pass ||
      !this.state.user ||
      !this.state.email ||
      !this.state.fName ||
      !this.state.lName
    ) {
      this.setState({ err: "Please fill out all forms" });
    } else if (this.state.pass.length < 8) {
      this.setState({
        err:
          "Password must be 8 characters long, contain 1 special character, 1 lowercase letter , and 1 uppercase letter"
      });
    } else if (!/[a-z]/.test(this.state.pass)) {
      this.setState({
        err:
          "Password must be 8 characters long, contain 1 special character, 1 lowercase letter , and 1 uppercase letter"
      });
    } else if (!/[A-Z]/.test(this.state.pass)) {
      this.setState({
        err:
          "Password must be 8 characters long, contain 1 special character, 1 lowercase letter , and 1 uppercase letter"
      });
    } else if (!/\d/.test(this.state.pass)) {
      this.setState({
        err:
          "Password must be 8 characters long, contain 1 special character, 1 lowercase letter , and 1 uppercase letter"
      });
    } else if (this.state.user && this.state.pass) {
      this.props.addUser({
        password: this.state.pass,
        username: this.state.user,
        Firstname: this.state.fName,
        Lastname: this.state.lName,
        email: this.state.email,
        admin: false
      });
    } else this.setState({ err: "The username or email has been taken." });
  };
  render() {
    return (
      <div className="form_container">
        <form onSubmit={this.handleSubmit} className="signup">
          <h2 className="signup_title">Sign Up</h2>
          {this.state.err && (
            <div className="login_error">
              <div className="login_error_text">{this.state.err}</div>
            </div>
          )}
          <input
            className="signup_input"
            type="email"
            data-name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            className="signup_input"
            type="text"
            data-name="fName"
            placeholder="First Name"
            value={this.state.fName}
            onChange={this.handleChange}
            required
          />
          <input
            className="signup_input"
            type="text"
            data-name="lName"
            placeholder="Last Name"
            value={this.state.lName}
            onChange={this.handleChange}
            required
          />
          <input
            className="signup_input"
            type="text"
            data-name="user"
            placeholder="Username"
            value={this.state.user}
            onChange={this.handleChange}
            required
          />
          <input
            className="signup_input"
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
            className="signup_button"
          >
            Sign Up
          </button>
          <Link className="signup_loginContainer" to="/login">
            <div className="signup_login">Log In</div>
          </Link>
        </form>
      </div>
    );
  }
}
