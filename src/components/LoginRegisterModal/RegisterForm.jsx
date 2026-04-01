/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import jumpTo from "../../modules/Navigation";
import Validator from "../../utils/Validator";
import { DEFAULT_RULE, EMAIL_RULE } from "../../utils/Validator/rule";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userRegister } from "../../redux/actions/RegisterAction";
import LoadingButton from "../LoadingButton";
import { t } from "../../utils/translate";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
    const { name, email, password } = this.state;
    const safeT = (en, vi) => this.state.isMounted ? t(en, vi) : vi;

    if (!Validator(name, DEFAULT_RULE)) {
      this.setState({ errorMsg: safeT("Name cannot be empty", "Tên không được để trống") });
      return;
    }
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
      .userRegister(name, email, password, password)
      .then(res => {
        this.props.loginClicked();
        this.setState({ loading: false });
      })
      .catch(error => {
        let msg = safeT("Registration failed. Please try again.", "Đăng ký thất bại. Vui lòng thử lại.");
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
          <h2>{safeT("Register", "Đăng ký")}</h2>
          <div className="form-group ">
            <input
              type="text"
              className="form-control"
              placeholder={safeT("Name ", "Họ tên")}
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              autoComplete="false"
            />
            <i className="fa fa-user"></i>
          </div>

          <div className="form-group ">
            <input
              type="text"
              className="form-control"
              placeholder={safeT("Email ", "Email")}
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="false"
            />
            <i className="fa fa-envelope"></i>
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
          <LoadingButton
            type="button"
            className="log-btn"
            loading={this.state.loading}
            onClick={() => this.handleSubmit()}
          >
            {safeT("Register", "Đăng ký")}
          </LoadingButton>
          <div
            onClick={this.props.loginClicked}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#c4c4c4",
              cursor: "pointer",
              marginTop: '15px'
            }}
          >
            {safeT("Already have an account ? Please login.", "Đã có tài khoản ? Đăng nhập")}
          </div>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  loginClicked: PropTypes.func
};

const mapDispatchToProps = {
  userRegister
};
const mapStoreToProps = state => ({
  register_loading: state.register.register_loading,
  register_error: state.register.error
});

export default connect(mapStoreToProps, mapDispatchToProps)(RegisterForm);
