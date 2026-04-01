/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import SingleProduct from "./SingleProduct";
import Heading from "../Heading";
import { t } from "../../utils/translate";
import PropTypes from "prop-types";
class NewArrivals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "All",
      itemWidth: 280
    };
    this.trackRef = React.createRef();
    this.viewportRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(this.updateDimensions, 100);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    if (this.viewportRef.current) {
        const width = this.viewportRef.current.offsetWidth;
        let cols = 4;
        if (width < 576) cols = 1;
        else if (width < 991) cols = 2;
        else if (width < 1200) cols = 3;
        
        // Exact pixel width considering gap: 20px
        const itemWidth = (width - ((cols - 1) * 20)) / cols;
        this.setState({ itemWidth });
    }
  }

  getFilteredProps = () => {
    let displayProducts = this.props.products ? [...this.props.products].sort((a,b) => b.date - a.date) : [];
    if (this.state.selectedOption !== "All") {
        displayProducts = displayProducts.filter(item => item.department === this.state.selectedOption);
    }
    // Critical Fix: Limit the output to 12 items to avoid massive React node rendering freezes
    return displayProducts.slice(0, 12);
  }

  scrollLeft = () => {
    const track = this.trackRef.current;
    if (track) {
      if (track.scrollLeft <= 50) {
         // Quietly jump to middle of replicated array to simulate infinity
         const SetWidth = this.getFilteredProps().length * (this.state.itemWidth + 20);
         track.style.scrollBehavior = 'auto'; // Disable smooth locally
         track.scrollLeft += SetWidth;
         // Enqueue next frame for smooth scroll
         requestAnimationFrame(() => {
             track.style.scrollBehavior = 'smooth';
             track.scrollBy({ left: -(this.state.itemWidth + 20), behavior: 'smooth' });
         });
      } else {
         track.scrollTo({ left: track.scrollLeft - (this.state.itemWidth + 20), behavior: 'smooth' });
      }
    }
  };

  scrollRight = () => {
    const track = this.trackRef.current;
    if (track) {
      const SetWidth = this.getFilteredProps().length * (this.state.itemWidth + 20);
      if (track.scrollLeft >= SetWidth * 2) {
         // Quiet jump back to first set
         track.style.scrollBehavior = 'auto';
         track.scrollLeft -= SetWidth;
         requestAnimationFrame(() => {
             track.style.scrollBehavior = 'smooth';
             track.scrollBy({ left: (this.state.itemWidth + 20), behavior: 'smooth' });
         });
      } else {
         track.scrollTo({ left: track.scrollLeft + (this.state.itemWidth + 20), behavior: 'smooth' });
      }
    }
  };

  optionClicked(option) {
    this.setState({ selectedOption: option }, () => {
        // Sync DOM changes perfectly with the browser's hardware refresh rate
        requestAnimationFrame(() => {
            if (this.trackRef.current) {
                const track = this.trackRef.current;
                track.style.scrollBehavior = 'auto';
                const SetWidth = this.getFilteredProps().length * (this.state.itemWidth + 20);
                track.scrollLeft = SetWidth;
                
                // Re-enable smooth behavior strictly on the next frame after layout is calc'd
                requestAnimationFrame(() => {
                    track.style.scrollBehavior = 'smooth';
                });
            }
        });
    });
  }

  render() {
    const { products } = this.props;
    const { selectedOption } = this.state;
    
    // Sort by date for New Arrivals
    let displayProducts = products ? [...products].sort((a,b) => b.date - a.date) : [];
    
    if (selectedOption !== "All") {
        displayProducts = displayProducts.filter(item => item.department === selectedOption);
    }

    return (
      <div className="new_arrivals" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <Heading title={t('New Arrivals', 'Hàng Mới Về')} data-aos="fade-up" />
          </div>
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col text-center">
              <div className="new_arrivals_sorting">
                <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                  <li
                    onClick={() => this.optionClicked("All")}
                    className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                      this.state.selectedOption === "All"
                        ? "active is-checked"
                        : null
                    }`}
                  >
                    {t('all', 'Tất cả')}
                  </li>
                  <li
                    className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                      this.state.selectedOption === "Laptops"
                        ? "active is-checked"
                        : null
                    }`}
                    onClick={() => this.optionClicked("Laptops")}
                  >
                    {t("laptops", "Laptop")}
                  </li>

                  <li
                    className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                      this.state.selectedOption === "Phones"
                        ? "active is-checked"
                        : null
                    }`}
                    onClick={() => this.optionClicked("Phones")}
                  >
                    {t("smartphones", "Điện Thoại")}
                  </li>
                  <li
                    className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                      this.state.selectedOption === "Audio"
                        ? "active is-checked"
                        : null
                    }`}
                    onClick={() => this.optionClicked("Audio")}
                  >
                    {t("audio & wearables", "Âm thanh & Phụ Kiện")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 position-relative" style={{ padding: '0 60px' }}>
              <button className="slider-btn prev-btn" onClick={this.scrollLeft}>
                <i className="fa fa-chevron-left"></i>
              </button>
              
              <div 
                className="product-slider-viewport"
                ref={this.viewportRef}
                style={{ overflow: 'hidden', padding: '15px 5px', width: '100%' }}
              >
                <div 
                  className="product-slider-track" 
                  ref={this.trackRef}
                >
                  {(() => {
                    const displayProducts = this.getFilteredProps();
                    if (!displayProducts || displayProducts.length === 0) return null;
                    
                    const itemStyle = {
                       flex: `0 0 ${this.state.itemWidth}px`,
                       width: `${this.state.itemWidth}px`,
                       scrollSnapAlign: 'start'
                    };

                    // Render statically if <= 4 items
                    if (displayProducts.length <= 4) {
                        return displayProducts.map((item, index) => (
                           <div className="slider-item" style={itemStyle} key={index}>
                             <SingleProduct productItem={item} addToBag={this.props.addToBag} />
                           </div>
                        ));
                    }
                    
                    // Render 4 sets of array dynamically for simple native infinite looping
                    const itemsToRender = [];
                    for(let loop = 0; loop < 4; loop++) {
                        displayProducts.forEach((product, idx) => {
                            itemsToRender.push(
                              <div className="slider-item" style={itemStyle} key={`${loop}-${product._id || idx}`}>
                                <SingleProduct productItem={product} addToBag={this.props.addToBag} />
                              </div>
                            );
                        });
                    }
                    return itemsToRender;
                  })()}
                </div>
              </div>

              <button className="slider-btn next-btn" onClick={this.scrollRight}>
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewArrivals.propTypes = {
  addToCart: PropTypes.func
};

export default NewArrivals;
