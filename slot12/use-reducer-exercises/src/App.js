import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import ToggleComponent from './components/ToggleComponent';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div>
      <h1>useReducer Exercises</h1>
      <CounterComponent />
      <hr />
      <ToggleComponent />
      <hr />
      <QuestionBank />
    </div>
  );
}

export default App;
