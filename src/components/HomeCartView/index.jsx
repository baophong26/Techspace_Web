/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";
import Auth from "../../modules/Auth";
import EmptyCart from "../../assets/images/emptyCart.png";
import jumpTo from "../../modules/Navigation";
import { t, formatPrice, translateProductTitle } from "../../utils/translate";
class HomeCartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToChechout = () => {
    jumpTo("/bp-techspace/cart");
  };
  render() {
    const { cart, postCart, ...modalProps } = this.props;
    const { items, totalPrice } = cart || {};
    const hasItems = items && Object.keys(items).length > 0;

    return (
      <Modal {...modalProps} className="right">
        <Modal.Header closeButton>
          <Modal.Title>{t('Your Cart', 'Giỏ Hàng')}</Modal.Title>
          {hasItems ? (
            <span className="checkout--btn" onClick={() => this.goToChechout()}>
              {t('checkout', 'Thanh Toán')}{" "}
            </span>
          ) : null}
        </Modal.Header>
        <Modal.Body className="modal-body-content">
          {Auth.getUserDetails() !== undefined &&
          Auth.getUserDetails() !== null &&
          Auth.getToken() !== undefined ? (
            <div>
              {!hasItems && (
                <div className="empty--basket">
                  <img src={EmptyCart.src || EmptyCart} className="img-fluid" alt={t("Empty Cart", "Giỏ hàng trống")} />
                  <h4 style={{ textAlign: "center", marginTop: "20px", color: "#00ffff" }}>{t("Empty cart", "Giỏ hàng đang trống")}</h4>
                </div>
              )}
            </div>
          ) : (
            <div className="empty--basket">
              <h4 style={{ color: "#00ffff" }}>{t('Please login to view cart', 'Vui lòng đăng nhập')}</h4>
              <img src={EmptyCart.src || EmptyCart} className="img-fluid" alt={t("Empty Cart", "Giỏ hàng trống")} />
            </div>
          )}

          {hasItems &&
            Object.keys(items).map((id) => {
              const itemData = items[id].item;
              let imgSrc = itemData.imagePath;
              if (imgSrc && !imgSrc.startsWith("http")) {
                imgSrc = `/bp-techspace/images/products/${imgSrc.split('/').pop()}`;
              }

              return (
                <div key={id} className="basket--item">
                  <div className="basket--item--img">
                    <img src={imgSrc || "/assets/images/placeholder.jpg"} alt="" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className="basket--item--details" style={{ position: 'relative' }}>
                    <div className="basket--item--title" style={{ paddingRight: '20px' }}>
                      {translateProductTitle(items[id].item.title)}
                    </div>
                    <div className="basket--item--quantity">
                      {t('Quantity', 'Số lượng')}: <span>{items[id].qty}</span>
                    </div>
                    <div className="basket--item--price">
                      {" "}
                      {t('Price', 'Giá')}: <span>{formatPrice(items[id].price)}</span>
                    </div>
                    <div 
                      className="basket--item--remove" 
                      onClick={() => this.props.postCart(id, false, false, true)}
                      style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        color: '#ff4d4f',
                        cursor: 'pointer',
                        padding: '4px',
                        fontSize: '14px',
                        transition: 'color 0.2s',
                      }}
                      title={t("Remove item", "Xóa sản phẩm")}
                    >
                      <i className="fa fa-trash" aria-hidden="true" onMouseOver={(e) => e.target.style.color = '#ff0000'} onMouseOut={(e) => e.target.style.color = '#ff4d4f'}></i>
                    </div>
                  </div>
                </div>
              );
            })}
          {hasItems && (
            <div className="total--price-container">
              <h3 style={{ textAlign: "center", color: '#fff' }}>
                {t('Total', 'Tổng')}: <span style={{ color: "#00FFFF" }}>{formatPrice(totalPrice)}</span>{" "}
              </h3>
              <button
                className="btn btn-wide cart-checkout-btn-big w-100"
                style={{ marginTop: 20 }}
                onClick={() => this.goToChechout()}
              >
                {t('Checkout', 'Tiến hành thanh toán')}
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default HomeCartView;
