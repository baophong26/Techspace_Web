import React, { Component } from "react";
import Heading from "../../components/Heading";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert("Tin nhắn của bạn đã được gửi thành công đến hệ thống!");
    this.setState({ name: "", email: "", message: "" });
  };

  render() {
    return (
      <div className="contact_container" style={{ padding: '80px 0', minHeight: '80vh', position: 'relative', overflow: 'hidden' }}>
        {/* Cyberpunk background grid overlay */}
        <div className="cyber-grid-bg" style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0, 255, 255, 0.05) 40px, rgba(0, 255, 255, 0.05) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0, 255, 255, 0.05) 40px, rgba(0, 255, 255, 0.05) 41px)',
          zIndex: 0, opacity: 0.5, pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row mb-5">
            <Heading title="LIÊN HỆ VỚI CHÚNG TÔI" />
          </div>

          <div className="row">
            {/* Contact Info Side */}
            <div className="col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
              <div className="contact_info_box p-5 h-100 position-relative" style={{
                background: 'rgba(15, 15, 15, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)'
              }}>
                <div className="cyber-glow-corner" style={{ position: 'absolute', top: '-2px', left: '-2px', width: '30px', height: '30px', borderTop: '3px solid #00FFFF', borderLeft: '3px solid #00FFFF' }}></div>
                <div className="cyber-glow-corner" style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '30px', height: '30px', borderBottom: '3px solid #FF0055', borderRight: '3px solid #FF0055' }}></div>
                
                <h3 style={{ color: '#00FFFF', fontWeight: '800', marginBottom: '30px', letterSpacing: '1px' }}>
                  BP TECHSPACE
                </h3>
                
                <div className="contact_item d-flex align-items-center mb-4">
                  <div className="icon_wrapper" style={{ 
                    width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0, 255, 255, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px',
                    border: '1px solid #00FFFF', boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
                  }}>
                    <i className="fa fa-map-marker" style={{ color: '#00FFFF', fontSize: '20px' }}></i>
                  </div>
                  <div>
                    <h5 style={{ color: '#fff', margin: 0, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Địa Chỉ</h5>
                    <p style={{ color: '#aaa', margin: 0, fontSize: '16px' }}>Tòa nhà Tech, Quận 1, TP HCM</p>
                  </div>
                </div>

                <div className="contact_item d-flex align-items-center mb-4">
                  <div className="icon_wrapper" style={{ 
                    width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0, 255, 255, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px',
                    border: '1px solid #00FFFF', boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
                  }}>
                    <i className="fa fa-phone" style={{ color: '#00FFFF', fontSize: '20px' }}></i>
                  </div>
                  <div>
                    <h5 style={{ color: '#fff', margin: 0, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Điện Thoại</h5>
                    <p style={{ color: '#aaa', margin: 0, fontSize: '16px' }}>+84 (0) 123 456 789</p>
                  </div>
                </div>

                <div className="contact_item d-flex align-items-center mb-4">
                  <div className="icon_wrapper" style={{ 
                    width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 0, 85, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px',
                    border: '1px solid #FF0055', boxShadow: '0 0 15px rgba(255, 0, 85, 0.3)'
                  }}>
                    <i className="fa fa-envelope" style={{ color: '#FF0055', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h5 style={{ color: '#fff', margin: 0, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</h5>
                    <p style={{ color: '#aaa', margin: 0, fontSize: '16px' }}>support@bptechspace.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="contact_form_box p-5 h-100 position-relative" style={{
                background: 'rgba(20, 20, 20, 0.9)',
                backdropFilter: 'blur(15px)',
                borderRadius: '15px',
                border: '1px solid rgba(255, 0, 85, 0.3)',
                boxShadow: '0 0 40px rgba(255, 0, 85, 0.15)'
              }}>
                <h3 style={{ color: '#FF0055', fontWeight: '800', marginBottom: '30px', letterSpacing: '1px' }}>
                  GỬI LỜI NHẮN
                </h3>
                
                <form id="contact_form" onSubmit={this.handleSubmit}>
                  <div className="form-group mb-4">
                    <input 
                      type="text" 
                      className="form-control cyber_input" 
                      name="name"
                      placeholder="Tên của bạn *" 
                      required="required" 
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input 
                      type="email" 
                      className="form-control cyber_input" 
                      name="email"
                      placeholder="Email liên hệ *" 
                      required="required" 
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <textarea 
                      className="form-control cyber_input" 
                      name="message"
                      rows="5" 
                      placeholder="Lời nhắn của bạn *" 
                      required="required"
                      value={this.state.message}
                      onChange={this.handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn cyber_submit_btn mt-3 w-100">
                    GỬI NGAY <i className="fa fa-paper-plane ml-2"></i>
                  </button>
                </form>

                <style>{`
                  .cyber_input {
                    background: rgba(10, 10, 10, 0.8) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    color: #fff !important;
                    padding: 15px 20px !important;
                    height: auto !important;
                    border-radius: 8px !important;
                    font-size: 16px !important;
                    transition: all 0.3s ease !important;
                  }
                  .cyber_input:focus {
                    background: rgba(0, 0, 0, 1) !important;
                    border-color: #00FFFF !important;
                    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3) !important;
                    outline: none !important;
                  }
                  .cyber_input::placeholder {
                    color: #666 !important;
                  }
                  .cyber_submit_btn {
                    background: linear-gradient(135deg, #FF0055, #D10046) !important;
                    color: #fff !important;
                    font-family: 'Montserrat', sans-serif !important;
                    font-weight: 800 !important;
                    font-size: 16px !important;
                    padding: 18px 0 !important;
                    border: none !important;
                    border-radius: 8px !important;
                    letter-spacing: 2px !important;
                    transition: all 0.3s ease !important;
                    box-shadow: 0 5px 20px rgba(255, 0, 85, 0.4) !important;
                    text-transform: uppercase !important;
                  }
                  .cyber_submit_btn:hover {
                    transform: translateY(-3px) scale(1.02) !important;
                    box-shadow: 0 10px 30px rgba(255, 0, 85, 0.7) !important;
                    color: #fff !important;
                  }
                `}</style>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
