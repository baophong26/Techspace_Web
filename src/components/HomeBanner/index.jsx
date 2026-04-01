/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from "react";
import { Carousel } from "react-bootstrap";
import Link from "next/link";
import { t } from "../../utils/translate";

const slides = [
  {
    image: "/bp-techspace/images/products/asus-4.jpg",
    category: "Laptops",
    titleEn: "SUPER INTELLIGENCE. 2026 PERFORMANCE",
    titleVi: "SIÊU TRÍ TUỆ. HIỆU NĂNG 2026",
    subtitleEn: "DISCOVER THE MOST ADVANCED GENERATION OF LAPTOPS. BREAK ALL LIMITS.",
    subtitleVi: "KHÁM PHÁ THẾ HỆ LAPTOP TIÊN TIẾN NHẤT. BỨT PHÁ MỌI GIỚI HẠN.",
    link: "/shops/Laptops"
  },
  {
    image: "/bp-techspace/images/products/headphones-1.jpg",
    category: "Audio",
    titleEn: "LIMITLESS AUDIO",
    titleVi: "ÂM THANH KHÔNG GIỚI HẠN",
    subtitleEn: "IMMERSE IN EVERY BEAT. PEAK AUDITORY EXPERIENCE.",
    subtitleVi: "ĐẮM CHÌM TRONG TỪNG NHỊP ĐẬP. TRẢI NGHIỆM ĐỈNH CAO THÍNH GIÁC.",
    link: "/shops/Audio"
  },
  {
    image: "/bp-techspace/images/products/iphone-1.jpg",
    category: "Phones",
    titleEn: "CONNECT TO THE FUTURE",
    titleVi: "KẾT NỐI TƯƠNG LAI CÙNG 6G",
    subtitleEn: "TREND-SETTING TECHNOLOGY. UNPRECEDENTED SPEED.",
    subtitleVi: "CÔNG NGHỆ ĐIỆN THOẠI ĐÓN ĐẦU XU HƯỚNG. TỐC ĐỘ CHƯA TỪNG CÓ.",
    link: "/shops/Phones"
  },
  {
    image: "/bp-techspace/images/products/asus-3.jpg",
    category: "Desktop",
    titleEn: "ULTIMATE GAMING",
    titleVi: "RỰC RỠ SẮC MÀU GAMING",
    subtitleEn: "ASUS ROG STRIX HAS ARRIVED.",
    subtitleVi: "ĐẠI ĐẾ ASUS ROG STRIX ĐÃ ĐẾN. CHIẾN GAME KHÔNG ĐỐI THỦ.",
    link: "/shops/Laptops"
  }
];

function HomeBanner(props) {
  return (
    <div style={{ width: '100%', backgroundColor: '#000' }}>
      <Carousel controls={true} indicators={true} fade={true} interval={5000} pause={false}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                width: '100%',
                height: 'calc(100vh - 150px)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >

              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  opacity: 0.8
                }}
              />

              {/* Dark Overlays for Text Shadow */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(10, 12, 16, 0.9) 10%, rgba(0, 0, 0, 0.2) 100%)', zIndex: 1 }}></div>

              {/* Centralized Text Content (Glassmorphism Box with Pulse Animation) */}
              <div 
                className="glass-panel-animated"
                style={{ 
                  position: 'relative', 
                  zIndex: 2, 
                  textAlign: 'center', 
                  padding: '50px 40px', 
                  width: '90%', 
                  maxWidth: '900px'
                }}
              >
                <h1 suppressHydrationWarning className="home_banner_title animate-slide-up-1">
                  {t(slide.titleEn, slide.titleVi)}
                </h1>
                
                <p suppressHydrationWarning className="home_banner_subtitle animate-slide-up-2">
                  {t(slide.subtitleEn, slide.subtitleVi)}
                </p>
                
                <div className="animate-slide-up-3">
                  <Link 
                    suppressHydrationWarning
                    href={slide.link} 
                    className="banner__button"
                  >
                    {t("SHOP NOW", "Mua Ngay")}
                  </Link>
                </div>
              </div>

            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeBanner;
