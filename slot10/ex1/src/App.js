import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage.jsx';
import FooterPage from './pages/FooterPage.jsx'; // ensure correct import

function App() {
  return (
    <div>
      <HomePage />
      <FooterPage />
    </div>
  );
}

export default App;
