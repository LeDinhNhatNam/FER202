import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import các components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
          {/* Route 404 - không tìm thấy trang */}
          <Route path="*" element={
            <div className="page">
              <h1>❌ 404 - Không tìm thấy trang</h1>
              <p>Trang bạn đang tìm kiếm không tồn tại.</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
