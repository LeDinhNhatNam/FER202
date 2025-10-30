import React from 'react';

function Home() {
  return (
    <div className="page">
      <h1>🏠 Trang Chủ</h1>
      <p>Chào mừng bạn đến với trang chủ của chúng tôi!</p>
      <div className="content">
        <h2>Giới thiệu</h2>
        <p>
          Đây là ứng dụng demo về React Router. Bạn có thể điều hướng giữa các trang 
          khác nhau bằng cách sử dụng thanh navigation ở trên.
        </p>
        <h3>Các tính năng chính:</h3>
        <ul>
          <li>Trang chủ với thông tin tổng quan</li>
          <li>Trang sản phẩm hiển thị danh sách sản phẩm</li>
          <li>Trang liên hệ với thông tin liên lạc</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;