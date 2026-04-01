/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { Component } from "react";
import SingleProduct from "./SingleProduct";
import Heading from "../Heading";
import { t } from "../../utils/translate";

class BestSeller extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { products } = this.props;
    // Show best sellers (simulate by sorting by lowest quantity remaining)
    let displayProducts = products ? [...products].sort((a,b) => a.quantity - b.quantity) : [];

    return (
      <div className="best_sellers">
        <div className="container">
          <div className="row">
            <Heading title={t('Best Sellers', 'Bán Chạy Nhất')} data-aos="fade-up" />
          </div>

          <div className="row" style={{ marginTop: 50 }}>
            {displayProducts &&
              displayProducts.slice(0, 4).map((item, index) => {
                return (
                  <div
                    className="col-lg-3 col-sm-6"
                    key={index}
                    data-aos="zoom-in"
                  >
                    <SingleProduct
                      productItem={item}
                      addToBag={this.props.addToBag}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default BestSeller;
