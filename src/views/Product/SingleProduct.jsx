/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import Link from 'next/link';
import LoginRegister from "../../components/LoginRegisterModal";
import Auth from "../../modules/Auth";
import WishlistManager from "../../modules/Wishlist";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      size: "",
      pic: "",
      selectedSize: "",
      id: "",
      quantity: 1,
      modalShow: false,
      login: true,
      isFavorite: false,
    };
  }
  componentDidMount() {
    this.props.getProduct(this.props.productId);
    this.props.getVariantsByProductId(this.props.productId);
    
    this.updateFavoriteStatus = () => {
      this.setState({ isFavorite: WishlistManager.isInWishlist(this.props.productId) });
    };
    
    this.updateFavoriteStatus();
    window.addEventListener('wishlistChanged', this.updateFavoriteStatus);
  }

  componentWillUnmount() {
    if (this.updateFavoriteStatus) {
      window.removeEventListener('wishlistChanged', this.updateFavoriteStatus);
    }
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

  handleThumbnailClick = (item) => {
    this.setState({
      color: item.color,
      size: item.size,
      pic: item.imagePath,
      selectedSize: "",
      id: item._id,
      cartItem: null,
    });
  };

  onAddClicked = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };
  onRemoveClicked = () => {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  toggleFavorite = () => {
    if (this.props.product) {
      WishlistManager.toggleItem(this.props.product);
      // isFavorite state will automatically update via the wishlistChanged event listener
      
      const added = !this.state.isFavorite; // It's about to be added if it wasn't favorite
      
      // Optional: keep an alert or use a toast notification
      // alert(added ? "Đã thêm sản phẩm vào danh sách yêu thích!" : "Đã gỡ sản phẩm khỏi danh sách yêu thích!");
    }
  };

  addToBag = async (e) => {
    if (e) e.preventDefault();
    if (
      Auth.getUserDetails() !== undefined &&
      Auth.getUserDetails() !== null &&
      Auth.getToken() !== undefined
    ) {
      for (let i = 0; i < this.state.quantity; i++) {
        await this.props.postCart(this.state.id || this.props.productId);
      }
      alert("Đã thêm " + this.state.quantity + " sản phẩm vào giỏ hàng!");
    } else {
      this.setState({ modalShow: true });
    }
  };

  productInCart = () => {
    let available = false;
    // let items = this.props.cart.items;
    // if (items !== undefined && items !== null) {
    //   let itemCheck = Object.keys(items).map(
    //     id => items[id].item.title === this.props.product.title
    //   );

    //   if (itemCheck !== undefined && itemCheck !== null) {
    //     this.setState({ cartItem: itemCheck });
    //     available = true;
    //   } else {
    //     available = false;
    //   }
    // }

    return available;
  };

  render() {
    console.log(this.props);
    return (
      <div className="container single_product_container">
        {this.props.product && (
          <div>
            <div className="row">
              <div className="col">
                <div className="breadcrumbs d-flex flex-row align-items-center">
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href={`/shops/${this.props.product.department}`}>
                        <i className="fa fa-angle-right" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                        {this.props.product.department}
                      </Link>
                    </li>
                    <li className="active">
                      <Link href={`/shops/${this.props.product.department}/${this.props.product.category}`}>
                        <i className="fa fa-angle-right" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                        {this.props.product.category}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-7">
                <div className="single_product_pics">
                  <div className="row">
                    <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                      <div className="single_product_thumbnails">
                        <ul>
                          {this.props.variants &&
                            this.props.variants
                              .slice(0, 4)
                              .map((item, index) => (
                                <li
                                  key={index}
                                  onClick={() =>
                                    this.handleThumbnailClick(item)
                                  }
                                >
                                  <img
                                    data-image={item.imagePath && item.imagePath.startsWith("http") ? item.imagePath : `/bp-techspace/images/products/${(item.imagePath || '').split('/').pop()}`}
                                    src={item.imagePath && item.imagePath.startsWith("http") ? item.imagePath : `/bp-techspace/images/products/${(item.imagePath || '').split('/').pop()}`}
                                    alt=""
                                    className="img-fluid"
                                  />
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-9 image_col order-lg-2 order-1">
                      <div className="single_product_image" style={{ width: '100%', aspectRatio: '1/1', position: 'relative', overflow: 'hidden', borderRadius: '12px', backgroundColor: '#121212' }}>
                        <img
                          src={(this.state.pic || this.props.product.imagePath || "").startsWith("http") ? (this.state.pic || this.props.product.imagePath) : `/bp-techspace/images/products/${(this.state.pic || this.props.product.imagePath || "").split('/').pop()}`}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="product_details">
                  <div className="product_details_title">
                    <h2>{this.props.product.title}</h2>
                    <p>{this.props.product.description}</p>
                  </div>
                  <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                    <span>
                      <i className="fas fa-truck"></i>
                    </span>
                    <span>Giao hàng miễn phí</span>
                  </div>
                  <div className="original_price">
                    {" "}
                    {(parseFloat(this.props.product.price) * 1.15).toLocaleString()} ₫
                  </div>
                  <div className="product_price" style={{color: "#fe4c50", fontWeight: "bold", fontSize: "24px"}}>
                    {parseFloat(this.props.product.price).toLocaleString()} ₫
                  </div>
                  <ul className="star_rating">
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                    </li>
                  </ul>
                  <div className="product_color">
                    <span>Màu sắc:</span>
                    <ul>
                      <li style={{ background: "#e54e5d" }}></li>
                      <li style={{ background: "#252525" }}></li>
                      <li style={{ background: "#60b3f3" }}></li>
                    </ul>
                  </div>
                  <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                    <span>Số lượng:</span>

                    <div className="quantity_selector">
                      <span
                        className={
                          this.state.quantity > 1 ? "minus" : "minus disabled"
                        }
                        onClick={() => this.onRemoveClicked()}
                      >
                        <i className="fa fa-minus" aria-hidden="true"></i>
                      </span>
                      <span id="quantity_value">{this.state.quantity}</span>
                      <span
                        className="plus"
                        onClick={() => this.onAddClicked()}
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div
                      className="red_button product-add_to_cart_button"
                      onClick={this.addToBag}
                    >
                      <a href="#">THÊM VÀO GIỎ</a>
                    </div>

                    {/* <div className="red_cart_button product_add_to_cart_icon">
                      <a href="#">
                        <i className="fas fa-cart-arrow-down"></i>
                      </a>
                    </div> */}

                    <div 
                      className="product_favorite d-flex flex-column align-items-center justify-content-center"
                      onClick={this.toggleFavorite}
                      style={{ cursor: 'pointer', transition: 'all 0.3s ease', color: this.state.isFavorite ? '#ff3b3b' : '#b3b3b3' }}
                    >
                      <i className={this.state.isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <LoginRegister
          show={this.state.modalShow}
          login={this.state.login}
          registerClicked={() => this.registerClicked()}
          loginClicked={() => this.loginClicked()}
          onHide={() => this.showHideModal()}
        />
      </div>
    );
  }
}

export default SingleProduct;
