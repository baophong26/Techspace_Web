/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../redux/actions/LoginAction";
import jumpTo from "../../modules/Navigation";
import Validator from "../../utils/Validator";
import { DEFAULT_RULE, EMAIL_RULE } from "../../utils/Validator/rule";
import PropTypes from "prop-types";
import LoadingButton from "../LoadingButton";
import { t } from "../../utils/translate";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      errorMsg: "",
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMsg: "" });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const safeT = (en, vi) => this.state.isMounted ? t(en, vi) : vi;
    
    if (!Validator(email, EMAIL_RULE)) {
      this.setState({ errorMsg: safeT("Invalid email address", "Email không hợp lệ") });
      return;
    }
    if (!Validator(password, DEFAULT_RULE)) {
      this.setState({ errorMsg: safeT("Password cannot be empty", "Mật khẩu không được để trống") });
      return;
    }
    this.setState({ loading: true, errorMsg: "" });
    this.props
      .userLogin(email, password)
      .then(res => {
        this.setState({ loading: false });
        window.location.reload();
      })
      .catch(error => {
        let msg = safeT("Login failed. Please check your credentials.", "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        if (error && error.response && error.response.data && error.response.data.message) {
            msg = error.response.data.message;
        }
        this.setState({ loading: false, errorMsg: msg });
      });
  };

  render() {
    const safeT = (en, vi) => this.state.isMounted ? t(en, vi) : vi;
    return (
      <div>
        <div className="login-form">
          <h2>{safeT("Login", "Đăng nhập")}</h2>
          <div className="form-group ">
            <input
              type="text"
              className="form-control"
              placeholder={safeT("Email", "Email")}
              id="UserName"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="false"
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group log-status">
            <input
              type="password"
              className="form-control"
              placeholder={safeT("Password", "Mật khẩu")}
              id="Passwod"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="false"
              onKeyDown={(e) => { if (e.key === 'Enter') this.handleSubmit(); }}
            />
            <i className="fa fa-lock"></i>
          </div>
          {this.state.errorMsg && <span className="alert" style={{display: 'block', color: '#ff3b30', fontSize: '12px', marginTop: '5px', marginBottom: '10px'}}>{this.state.errorMsg}</span>}
          {!this.state.errorMsg && <span className="alert">Invalid Credentials</span>}
          <a
            className="link"
            href="#"
            onClick={this.props.forgotPasswordClicked}
          >
            {safeT("Lost your password?", "Quên mật khẩu?")}
          </a>
          <LoadingButton
            type="button"
            className="log-btn"
            loading={this.state.loading}
            onClick={() => this.handleSubmit()}
          >
            {safeT("Log in", "Đăng nhập")}
          </LoadingButton>
          <div
            onClick={this.props.registerClicked}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#c4c4c4",
              cursor: "pointer",
              marginTop: '15px'
            }}
          >
            {safeT("New user ? Please Register", "Chưa có tài khoản ? Đăng ký")}
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  forgotPasswordClicked: PropTypes.func,
  registerClicked: PropTypes.func
};

const mapDispatchToProps = {
  userLogin
};
const mapStoreToProps = state => ({
  login_loading: state.login.login_loading,
  login_error: state.login.error
});

export default connect(mapStoreToProps, mapDispatchToProps)(LoginForm);
