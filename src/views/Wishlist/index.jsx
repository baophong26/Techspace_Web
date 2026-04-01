import React, { Component } from "react";
import SingleProduct from "../../components/Products/SingleProduct";
import WishlistManager from "../../modules/Wishlist";
import { t } from "../../utils/translate";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isMounted: false
    };
  }

  componentDidMount() {
    this.updateWishlist = () => {
      this.setState({ products: WishlistManager.getItems() });
    };
    
    // Initial load
    this.updateWishlist();
    this.setState({ isMounted: true });

    // Listen to changes
    window.addEventListener('wishlistChanged', this.updateWishlist);
  }

  componentWillUnmount() {
    if (this.updateWishlist) {
      window.removeEventListener('wishlistChanged', this.updateWishlist);
    }
  }

  render() {
    if (!this.state.isMounted) return <div style={{ minHeight: '50vh' }}></div>;

    const { products } = this.state;

    return (
      <div className="container product_section_container">
        <div className="row">
          <div className="col product_section clearfix">
            <div className="breadcrumbs d-flex flex-row align-items-center">
              <ul>
                <li>
                  <a href="/">{t('Home', 'Trang Chủ')}</a>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    {t('Wishlist', 'Danh sách Yêu thích')}
                  </a>
                </li>
              </ul>
            </div>

            <div className="main_content" style={{ width: '100%', float: 'none', marginTop: '30px' }}>
              <div className="products_iso">
                <div className="row">
                  <div className="col">
                    <h2 style={{ color: '#00D2FF', marginBottom: '20px', fontFamily: "'Outfit', sans-serif" }}>
                      {t('My Wishlist', 'Mục Yêu Thích Của Tôi')}
                    </h2>
                  </div>
                </div>

                {products.length === 0 ? (
                  <div className="row">
                    <div className="col" style={{ textAlign: 'center', padding: '50px 0' }}>
                      <i className="far fa-heart" style={{ fontSize: '60px', color: '#ff4d4f', marginBottom: '20px' }}></i>
                      <h4 style={{ color: '#fff', fontFamily: "'Outfit', sans-serif" }}>
                        {t('Your wishlist is empty', 'Danh sách yêu thích của bạn đang trống')}
                      </h4>
                      <a href="/bp-techspace/shops/all" className="btn btn-wide cart-checkout-btn-big" style={{ marginTop: '20px', background: '#00ffff', color: '#000', padding: '10px 30px', borderRadius: '30px', display: 'inline-block' }}>
                        {t('Browse Products', 'Khám phá Sản phẩm')}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    {products.map((item, index) => (
                      <div className="col-lg-3 col-sm-6" key={index} data-aos="zoom-in">
                        <SingleProduct productItem={item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Wishlist;
