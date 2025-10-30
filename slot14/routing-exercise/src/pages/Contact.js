import React from 'react';

function Contact() {
  return (
    <div className="page">
      <h1>📞 Liên Hệ</h1>
      <p>Thông tin liên hệ và địa chỉ của chúng tôi</p>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Thông Tin Liên Hệ</h2>
          <div className="info-item">
            <strong>📍 Địa chỉ:</strong>
            <p>FPT University, Khu Công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội</p>
          </div>
          
          <div className="info-item">
            <strong>📞 Số điện thoại:</strong>
            <p>(024) 7300 1866</p>
          </div>
          
          <div className="info-item">
            <strong>✉️ Email:</strong>
            <p>contact@fpt.edu.vn</p>
          </div>
          
          <div className="info-item">
            <strong>🕒 Giờ làm việc:</strong>
            <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
            <p>Thứ 7: 8:00 - 12:00</p>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Gửi Tin Nhắn</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Họ và tên:</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Tin nhắn:</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className="btn-primary">Gửi Tin Nhắn</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;