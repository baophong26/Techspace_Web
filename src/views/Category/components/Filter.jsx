/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import Link from "next/link";
import { t } from "../../../utils/translate";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const currentCategory = this.props.match.params.category;
    const currentDepartment = this.props.match.params.department;
    return (
      <React.Fragment>
        <div className="sidebar_section">
          <div className="sidebar_title" style={{marginBottom: '20px'}}>
            <h5 style={{ fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '14px', color: '#00FFFF', fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>{t('Product Category', 'Danh Mục Sản Phẩm')}</h5>
          </div>
          <ul className="sidebar_categories" style={{ fontFamily: "'Outfit', sans-serif", padding: 0 }}>
            {this.props.departments && this.props.departments.map((item, index) => {
              const isActive = (currentCategory === item.departmentName || currentDepartment === item.departmentName);
              return (
                <li key={index} className={isActive ? "active" : ""} style={{marginTop: '12px', listStyle: 'none'}}>
                  <div style={{fontWeight: isActive ? '600' : '400', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '16px', color: isActive ? '#ffffff' : '#b3b3b3', transition: 'color 0.2s ease, transform 0.2s ease', transform: isActive ? 'translateX(5px)' : 'none'}} onClick={() => { window.location.href = `/bp-techspace/shops/${item.departmentName}`; }}>
                    {isActive && <span style={{marginRight: '8px', color: '#00FFFF', fontSize: '14px'}}><i className="fa fa-chevron-right" aria-hidden="true"></i></span>} 
                    {t(item.departmentName, item.departmentName === "Laptops" ? "Laptop" : item.departmentName === "Phones" ? "Điện Thoại" : "Âm Thanh")}
                  </div>
                </li>
             );
            })}
          </ul>
        </div>

        {/* Search Bar Section */}
        <div className="sidebar_section" style={{marginTop: '35px', paddingBottom: '10px'}}>
          <div className="sidebar_title" style={{marginBottom: '20px'}}>
            <h5 style={{ fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '14px', color: '#00FFFF', fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>{t('Search Products', 'Tìm Kiếm')}</h5>
          </div>
          <div style={{marginTop: '10px'}}>
            <input 
               type="text" 
               className="form-control" 
               placeholder={t('Enter product name...', 'Nhập tên sản phẩm...')} 
               style={{background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid #444', borderRadius: '8px', padding: '10px 10px', fontFamily: "'Outfit', sans-serif", fontSize: '13px', transition: 'border-color 0.3s', boxSizing: 'border-box', width: '100%'}}
               value={this.props.searchQuery || ""}
               onChange={(e) => this.props.onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Price Filter Section */}
        <div className="sidebar_section" style={{marginTop: '35px'}}>
          <div className="sidebar_title" style={{marginBottom: '20px'}}>
            <h5 style={{ fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '14px', color: '#00FFFF', fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>{t('Filter by Price', 'Lọc Theo Giá')}</h5>
          </div>
          <div style={{marginTop: '10px', color: '#ccc', fontSize: '14px', fontFamily: "'Outfit', sans-serif"}}>
            
            <div style={{marginBottom: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s'}} onClick={() => this.props.onPriceChange('all')} className="price-item">
               <span style={{display: 'inline-block', width: '18px', height: '18px', border: '2px solid #00FFFF', borderRadius: '50%', marginRight: '12px', background: this.props.priceRange === 'all' ? '#00FFFF' : 'transparent', transition: 'background 0.2s'}}></span>
               <span style={{color: this.props.priceRange === 'all' ? '#ffffff' : '#b3b3b3', fontWeight: this.props.priceRange === 'all' ? '600' : '400'}}>{t('All Prices', 'Tất cả mức giá')}</span>
            </div>
            
            <div style={{marginBottom: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s'}} onClick={() => this.props.onPriceChange('under10')}>
               <span style={{display: 'inline-block', width: '18px', height: '18px', border: '2px solid #00FFFF', borderRadius: '50%', marginRight: '12px', background: this.props.priceRange === 'under10' ? '#00FFFF' : 'transparent', transition: 'background 0.2s'}}></span>
               <span style={{color: this.props.priceRange === 'under10' ? '#ffffff' : '#b3b3b3', fontWeight: this.props.priceRange === 'under10' ? '600' : '400'}}>{t('Under 10 Million', 'Dưới 10 Triệu')}</span>
            </div>
            
            <div style={{marginBottom: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s'}} onClick={() => this.props.onPriceChange('10to20')}>
               <span style={{display: 'inline-block', width: '18px', height: '18px', border: '2px solid #00FFFF', borderRadius: '50%', marginRight: '12px', background: this.props.priceRange === '10to20' ? '#00FFFF' : 'transparent', transition: 'background 0.2s'}}></span>
               <span style={{color: this.props.priceRange === '10to20' ? '#ffffff' : '#b3b3b3', fontWeight: this.props.priceRange === '10to20' ? '600' : '400'}}>{t('10 - 20 Million', '10 - 20 Triệu')}</span>
            </div>
            
            <div style={{marginBottom: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s'}} onClick={() => this.props.onPriceChange('over20')}>
               <span style={{display: 'inline-block', width: '18px', height: '18px', border: '2px solid #00FFFF', borderRadius: '50%', marginRight: '12px', background: this.props.priceRange === 'over20' ? '#00FFFF' : 'transparent', transition: 'background 0.2s'}}></span>
               <span style={{color: this.props.priceRange === 'over20' ? '#ffffff' : '#b3b3b3', fontWeight: this.props.priceRange === 'over20' ? '600' : '400'}}>{t('Over 20 Million', 'Trên 20 Triệu')}</span>
            </div>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default function FilterWithRouter(props) {
  const router = require('next/navigation').useRouter();
  const params = require('next/navigation').useParams() || {};
  
  const match = {
    params: {
      category: params.category,
      department: params.department
    }
  };

  const history = {
    push: (url) => router.push(url)
  };

  return <Filter {...props} router={router} match={match} history={history} />;
}
