/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import SingleProduct from "../../components/Products/SingleProduct";
import Auth from "../../modules/Auth";
import LoginRegister from "../../components/LoginRegisterModal";
import Filter from "./components/Filter";
import { t } from "../../utils/translate";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products,
      productsBAK: this.props.products,
      departments: this.props.departments,
      modalShow: false,
      login: true,
      searchQuery: "",
      priceRange: "all",
      sortType: "default",
      showCount: 8,
      currentPage: 1
    };
    this.addToBag = this.addToBag.bind(this);
  }

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  }

  handlePriceChange = (range) => {
    this.setState({ priceRange: range, currentPage: 1 });
  }
  componentDidMount() {
    if (!this.props.products) {
      this.props.getAllProducts();
    }
    if (!this.props.departments) {
      this.props.getDepartments();
    }
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const search = urlParams.get('search');
      if (search) {
        this.setState({ searchQuery: search });
      }
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

  addToBag = params => {
    if (
      Auth.getUserDetails() !== undefined &&
      Auth.getUserDetails() !== null &&
      Auth.getToken() !== undefined
    ) {
      let cart = this.props.postCart(params);
      cart.then(res => {
        console.log(res);
      });
    } else {
      this.setState({ modalShow: true });
    }
  };

  render() {
    const { products, applyFilters } = this.props;
    const { department, category } = this.props.match.params;
    let displayProducts = products || [];
    if (department && category) {
      displayProducts = displayProducts.filter(p => p.department === department && p.category === category);
    } else {
      const singleParam = category || department;
      if (singleParam && singleParam !== 'all') {
        const lowerParam = singleParam.toLowerCase();
        if (lowerParam === 'newarrivals') {
          displayProducts = [...displayProducts].sort((a, b) => b.date - a.date);
        } else if (lowerParam === 'collection') {
          displayProducts = [...displayProducts].sort((a, b) => b.price - a.price);
        } else if (lowerParam === 'shop') {
          // Shop just shows all products
          displayProducts = [...displayProducts];
        } else {
          displayProducts = displayProducts.filter(p => p.department === singleParam || p.category === singleParam);
        }
      }
    }

    // Apply String Search Filtering
    if (this.state.searchQuery) {
      const lowerQuery = this.state.searchQuery.toLowerCase();
      displayProducts = displayProducts.filter(p => p.title.toLowerCase().includes(lowerQuery));
    }

    // Apply Price Range Filtering
    if (this.state.priceRange !== 'all') {
      displayProducts = displayProducts.filter(p => {
        if (this.state.priceRange === 'under10') return p.price < 10000000;
        if (this.state.priceRange === '10to20') return p.price >= 10000000 && p.price <= 20000000;
        if (this.state.priceRange === 'over20') return p.price > 20000000;
        return true;
      });
    }

    // Apply Sorting
    if (this.state.sortType === 'price-asc') {
      displayProducts = [...displayProducts].sort((a, b) => a.price - b.price);
    } else if (this.state.sortType === 'price-desc') {
      displayProducts = [...displayProducts].sort((a, b) => b.price - a.price);
    } else if (this.state.sortType === 'name') {
      displayProducts = [...displayProducts].sort((a, b) => a.title.localeCompare(b.title));
    }

    const totalProducts = displayProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / this.state.showCount));
    let currentPage = this.state.currentPage;
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * this.state.showCount;
    const endIndex = startIndex + this.state.showCount;
    const paginatedProducts = displayProducts.slice(startIndex, endIndex);

    const translateCategory = (cat) => {
      if (!cat) return '';
      const lower = cat.toLowerCase();
      if (lower === 'laptops') return t('Laptop', 'Laptop');
      if (lower === 'phones') return t('Phones', 'Điện Thoại');
      if (lower === 'audio') return t('Audio', 'Âm Thanh & Phụ Kiện');
      if (lower === 'newarrivals') return t('New Arrivals', 'Hàng Mới');
      if (lower === 'collection') return t('Collection', 'Bộ Sưu Tập Khủng');
      if (lower === 'shop') return t('Shop', 'Đại Lý Uy Tín');
      return t(cat, cat);
    };

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
                  <a href="/bp-techspace/shops/all">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    {t('PRODUCTS', 'Sản Phẩm')}
                  </a>
                </li>
                {category && category !== 'all' && (
                  <li className="active">
                    <a href="#">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                      {department ? `${translateCategory(department)} / ${translateCategory(category)}` : translateCategory(category)}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="sidebar">
              <Filter 
                applyFilters={applyFilters} 
                departments={this.props.departments} 
                searchQuery={this.state.searchQuery}
                onSearchChange={this.handleSearchChange}
                priceRange={this.state.priceRange}
                onPriceChange={this.handlePriceChange}
              />
            </div>
            <div className="main_content">
              <div className="products_iso">
                <div className="row">
                  <div className="col">
                    <div className="product_sorting_container product_sorting_container_top" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: 'rgba(255,255,255,0.03)', padding: '15px 20px', borderRadius: '12px', border: '1px solid #333'}}>
                      <div className="product_sorting" style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                          <span style={{color: '#aaa', fontSize: '14px', fontFamily: "'Outfit', sans-serif"}}>{t('Sort by:', 'Sắp xếp:')}</span>
                          <select value={this.state.sortType} onChange={(e) => this.setState({sortType: e.target.value, currentPage: 1})} style={{background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #444', borderRadius: '6px', padding: '6px 12px', fontFamily: "'Outfit', sans-serif", fontSize: '14px', cursor: 'pointer', outline: 'none'}}>
                            <option value="default">{t('Default', 'Mặc định')}</option>
                            <option value="price-asc">{t('Price Low to High', 'Giá Tăng dần')}</option>
                            <option value="price-desc">{t('Price High to Low', 'Giá Giảm dần')}</option>
                            <option value="name">{t('By Name A-Z', 'Tên A - Z')}</option>
                          </select>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                          <span style={{color: '#aaa', fontSize: '14px', fontFamily: "'Outfit', sans-serif"}}>{t('Show:', 'Hiển thị:')}</span>
                          <select value={this.state.showCount} onChange={(e) => this.setState({showCount: parseInt(e.target.value), currentPage: 1})} style={{background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #444', borderRadius: '6px', padding: '6px 12px', fontFamily: "'Outfit', sans-serif", fontSize: '14px', cursor: 'pointer', outline: 'none'}}>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="pages" style={{display: 'flex', alignItems: 'center', gap: '15px', fontFamily: "'Outfit', sans-serif"}}>
                        <span style={{color: '#ccc', fontSize: '14px'}}>{t('Page', 'Trang')} {currentPage} / {totalPages}</span>
                        <div style={{display: 'flex', gap: '5px'}}>
                          <button disabled={currentPage <= 1} onClick={() => this.setState({currentPage: currentPage - 1})} style={{background: currentPage <= 1 ? '#222' : '#00FFFF', color: currentPage <= 1 ? '#555' : '#111', border: 'none', borderRadius: '6px', width: '32px', height: '32px', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontWeight: 'bold'}}><i className="fa fa-angle-left"></i></button>
                          <button disabled={currentPage >= totalPages} onClick={() => this.setState({currentPage: currentPage + 1})} style={{background: currentPage >= totalPages ? '#222' : '#00FFFF', color: currentPage >= totalPages ? '#555' : '#111', border: 'none', borderRadius: '6px', width: '32px', height: '32px', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontWeight: 'bold'}}><i className="fa fa-angle-right"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {paginatedProducts &&
                    paginatedProducts.map((item, index) => {
                      return (
                        <div
                          className="col-lg-3 col-sm-6"
                          key={index}
                          data-aos="zoom-in"
                        >
                          <SingleProduct
                            productItem={item}
                            addToBag={this.addToBag}
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="product_sorting_container product_sorting_container_bottom clearfix" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', background: 'transparent', padding: '15px 0', borderTop: '1px solid #333'}}>
                  <span className="showing_results" style={{color: '#aaa', fontSize: '14px', fontFamily: "'Outfit', sans-serif"}}>{t(`Showing ${totalProducts === 0 ? 0 : startIndex + 1}–${Math.min(endIndex, totalProducts)} of ${totalProducts} results`, `Hiển thị ${totalProducts === 0 ? 0 : startIndex + 1}–${Math.min(endIndex, totalProducts)} của ${totalProducts} kết quả`)}</span>
                  
                  <div className="pages" style={{display: 'flex', alignItems: 'center', gap: '15px', fontFamily: "'Outfit', sans-serif"}}>
                    <span style={{color: '#ccc', fontSize: '14px'}}>{t('Page', 'Trang')} {currentPage} / {totalPages}</span>
                    <div style={{display: 'flex', gap: '5px'}}>
                      <button disabled={currentPage <= 1} onClick={() => { this.setState({currentPage: currentPage - 1}); window.scrollTo({top: 0, behavior: 'smooth'}); }} style={{background: currentPage <= 1 ? '#222' : '#00FFFF', color: currentPage <= 1 ? '#555' : '#111', border: 'none', borderRadius: '6px', width: '32px', height: '32px', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontWeight: 'bold'}}><i className="fa fa-angle-left"></i></button>
                      <button disabled={currentPage >= totalPages} onClick={() => { this.setState({currentPage: currentPage + 1}); window.scrollTo({top: 0, behavior: 'smooth'}); }} style={{background: currentPage >= totalPages ? '#222' : '#00FFFF', color: currentPage >= totalPages ? '#555' : '#111', border: 'none', borderRadius: '6px', width: '32px', height: '32px', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontWeight: 'bold'}}><i className="fa fa-angle-right"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Category;
