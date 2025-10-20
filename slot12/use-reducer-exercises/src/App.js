import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import ToggleComponent from './components/ToggleComponent';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div>
      <h1>useReducer Exercises</h1>
      <CounterComponent />
      <hr />
      <ToggleComponent />
      <hr />
      <LoginForm />
      <hr />
      <SignUpForm />
      <hr />
      <QuestionBank />
    </div>
  );
}

export default App;
