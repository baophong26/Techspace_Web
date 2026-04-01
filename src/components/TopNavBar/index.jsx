/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import LoginRegister from "../LoginRegisterModal";

import Auth from "../../modules/Auth";
import { t } from "../../utils/translate";

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      login: true
    };
  }
  showHideModal = () => {
    this.setState({ modalShow: false });
  };

  loginClicked = () => {
    this.setState({ modalShow: true, login: true });
  };
  registerClicked = () => {
    this.setState({ modalShow: true, login: false });
  };

  logout = () => {
    Auth.logout();
    window.location.reload();
  };

  changeLang = (lang) => {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  changeCurrency = (curr) => {
    localStorage.setItem('currency', curr);
    window.location.reload();
  }

  render() {
    const isClient = typeof window !== 'undefined';
    const lang = isClient ? (localStorage.getItem('lang') || 'vi') : 'vi';
    const curr = isClient ? (localStorage.getItem('currency') || 'VND') : 'VND';

    return (
      <div className={`top_nav ${this.props.className}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="top_nav_left">
                {t('Free shipping on all U.S. orders over $50', 'Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500k')}
              </div>
            </div>
            <div className="col-md-6 text-right">
              <div className="top_nav_right">
                <ul className="top_nav_menu">
                  <li className="currency">
                    <a href="#">
                      {curr}
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <ul className="currency_selection">
                      <li>
                        <a href="#" onClick={() => this.changeCurrency('VND')}>VNĐ</a>
                      </li>
                      <li>
                        <a href="#" onClick={() => this.changeCurrency('USD')}>USD</a>
                      </li>
                      <li>
                        <a href="#" onClick={() => this.changeCurrency('EUR')}>EUR</a>
                      </li>
                    </ul>
                  </li>
                  <li className="language">
                    <a href="#">
                      {lang === 'vi' ? 'Tiếng Việt' : 'English'}
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <ul className="language_selection">
                      <li>
                        <a href="#" onClick={() => this.changeLang('vi')}>Tiếng Việt</a>
                      </li>
                      <li>
                        <a href="#" onClick={() => this.changeLang('en')}>English</a>
                      </li>
                    </ul>
                  </li>
                  {Auth.getUserDetails() !== undefined &&
                  Auth.getUserDetails() !== null &&
                  Auth.getToken() !== undefined ? (
                    <li className="account">
                      <a href="#">
                        {t(`Welcome ${Auth.getUserDetails().user_name}`, `Xin chào ${Auth.getUserDetails().user_name}`)}
                        <i className="fa fa-angle-down"></i>
                      </a>
                      <ul className="account_selection">
                        <li>
                          <a href="#" onClick={() => this.logout()}>
                            <i
                              className="fas fa-sign-in-alt"
                              aria-hidden="true"
                            ></i>
                            {t('Logout', 'Đăng xuất')}
                          </a>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="account">
                      <a href="#">
                        {t('My Account', 'Tài khoản của tôi')}
                        <i className="fa fa-angle-down"></i>
                      </a>
                      <ul className="account_selection">
                        <li>
                          <a href="#" onClick={() => this.loginClicked()}>
                            <i
                              className="fas fa-sign-in-alt"
                              aria-hidden="true"
                            ></i>
                            {t('Sign In', 'Đăng nhập')}
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={() => this.registerClicked()}>
                            <i
                              className="fa fa-user-plus"
                              aria-hidden="true"
                            ></i>
                            {t('Register', 'Đăng ký')}
                          </a>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.modalShow ? (
          <LoginRegister
            show={this.state.modalShow}
            login={this.state.login}
            registerClicked={() => this.registerClicked()}
            loginClicked={() => this.loginClicked()}
            onHide={() => this.showHideModal()}
          />
        ) : null}
      </div>
    );
  }
}

export default TopNavBar;
