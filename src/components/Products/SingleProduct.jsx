/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { t, formatPrice, translateProductTitle, translateProductDesc } from "../../utils/translate";
import WishlistManager from "../../modules/Wishlist";

function SingleProduct(props) {
  const router = useRouter();
  const { productItem } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(WishlistManager.isInWishlist(productItem._id || productItem.id));
    
    const handleWishlistChange = () => {
      setIsFavorite(WishlistManager.isInWishlist(productItem._id || productItem.id));
    };
    window.addEventListener('wishlistChanged', handleWishlistChange);
    return () => window.removeEventListener('wishlistChanged', handleWishlistChange);
  }, [productItem]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    WishlistManager.toggleItem(productItem);
  };
  
  return (
    <div className="product-item men product-item-animated" data-aos="fade-up" data-aos-duration="600">
      <div
        className="product discount product_filter"
        onClick={() =>
          router.push(`/single-product/${productItem._id}`)
        }
      >
        <div className="product_image" style={{ width: '100%', aspectRatio: '1/1', position: 'relative', backgroundColor: 'transparent' }}>
          <img 
            src={productItem.imagePath.startsWith('http') ? productItem.imagePath : `/bp-techspace/images/products/${productItem.imagePath.split('/').pop()}`} 
            alt={productItem.title} 
            className="product-img-animated"
          />
        </div>
        <div 
          className={`favorite favorite_left ${isFavorite ? 'active' : ''}`} 
          onClick={handleFavoriteClick}
          style={{ cursor: 'pointer', zIndex: 10 }}
        >
          <i className="far fa-heart" style={{ color: isFavorite ? '#fff' : '' }}></i>
        </div>
        {/* <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
          <span>-$20</span>
        </div> */}
        <div className="product_info d-flex flex-column align-items-center justify-content-center">
          <div className="product_name">
            <div
              style={{ padding: '0 10px', transition: 'color 0.3s ease', cursor: 'pointer' }}
              onMouseOver={(e) => e.target.style.color = '#00D2FF'}
              onMouseOut={(e) => e.target.style.color = '#e0e0e0'}
              onClick={() =>
                router.push(`/single-product/${productItem._id}`)
              }
            >
              {translateProductTitle(productItem.title)}
            </div>
          </div>
          <style>{`.force-red-price { color: #FF4D4F !important; }`}</style>
          <div className="product_price force-red-price" style={{ marginTop: "8px", fontSize: "18px", fontWeight: "800", textShadow: "0 0 8px rgba(255, 59, 59, 0.5)" }}>
            {formatPrice(productItem.price)}
          </div>
          <div className="product_rating" style={{ marginTop: "5px", marginBottom: "10px" }}>
            <ul className="star_rating" style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '2px' }}>
              <li><i className="fa fa-star" aria-hidden="true" style={{ color: '#fac451', fontSize: '12px' }}></i></li>
              <li><i className="fa fa-star" aria-hidden="true" style={{ color: '#fac451', fontSize: '12px' }}></i></li>
              <li><i className="fa fa-star" aria-hidden="true" style={{ color: '#fac451', fontSize: '12px' }}></i></li>
              <li><i className="fa fa-star" aria-hidden="true" style={{ color: '#fac451', fontSize: '12px' }}></i></li>
              <li><i className="fa fa-star" aria-hidden="true" style={{ color: '#fac451', fontSize: '12px' }}></i></li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="red_button add_to_cart_button add-to-cart-animated"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/single-product/${productItem._id}`);
        }}
      >
        <div style={{ color: "#ffffff" }}>{t('View Details', 'Xem Chi Tiết')}</div>
      </div>
    </div>
  );
}

export default SingleProduct;
