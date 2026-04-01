/*
 ** Author: Santosh Kumar Dash
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import Link from "next/link";
import HomeCartView from "../HomeCartView";
import MobileMenu from "../MobileMenu";
import LoginRegister from "../LoginRegisterModal";
import device, { size } from "../../modules/mediaQuery";
import MediaQuery from "react-responsive";
import { t } from "../../utils/translate";
import Auth from "../../modules/Auth";
import Wishlist from "../../modules/Wishlist";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      loginModalShow: false,
      isLogin: true,
      activeclass: false,
      searchActive: false,
      searchText: "",
      isMounted: false,
      wishlistCount: 0
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.cart).length < 1) {
      this.props.getCartByUserId();
    }
    if (!this.props.departments || this.props.departments.length === 0) {
      this.props.getDepartments();
    }
    
    this.updateWishlistCount = () => {
      this.setState({ wishlistCount: Wishlist.getItems().length });
    };
    window.addEventListener('wishlistChanged', this.updateWishlistCount);
    
    this.setState({ 
      isMounted: true,
      wishlistCount: Wishlist.getItems().length
    });
  }

  componentWillUnmount() {
    if (this.updateWishlistCount) {
      window.removeEventListener('wishlistChanged', this.updateWishlistCount);
    }
  }

  toggleSearch = (e) => {
    if (e) e.preventDefault();
    this.setState({ searchActive: !this.state.searchActive });
  };

  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.location.href = `/bp-techspace/shops/all?search=${encodeURIComponent(this.state.searchText.trim())}`;
    }
  };

  showHideCartModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  showHideLoginModal = () => {
    this.setState({ loginModalShow: false });
  };

  loginClicked = (e) => {
    if (e) e.preventDefault();
    this.setState({ loginModalShow: true, isLogin: true });
  };

  registerClicked = (e) => {
    if (e) e.preventDefault();
    this.setState({ loginModalShow: true, isLogin: false });
  };

  logout = (e) => {
    if (e) e.preventDefault();
    Auth.logout();
    window.location.reload();
  };

  changeLang = (lang, e) => {
    if (e) e.preventDefault();
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  changeCurrency = (curr, e) => {
    if (e) e.preventDefault();
    localStorage.setItem('currency', curr);
    window.location.reload();
  }

  handleMenuClicked = () => {
    this.setState({ activeclass: !this.state.activeclass });
  };

  render() {
    const { departments, cart } = this.props;
    const isClient = typeof window !== 'undefined';
    const lang = isClient ? (localStorage.getItem('lang') || 'vi') : 'vi';
    const curr = isClient ? (localStorage.getItem('currency') || 'VND') : 'VND';
    const safeT = (en, vi) => this.state.isMounted ? t(en, vi) : vi;
    const safeCurr = this.state.isMounted ? curr : 'VND';
    const safeLangDisplay = this.state.isMounted ? (lang === 'vi' ? 'Tiếng Việt' : 'English') : 'Tiếng Việt';

    return (
      <div className="main_nav_container" style={{background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0, 210, 255, 0.4)', paddingTop: '5px', paddingBottom: '5px'}}>
        <div className="container" style={{maxWidth: '100%', paddingLeft: '40px', paddingRight: '40px'}}>
          <div className="row">
            <div className="col-lg-12 text-right">
              <div className="brand_logo_container" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <span className="logo_metallic_gold_animated">BP TechSpace</span>
                </Link>
              </div>
              <nav className="navbar" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '40px' }}>
                <ul className="navbar_menu" style={{ display: 'flex', alignItems: 'center', gap: '30px', margin: 0, padding: 0 }}>
                  <li>
                    <Link href="/" className="nav_link_animated">{safeT('HOME', 'TRANG CHỦ')}</Link>
                  </li>
                  <li className="mega-drop-down">
                    <Link href="/shops/all" className="nav_link_animated">
                      {safeT('PRODUCTS', 'SẢN PHẨM')} <i className="fa fa-angle-down"></i>
                    </Link>

                    <div className="mega-menu" style={{ top: '100%' }}>
                      <div className="mega-menu-wrap" style={{ display: 'flex', gap: '40px', padding: '15px' }}>
                        {departments &&
                          departments.map((item, index) => {
                            return (
                              <div className="mega-menu-content" key={index} style={{ minWidth: '150px' }}>
                                <h5 style={{ color: '#00FFFF', fontWeight: 'bold', marginBottom: '20px', whiteSpace: 'nowrap' }}>{safeT(item.departmentName, item.departmentName === "Laptops" ? "Laptop" : item.departmentName === "Phones" ? "Điện Thoại" : "Âm Thanh")}</h5>
                                <ul className="stander" style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
                                  {item.categories.split(",").map((i, idx) => {
                                    return (
                                      <li key={idx} style={{ width: '100%' }}>
                                        <Link href={`/shops/${item.departmentName}/${i}`} style={{ display: 'block', padding: 0 }}>{i}</Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link href="/contact" className="nav_link_animated">{safeT('CONTACT', 'LIÊN HỆ')}</Link>
                  </li>
                </ul>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'nowrap' }}>
                  <ul className="top_nav_merged" style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '20px', alignItems: 'center', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                    <li className="currency" style={{ position: 'relative' }}>
                      <a style={{cursor: 'pointer'}}>{safeCurr} <i className="fa fa-angle-down"></i></a>
                      <ul className="currency_selection">
                        <li><a onClick={(e) => this.changeCurrency('VND', e)}>VNĐ</a></li>
                        <li><a onClick={(e) => this.changeCurrency('USD', e)}>USD</a></li>
                      </ul>
                    </li>
                    <li className="language" style={{ position: 'relative' }}>
                      <a style={{cursor: 'pointer'}}>{safeLangDisplay} <i className="fa fa-angle-down"></i></a>
                      <ul className="language_selection">
                        <li><a onClick={(e) => this.changeLang('vi', e)}>Tiếng Việt</a></li>
                        <li><a onClick={(e) => this.changeLang('en', e)}>English</a></li>
                      </ul>
                    </li>
                    
                    {this.state.isMounted && Auth.getUserDetails() !== undefined && Auth.getUserDetails() !== null && Auth.getToken() !== undefined ? (
                      <li className="account" style={{ position: 'relative' }}>
                        <a style={{cursor: 'pointer'}}><i className="fa fa-user" style={{marginRight: '5px'}}></i>{Auth.getUserDetails().user_name}</a>
                        <ul className="account_selection">
                          <li><a onClick={(e) => this.logout(e)}><i className="fas fa-sign-out-alt"></i> THOÁT</a></li>
                        </ul>
                      </li>
                    ) : (
                      <li className="account" style={{ position: 'relative' }}>
                        <a style={{cursor: 'pointer'}}><i className="fa fa-user"></i></a>
                        <ul className="account_selection">
                          <li><a onClick={(e) => this.loginClicked(e)}><i className="fas fa-sign-in-alt"></i> ĐĂNG NHẬP</a></li>
                          <li><a onClick={(e) => this.registerClicked(e)}><i className="fa fa-user-plus"></i> ĐĂNG KÝ</a></li>
                        </ul>
                      </li>
                    )}
                  </ul>

                  <ul className="navbar_user" style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '15px', alignItems: 'center', flexWrap: 'nowrap' }}>
                    {this.state.searchActive && (
                      <li style={{ display: 'inline-block', position: 'relative' }}>
                        <input 
                          type="text" 
                          placeholder={safeT("Tìm Kiếm...", "Search...")}
                          value={this.state.searchText}
                          onChange={this.handleSearchChange}
                          onKeyDown={this.handleSearchSubmit}
                          autoFocus
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '20px',
                            color: '#ffffff',
                            padding: '5px 15px',
                            paddingRight: '35px',
                            width: '200px',
                            outline: 'none',
                            fontSize: '14px'
                          }}
                        />
                        <i className="fa fa-times" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#fff', cursor: 'pointer', fontSize: '12px' }} onClick={this.toggleSearch}></i>
                      </li>
                    )}
                    <li style={{ display: 'inline-block' }}>
                      <a href="#" onClick={this.toggleSearch} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', color: '#fff', textDecoration: 'none' }}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="wishlist" style={{ display: 'inline-block', position: 'relative' }}>
                      <Link href="/wishlist" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', color: '#fff', textDecoration: 'none' }}>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                        {this.state.isMounted && this.state.wishlistCount > 0 && (
                          <span className="checkout_items" style={{ position: 'absolute', top: '-5px', right: '-5px', width: '20px', height: '20px', borderRadius: '50%', background: '#fe4c50', color: '#fff', fontSize: '12px', textAlign: 'center', lineHeight: '20px' }}>
                            {this.state.wishlistCount}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li className="checkout" style={{ display: 'inline-block', position: 'relative' }}>
                      <a href="#" onClick={() => this.showHideCartModal()} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', color: '#fff', textDecoration: 'none' }}>
                        <i className="fas fa-shopping-bag"></i>
                        {this.state.isMounted && cart.totalQty !== undefined && (
                          <span id="checkout_items" className="checkout_items" style={{ position: 'absolute', top: '-5px', right: '-5px', width: '20px', height: '20px', borderRadius: '50%', background: '#fe4c50', color: '#fff', fontSize: '12px', textAlign: 'center', lineHeight: '20px' }}>
                            {cart.totalQty}
                          </span>
                        )}
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="hamburger_container"
                  onClick={() => this.handleMenuClicked()}
                >
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
              </nav>
            </div>
          </div>
        </div>
        {this.state.isMounted && (
          <MediaQuery query={device.max.tabletL}>
            <MobileMenu
              activeClass={this.state.activeclass}
              onClose={() => this.handleMenuClicked()}
            />
          </MediaQuery>
        )}
        {this.state.modalShow ? (
          <HomeCartView
            cart={cart}
            show={this.state.modalShow}
            onHide={() => this.showHideCartModal()}
            postCart={this.props.postCart}
          />
        ) : null}
        {this.state.loginModalShow ? (
          <LoginRegister
            show={this.state.loginModalShow}
            login={this.state.isLogin}
            registerClicked={() => this.registerClicked()}
            loginClicked={() => this.loginClicked()}
            onHide={() => this.showHideLoginModal()}
          />
        ) : null}
      </div>
    );
  }
}

export default NavBar;
