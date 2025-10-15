import './App.css';
import CounterComponent from './Components/CounterComponent';
import FormComponent from './Components/FormComponent';
import LightSwitch from './Components/LightSwitch';
import LoginForm2 from './Components/LoginForm2';
import SearchItem from './Components/SearchItem';
import RegisterFormObject from './Components/RegisterFormObject';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>React Components</h1>
      
      <CounterComponent />
      <LightSwitch />
      <FormComponent />
      <LoginForm2 />
      <SearchItem />
      
      {/* Exercise 7: Register Form with Object State */}
      <RegisterFormObject />
    </div>
  );
}

export default App;
