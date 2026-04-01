/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import Heading from "../../components/Heading";
import CartItem from "./CartItem";
import { Button, Form } from "react-bootstrap";
import CalculateTax from "../../utils/CalculateTax";
import EmptyCart from "../../assets/images/empty_cart.png";
import { t, formatPrice } from "../../utils/translate";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutStatus: 'idle', // 'idle' | 'form' | 'processing' | 'success'
      formData: {
        name: '',
        phone: '',
        address: '',
        note: ''
      }
    };
  }

  showForm = () => {
    this.setState({ checkoutStatus: 'form' });
  }

  cancelForm = () => {
    this.setState({ checkoutStatus: 'idle' });
  }

  handleInputChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
  }

  handleCheckoutSubmit = (e) => {
    e.preventDefault();
    this.setState({ checkoutStatus: 'processing' });
    
    // Simulate a secure network transaction delay
    setTimeout(() => {
      this.setState({ checkoutStatus: 'success' });
      
      // Redirect to home page after success message
      setTimeout(() => {
        window.location.href = '/bp-techspace/';
      }, 2500);
    }, 3000);
  }

  render() {
    const { totalPrice, items } = this.props.cart;
    const { postCart } = this.props;
    const { checkoutStatus, formData } = this.state;

    return (
      <div className="shopping--cart" data-aos="fade-up">
        {checkoutStatus === 'form' ? (
          <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div style={{
                  background: '#1A1D24',
                  border: '1px solid #2A2F3A',
                  padding: '35px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  position: 'relative'
                }}>
                  <button 
                    onClick={this.cancelForm}
                    style={{
                      position: 'absolute', top: '15px', right: '20px',
                      background: 'none', border: 'none', color: '#FE4C50',
                      fontSize: '20px', cursor: 'pointer', outline: 'none'
                    }}><i className="fa fa-times"></i></button>
                  
                  <h3 style={{ color: '#fff', borderBottom: '1px solid #2A2F3A', paddingBottom: '15px', marginBottom: '25px', fontWeight: '600', fontSize: '22px' }}>
                    {t('Delivery Information', 'Thông Tin Giao Hàng')}
                  </h3>
                  
                  <Form onSubmit={this.handleCheckoutSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#ccc', fontWeight: '500', fontSize: '14px' }}>{t('Full Name', 'Họ Và Tên')}</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        required
                        placeholder={t('Enter your full name', 'Nhập họ và tên')} 
                        value={formData.name}
                        onChange={this.handleInputChange}
                        style={{ background: '#0D0F13', border: '1px solid #2A2F3A', color: '#fff', padding: '12px', borderRadius: '6px' }} 
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#ccc', fontWeight: '500', fontSize: '14px' }}>{t('Phone Number', 'Số Điện Thoại')}</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="phone"
                        required
                        placeholder="09..." 
                        value={formData.phone}
                        onChange={this.handleInputChange}
                        style={{ background: '#0D0F13', border: '1px solid #2A2F3A', color: '#fff', padding: '12px', borderRadius: '6px' }} 
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#ccc', fontWeight: '500', fontSize: '14px' }}>{t('Delivery Address', 'Địa Chỉ Giao Hàng')}</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="address"
                        required
                        placeholder={t('Enter delivery address', 'Nhập địa chỉ giao hàng')} 
                        value={formData.address}
                        onChange={this.handleInputChange}
                        style={{ background: '#0D0F13', border: '1px solid #2A2F3A', color: '#fff', padding: '12px', resize: 'none', borderRadius: '6px' }} 
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label style={{ color: '#ccc', fontWeight: '500', fontSize: '14px' }}>{t('Additional Notes', 'Ghi Chú Đơn Hàng')}</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2} 
                        name="note"
                        placeholder={t('Optional details...', 'Ghi chú thêm (không bắt buộc)...')} 
                        value={formData.note}
                        onChange={this.handleInputChange}
                        style={{ background: '#0D0F13', border: '1px solid #2A2F3A', color: '#fff', padding: '12px', resize: 'none', borderRadius: '6px' }} 
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end mt-4 pt-3" style={{ borderTop: '1px solid #2A2F3A' }}>
                      <Button variant="secondary" onClick={this.cancelForm} style={{ marginRight: '12px', padding: '10px 25px', borderRadius: '6px' }}>{t('Cancel', 'Hủy')}</Button>
                      <Button 
                        type="submit"
                        variant="danger"
                        style={{ padding: '10px 35px', fontWeight: 'bold', borderRadius: '6px', background: '#FE4C50', border: 'none' }}>
                        {t('Confirm Order', 'Tiến Hành Đặt Hàng')}
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment>

        {checkoutStatus === 'processing' && (
          <div className="cyber-overlay">
            <div className="cyber-spinner"></div>
            <h2 className="cyber-glitch-text" data-text="PROCESSING SECURE TRANSACTION">PROCESSING SECURE TRANSACTION...</h2>
            <p style={{ color: '#00FFFF', fontFamily: 'monospace', marginTop: '15px' }}>TRANSMITTING DATA FOR {formData.name}...</p>
            <p style={{ color: '#00FFFF', fontFamily: 'monospace', opacity: 0.7 }}>ROUTING TO DESTINATION: {formData.address}</p>
          </div>
        )}
        
        {checkoutStatus === 'success' && (
          <div className="cyber-overlay success">
            <div className="cyber-check">✓</div>
            <h2 style={{ color: '#00ff41', textShadow: '0 0 10px #00ff41' }}>TRANSACTION COMPLETE</h2>
            <p style={{ color: '#ffffff', fontFamily: 'monospace' }}>REDIRECTING TO DASHBOARD...</p>
          </div>
        )}

        <div className="container" style={{ opacity: checkoutStatus !== 'idle' ? 0.2 : 1, pointerEvents: checkoutStatus !== 'idle' ? 'none' : 'auto', transition: 'opacity 0.5s' }}>
          <div className="shopping--cart--container">
            <div className="row ">
              <Heading title={t("Your Shopping Cart", "Giỏ Hàng Của Bạn")} data-aos="fade-up" />
            </div>
            <div style={{ height: 30 }}></div>
            <CartItem
              items={items || {}}
              handleClick={(pid, increase, decrease) =>
                postCart(pid, increase, decrease)
              }
            />
            {items !== undefined && items !== null && Object.keys(items).length > 0 ? (
              <div
                className="d-flex flex-column justify-content-end align-items-end"
                style={{ paddingRight: 50 }}
              >
                <p>
                  {t('SubTotal', 'Tạm Tính')} :{" "}
                  <span style={{ color: "#00FFFF" }}>{formatPrice(totalPrice)}</span>
                </p>
                <p>
                  Shipping : <span style={{ color: "#00FFFF" }}>Free</span>
                </p>

                <p>
                  {t('Taxes', 'Thuế')} :{" "}
                  <span style={{ color: "#00FFFF" }}>
                    {formatPrice(CalculateTax(totalPrice).taxes)}
                  </span>
                </p>

                <h3 style={{ textAlign: "center", borderTop: "1px solid rgba(0, 255, 255, 0.3)", paddingTop: "15px", marginTop: "10px" }}>
                  {t('Total', 'Tổng Cộng')}:{" "}
                  <span style={{ color: "#00FFFF", fontWeight: "bold", textShadow: "0 0 10px rgba(0,255,255,0.5)" }}>
                    {formatPrice(CalculateTax(totalPrice).total)}
                  </span>
                </h3>
                <hr />

                <Button 
                  onClick={this.showForm}
                  className="cyber-btn"
                  style={{ 
                    marginTop: 30, 
                    backgroundColor: 'transparent',
                    border: '1px solid #00FFFF',
                    color: '#00FFFF',
                    padding: '10px 30px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 'bold',
                    boxShadow: '0 0 15px rgba(0,255,255,0.2)',
                    transition: 'all 0.3s ease'
                  }}>
                  {t('Proceed To Form', 'Điền Thông Tin')}
                </Button>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <img
                  src={EmptyCart.src || EmptyCart}
                  alt="Empty Cart"
                  style={{ maxHeight: 250, maxWidth: 250, filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.3))' }}
                  className="img-fluid"
                />
                <h4 style={{ color: '#00FFFF', marginTop: '20px' }}>{t('Your cart is empty', 'Giỏ hàng của bạn đang trống')}</h4>
              </div>
            )}
          </div>
        </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Cart;
