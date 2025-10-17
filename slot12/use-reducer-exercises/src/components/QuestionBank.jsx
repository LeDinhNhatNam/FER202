import React, { useReducer } from "react";
import { Button, Container, Card } from "react-bootstrap";

// Bước 2: Khởi tạo giá trị ban đầu của state
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
};

// Bước 3: Định nghĩa reducer function (quizReducer)
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION":
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: state.currentQuestion + 1 === state.questions.length, // Hiển thị điểm khi hết câu hỏi
      };

    case "RESTART_QUIZ":
      return {
        ...initialState, // Reset về trạng thái ban đầu
      };

    default:
      return state;
  }
}

// Bước 4: Component chính QuestionBank
function QuestionBank() {
  // Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore } =
    state;

  // Handler functions
  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <Card.Header className="text-center bg-primary text-white mb-4">
          <h2>Quiz Application</h2>
          <p className="mb-0">Test your knowledge with these questions!</p>
        </Card.Header>

        {/* Bước 5: Hiển thị kết quả nếu bài kiểm tra kết thúc */}
        {showScore ? (
          <div className="text-center">
            <h2 className="mb-4">
              🎉 Quiz Completed! 🎉
            </h2>
            <div className="alert alert-success">
              <h3>
                Your Score: {score} / {questions.length}
              </h3>
              <p>
                You got {score} out of {questions.length} questions correct!
                {score === questions.length && " Perfect score! 🌟"}
                {score >= questions.length * 0.7 && score < questions.length && " Great job! 👍"}
                {score < questions.length * 0.7 && " Keep practicing! 📚"}
              </p>
            </div>
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleRestartQuiz}
            >
              🔄 Restart Quiz
            </Button>
          </div>
        ) : (
          /* Hiển thị câu hỏi và các phương án lựa chọn */
          <div>
            {/* Progress indicator */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Progress:</span>
                <span>{currentQuestion + 1} / {questions.length}</span>
              </div>
              <div className="progress">
                <div 
                  className="progress-bar bg-success" 
                  style={{ 
                    width: `${((currentQuestion) / questions.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-4">
              <h4 className="question-title">
                <span className="badge bg-secondary me-2">
                  Question {questions[currentQuestion].id}
                </span>
                <br />
                <span className="mt-2 d-inline-block">
                  {questions[currentQuestion].question}
                </span>
              </h4>
            </div>

            {/* Options */}
            <div className="mt-3 mb-4">
              <h5 className="mb-3">Choose your answer:</h5>
              <div className="row">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <Button
                      variant={
                        selectedOption === option ? "success" : "outline-secondary"
                      }
                      className="w-100 text-start p-3"
                      onClick={() => handleOptionSelect(option)}
                      style={{
                        minHeight: '60px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span className="fw-bold me-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bước 6: Hiển thị nút "Next Question" hoặc "Finish Quiz" */}
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                disabled={!selectedOption}
                onClick={handleNextQuestion}
                className="px-5"
              >
                {currentQuestion === questions.length - 1
                  ? "🏁 Finish Quiz"
                  : "➡️ Next Question"}
              </Button>
              
              {!selectedOption && (
                <div className="mt-2">
                  <small className="text-muted">
                    Please select an answer to continue
                  </small>
                </div>
              )}
            </div>

            {/* Current score display */}
            <div className="mt-4 text-center">
              <small className="text-muted">
                Current Score: <span className="fw-bold">{score}</span> correct answers
              </small>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;