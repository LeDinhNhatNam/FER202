import React from 'react';

function Products() {
  const products = [
    { id: 1, name: 'iPhone 15', price: '25,000,000 VNĐ', category: 'Điện thoại' },
    { id: 2, name: 'MacBook Air M2', price: '28,000,000 VNĐ', category: 'Laptop' },
    { id: 3, name: 'iPad Pro', price: '22,000,000 VNĐ', category: 'Tablet' },
    { id: 4, name: 'AirPods Pro', price: '6,000,000 VNĐ', category: 'Phụ kiện' },
    { id: 5, name: 'Apple Watch', price: '8,000,000 VNĐ', category: 'Đồng hồ thông minh' },
  ];

  return (
    <div className="page">
      <h1>📱 Sản Phẩm</h1>
      <p>Khám phá danh sách sản phẩm của chúng tôi</p>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">{product.price}</p>
            <button className="btn-primary">Xem Chi Tiết</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;