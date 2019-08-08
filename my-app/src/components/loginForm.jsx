import Joi from "joi-browser";
import React from "react";
import Form from "./common/form";

class LoginForm extends Form {
  username = React.createRef();

  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  // componentDidMount() {
  //   this.username.current.focus();
  // }

  doSubmit = e => {
    console.log(this.username.current.value);
  };

  render() {
    return (
      <div>
        <h1>LoginForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password", false, "password")}
          {/* <Input
            id="password"
            name="password"
            label="Password"
            value={data.password}
            onChange={this.handleChange}
            error={errors.password}
          /> */}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
