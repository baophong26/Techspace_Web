/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from "react";

function Benefit(params) {
  return (
    <div className="benefit" data-aos="fade-up">
      <div className="container">
        <div className="row benefit_row">
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <i className="fa fa-truck" aria-hidden="true"></i>
              </div>
              <div className="benefit_content">
                <h6>Giao hàng miễn phí</h6>
                <p>Nhanh chóng & phủ sóng toàn quốc</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <i className="far fa-money-bill-alt"></i>
              </div>
              <div className="benefit_content">
                <h6>Thanh toán tận nơi</h6>
                <p>Kiểm tra hàng kĩ càng trước khi trả tiền</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <i className="fa fa-undo" aria-hidden="true"></i>
              </div>
              <div className="benefit_content">
                <h6>Đổi trả 45 ngày</h6>
                <p>Cam kết hoàn tiền nhanh gọn 100%</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <i className="far fa-clock"></i>
              </div>
              <div className="benefit_content">
                <h6>Mở cửa cả tuần</h6>
                <p>Từ 8:00 Sáng - 10:00 Tối</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefit;
