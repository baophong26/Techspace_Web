import React from "react";
import { t, formatPrice, translateProductTitle } from "../../utils/translate";

function CartItem({ items, handleClick }) {
  return (
    <div style={{ marginTop: 20 }}>
      {items !== undefined &&
        items !== null &&
        Object.keys(items).map((id) => {
          const itemData = items[id].item;
          
          let imgSrc = itemData.imagePath;
          if (imgSrc && !imgSrc.startsWith("http")) {
            imgSrc = `/bp-techspace/images/products/${imgSrc.split('/').pop()}`;
          }

          return (
            <div 
              className="row align-items-center" 
              data-aos="fade-up" 
              key={id} 
              style={{ 
                borderBottom: '1px solid #2A2F3A', 
                padding: '20px 0',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                marginBottom: '15px'
              }}
            >
              {/* Image Column */}
              <div className="col-4 col-md-2 text-center">
                <img
                  src={imgSrc || "/assets/images/placeholder.jpg"}
                  alt={itemData.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '100px', objectFit: 'contain' }}
                />
              </div>

              {/* Info Column */}
              <div className="col-8 col-md-4">
                <h5 style={{ color: '#fff', marginBottom: '8px', fontSize: '18px', fontWeight: '600' }}>
                  {translateProductTitle(itemData.title)}
                </h5>
                <p style={{ color: '#888', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>
                  {itemData.description 
                    ? (itemData.description.length > 80 ? itemData.description.substring(0, 80) + '...' : itemData.description) 
                    : t("No description available", "Chưa có mô tả cho sản phẩm này.")}
                </p>
              </div>

              {/* Price Column */}
              <div className="col-4 col-md-2 text-md-center mt-3 mt-md-0">
                <span style={{ color: '#00FFFF', fontWeight: 'bold', fontSize: '16px' }}>
                  {formatPrice(itemData.price)}
                </span>
                <span className="text-muted d-md-none ml-2">x</span>
              </div>

              {/* Quantity Control Column */}
              <div className="col-4 col-md-2 text-md-center mt-3 mt-md-0 d-flex justify-content-md-center align-items-center">
                <div style={{ display: 'flex', alignItems: 'center', background: '#0D0F13', border: '1px solid #2A2F3A', borderRadius: '4px', padding: '4px 8px' }}>
                  <button 
                    type="button"
                    style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0 5px' }}
                    onClick={() => handleClick(id, false, true)}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <span style={{ color: '#fff', width: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                    {items[id].qty}
                  </span>
                  <button 
                    type="button"
                    style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0 5px' }}
                    onClick={() => handleClick(id, true, false)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>

              {/* Remove Action Column */}
              <div className="col-4 col-md-2 text-right text-md-center mt-3 mt-md-0">
                <button
                  type="button"
                  onClick={() => handleClick(id, false, true, true)}
                  style={{ 
                    borderRadius: '6px', 
                    padding: '8px 16px', 
                    color: '#FE4C50', 
                    border: '1px solid #FE4C50', 
                    background: 'transparent',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}
                  title="Xóa"
                >
                  <i className="fa fa-trash" style={{ fontSize: '14px' }}></i> Xóa
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default CartItem;
