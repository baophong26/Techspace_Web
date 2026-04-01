/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from "react";
import { t } from "../../utils/translate";

function Footer(props) {
  return (
    <footer className="footer" style={{ background: '#0a0c10', borderTop: '1px solid #2A2F3A', paddingTop: '60px', paddingBottom: '30px', color: '#888' }}>
      <div className="container">
        <div className="row mb-5">
          {/* Brand & About */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h3 style={{ color: '#fff', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px' }}>
              <span style={{ color: '#FE4C50' }}>BP</span> TECHSPACE
            </h3>
            <p style={{ lineHeight: '1.8', fontSize: '14px', maxWidth: '300px' }}>
              {t("Elevating your digital lifestyle with state-of-the-art tech gadgets and premium accessories. Experience the future today.", "Nâng tầm phong cách sống số với những món đồ công nghệ và phụ kiện cao cấp. Trải nghiệm tương lai phần cứng ngay hôm nay.")}
            </p>
            <div className="footer_social mt-4">
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '15px' }}>
                <li><a href="#" style={{ color: '#fff', fontSize: '18px', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#FE4C50'} onMouseOut={e=>e.target.style.color='#fff'}><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#" style={{ color: '#fff', fontSize: '18px', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#fff'}><i className="fab fa-twitter"></i></a></li>
                <li><a href="#" style={{ color: '#fff', fontSize: '18px', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#FE4C50'} onMouseOut={e=>e.target.style.color='#fff'}><i className="fab fa-instagram"></i></a></li>
                <li><a href="#" style={{ color: '#fff', fontSize: '18px', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#fff'}><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 style={{ color: '#fff', marginBottom: '20px', fontWeight: 'bold' }}>{t("Quick Links", "Liên Kết")}</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.5', fontSize: '14px' }}>
              <li><a href="/bp-techspace/" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#888'}>{t("Home", "Trang Chủ")}</a></li>
              <li><a href="/bp-techspace/shop" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#888'}>{t("Shop", "Sản Phẩm")}</a></li>
              <li><a href="#" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#888'}>{t("About Us", "Giới Thiệu")}</a></li>
              <li><a href="#" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#888'}>{t("Contact", "Liên Hệ")}</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 style={{ color: '#fff', marginBottom: '20px', fontWeight: 'bold' }}>{t("Customer Service", "Hỗ Trợ")}</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.5', fontSize: '14px' }}>
              <li><a href="#" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#888'}>{t("My Account", "Tài Khoản")}</a></li>
              <li><a href="#" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#888'}>{t("Order Tracking", "Theo Dõi Đơn Hàng")}</a></li>
              <li><a href="#" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#888'}>{t("FAQs", "Câu Hỏi Thường Gặp")}</a></li>
              <li><a href="#" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='#00FFFF'} onMouseOut={e=>e.target.style.color='#888'}>{t("Return Policy", "Chính Sách Đổi Trả")}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
             <h5 style={{ color: '#fff', marginBottom: '20px', fontWeight: 'bold' }}>{t("Get in Touch", "Tổng Đài Liên Hệ")}</h5>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.5', fontSize: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fa fa-map-marker-alt" aria-hidden="true" style={{ color: '#FE4C50', width: '20px', textAlign: 'center' }}></i>
                  <span>123 Cyber Street, Tech District, Night City</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fa fa-phone" aria-hidden="true" style={{ color: '#FE4C50', width: '20px', textAlign: 'center' }}></i>
                  <span>+84 123 456 789</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fa fa-envelope" aria-hidden="true" style={{ color: '#FE4C50', width: '20px', textAlign: 'center' }}></i>
                  <span>support@bptechspace.com</span>
                </li>
             </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row" style={{ borderTop: '1px solid #2A2F3A', paddingTop: '20px', marginTop: '20px' }}>
          <div className="col-lg-12 d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div style={{ fontSize: '13px', color: '#666' }}>
              &copy; {new Date().getFullYear()} BP TECHSPACE. {t("All Rights Reserved.", "Bản quyền của BP TechSpace.")}
            </div>
            <div className="mt-3 mt-md-0" style={{ display: 'flex', gap: '10px' }}>
              <i className="fab fa-cc-visa" style={{ fontSize: '24px', color: '#444' }}></i>
              <i className="fab fa-cc-mastercard" style={{ fontSize: '24px', color: '#444' }}></i>
              <i className="fab fa-cc-paypal" style={{ fontSize: '24px', color: '#444' }}></i>
              <i className="fab fa-cc-apple-pay" style={{ fontSize: '24px', color: '#444' }}></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
