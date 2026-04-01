/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { t } from "../../utils/translate";

class Advertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;
    return (
      <div className="deal_ofthe_week">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="deal_ofthe_week_img position-relative">
                <img src="/bp-techspace/images/products/macbook-transparent.png" alt="Siêu phẩm" className="macbook-floating" style={{width: '120%', objectFit: 'contain', zIndex: 10, position: 'relative'}} />
              </div>
            </div>
            <div className="col-lg-6 text-right deal_ofthe_week_col">
              <div
                className="deal_ofthe_week_content d-flex flex-column align-items-center float-right"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <style>{`
                  @keyframes premiumFloat {
                    0% { transform: scale(1.15) translateX(-5%) translateY(0); filter: drop-shadow(0 15px 25px rgba(0,210,255,0.3)); }
                    50% { transform: scale(1.15) translateX(-5%) translateY(-15px); filter: drop-shadow(0 25px 45px rgba(0,210,255,0.6)); }
                    100% { transform: scale(1.15) translateX(-5%) translateY(0); filter: drop-shadow(0 15px 25px rgba(0,210,255,0.3)); }
                  }
                  .deal_ofthe_week {
                    background: radial-gradient(circle at 75% 50%, rgba(0, 255, 255, 0.08) 0%, rgba(26, 26, 26, 1) 60%),
                                linear-gradient(180deg, rgba(0, 255, 255, 0.05) 0%, rgba(26, 26, 26, 1) 15%, rgba(26, 26, 26, 1) 85%, rgba(255, 0, 85, 0.05) 100%) !important;
                    border-top: 1px solid rgba(0, 255, 255, 0.15) !important;
                    border-bottom: 1px solid rgba(255, 0, 85, 0.15) !important;
                    position: relative;
                    overflow: hidden;
                    padding: 90px 0 !important;
                    box-shadow: inset 0 20px 50px rgba(0, 0, 0, 0.5);
                  }
                  .deal_ofthe_week::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0, 255, 255, 0.02) 4px, rgba(0, 255, 255, 0.02) 5px);
                    pointer-events: none;
                    z-index: 1;
                  }
                  .deal_ofthe_week .container {
                    position: relative;
                    z-index: 2;
                  }
                  .macbook-floating {
                    animation: premiumFloat 5s ease-in-out infinite;
                  }
                  .deal-title-animated {
                    font-family: 'Montserrat', sans-serif !important;
                    font-weight: 800 !important;
                    display: inline-block;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin: 20px 0;
                    background: linear-gradient(to right, #00ffff, #ff0055);
                    -webkit-background-clip: text;
                    color: transparent;
                    text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
                  }
                  
                  .timer {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin: 30px 0;
                  }
                  .timer li {
                    background: rgba(15, 15, 15, 0.8) !important;
                    backdrop-filter: blur(10px) !important;
                    border: 1px solid rgba(0, 210, 255, 0.3) !important;
                    border-radius: 50% !important;
                    width: 90px !important;
                    height: 90px !important;
                    margin: 0 !important;
                    box-shadow: 0 0 20px rgba(0, 210, 255, 0.15), inset 0 0 15px rgba(0, 210, 255, 0.1) !important;
                    transition: all 0.4s ease !important;
                  }
                  .timer li:hover {
                    box-shadow: 0 0 35px rgba(0, 210, 255, 0.5), inset 0 0 25px rgba(0, 210, 255, 0.3) !important;
                    transform: translateY(-8px) scale(1.05) !important;
                    border-color: rgba(0, 210, 255, 0.8) !important;
                  }
                  .timer_num {
                    font-family: 'Montserrat', sans-serif !important;
                    font-size: 34px !important;
                    font-weight: 800 !important;
                    color: #00FFFF !important;
                    text-shadow: 0 0 12px rgba(0, 255, 255, 0.6) !important;
                    line-height: 1 !important;
                  }
                  .timer_unit {
                    font-size: 13px !important;
                    color: #e0e0e0 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 1px !important;
                    margin-top: 5px !important;
                    font-weight: 600 !important;
                  }
                  
                  .red_button.deal_ofthe_week_button {
                    background: linear-gradient(135deg, #FF4D4F, #FF0055) !important;
                    border: none !important;
                    box-shadow: 0 8px 25px rgba(255, 77, 79, 0.5) !important;
                    border-radius: 40px !important;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
                    margin-top: 15px !important;
                  }
                  .red_button.deal_ofthe_week_button:hover {
                    box-shadow: 0 12px 35px rgba(255, 77, 79, 0.8) !important;
                    transform: translateY(-4px) scale(1.05) !important;
                  }
                  .red_button.deal_ofthe_week_button a {
                    color: #fff !important;
                    font-family: 'Montserrat', sans-serif !important;
                    font-weight: 700 !important;
                    letter-spacing: 2px !important;
                  }
                `}</style>
                <div className="section_title" style={{ paddingBottom: '30px' }}>
                  <h2 className="deal-title-animated">{t("Deal Of The Week", "Siêu Phẩm Trong Tuần")}</h2>
                </div>
                <ul className="timer">
                  <li className="d-inline-flex flex-column justify-content-center align-items-center">
                    <div id="day" className="timer_num">
                      {this.addLeadingZeros(countDown.days)}{" "}
                    </div>
                    <div className="timer_unit">
                      {t("Day", "Ngày")}
                    </div>
                  </li>
                  <li className="d-inline-flex flex-column justify-content-center align-items-center">
                    <div id="hour" className="timer_num">
                      {this.addLeadingZeros(countDown.hours)}
                    </div>
                    <div className="timer_unit">
                      {t("Hours", "Giờ")}
                    </div>
                  </li>
                  <li className="d-inline-flex flex-column justify-content-center align-items-center">
                    <div id="minute" className="timer_num">
                      {this.addLeadingZeros(countDown.min)}
                    </div>
                    <div className="timer_unit">
                      {t("Mins", "Phút")}
                    </div>
                  </li>
                  <li className="d-inline-flex flex-column justify-content-center align-items-center">
                    <div id="second" className="timer_num">
                      {this.addLeadingZeros(countDown.sec)}
                    </div>
                    <div className="timer_unit">
                      {t("Sec", "Giây")}
                    </div>
                  </li>
                </ul>
                <div className="red_button deal_ofthe_week_button">
                  <Link href={`/single-product/69cd4ad9de9aee4104ee811f`}>{t("shop now", "MUA NGAY")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Advertisement.propTypes = {
  date: PropTypes.string.isRequired
};

Advertisement.defaultProps = {
  date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toString()
};

export default Advertisement;
