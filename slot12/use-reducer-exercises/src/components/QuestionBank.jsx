import React, { useReducer, useEffect, useState } from "react";
import { Button, Container, Card, Alert, Badge, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

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
  showFeedback: false,
  isCorrect: false,
  timeLeft: 10,
};

// Bước 3: Định nghĩa reducer function (quizReducer)
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      const isCorrect = action.payload === state.questions[state.currentQuestion].answer;
      return { 
        ...state, 
        selectedOption: action.payload,
        showFeedback: true,
        isCorrect: isCorrect
      };

    case "NEXT_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      return {
        ...state,
        score: state.isCorrect ? state.score + 1 : state.score,
        currentQuestion: nextQuestion,
        selectedOption: "",
        showFeedback: false,
        showScore: nextQuestion === state.questions.length,
        timeLeft: 10,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        timeLeft: 10,
      };

    case "TIME_TICK":
      return {
        ...state,
        timeLeft: Math.max(0, state.timeLeft - 1),
      };

    case "TIME_UP":
      const nextQuestionTimeUp = state.currentQuestion + 1;
      return {
        ...state,
        currentQuestion: nextQuestionTimeUp,
        selectedOption: "",
        showFeedback: false,
        showScore: nextQuestionTimeUp === state.questions.length,
        timeLeft: 10,
      };

    default:
      return state;
  }
}

// Bước 4: Component chính QuestionBank
function QuestionBank() {
  // Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, showFeedback, isCorrect, timeLeft } = state;
  
  // State cho high score
  const [highScore, setHighScore] = useState(0);

  // Load high score từ localStorage khi component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (!showScore && !showFeedback && timeLeft > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: "TIME_TICK" });
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      // Tự động chuyển câu khi hết thời gian
      setTimeout(() => {
        dispatch({ type: "TIME_UP" });
      }, 1000);
    }
  }, [timeLeft, showScore, showFeedback]);

  // Lưu high score khi kết thúc quiz
  useEffect(() => {
    if (showScore && score > highScore) {
      setHighScore(score);
      localStorage.setItem('quizHighScore', score.toString());
    }
  }, [showScore, score, highScore]);

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

        {/* Bước 5: Hiển thị kết quả nếi bài kiểm tra kết thúc */}
        {showScore ? (
          <div className="text-center">
            <h2 className="mb-4">
              🎉 Quiz Completed! 🎉
            </h2>
            <div className="alert alert-success">
              <h3>
                Your Score: {score} / {questions.length}
              </h3>
              <div className="mb-3">
                <Badge bg="warning" className="me-2">
                  <FaClock className="me-1" />
                  High Score: {highScore} / {questions.length}
                </Badge>
                {score > highScore && (
                  <Badge bg="success">
                    🏆 New High Score!
                  </Badge>
                )}
              </div>
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
            {/* Timer and Progress */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Progress: {currentQuestion + 1} / {questions.length}</span>
                <div className="d-flex align-items-center">
                  <FaClock className="me-2" />
                  <span className={timeLeft <= 5 ? "text-danger fw-bold" : "text-primary"}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
              <ProgressBar 
                now={((currentQuestion + 1) / questions.length) * 100} 
                variant="success"
                className="mb-2"
              />
              <ProgressBar 
                now={(timeLeft / 10) * 100} 
                variant={timeLeft <= 5 ? "danger" : "info"}
                style={{ height: '8px' }}
              />
            </div>

            {/* Question */}
            <div className="mb-4">
              <h4 className="question-title">
                <Badge bg="secondary" className="me-2">
                  Question {questions[currentQuestion].id}
                </Badge>
                <br />
                <span className="mt-2 d-inline-block">
                  {questions[currentQuestion].question}
                </span>
              </h4>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <Alert variant={isCorrect ? "success" : "danger"} className="mb-4">
                <div className="d-flex align-items-center">
                  {isCorrect ? (
                    <>
                      <FaCheckCircle className="me-2" />
                      <span>Correct! 🎉</span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="me-2" />
                      <span>
                        Incorrect! The correct answer is: <strong>{questions[currentQuestion].answer}</strong>
                      </span>
                    </>
                  )}
                </div>
              </Alert>
            )}

            {/* Options */}
            <div className="mt-3 mb-4">
              <h5 className="mb-3">Choose your answer:</h5>
              <div className="row">
                {questions[currentQuestion].options.map((option, index) => {
                  let variant = "outline-secondary";
                  if (showFeedback) {
                    if (option === questions[currentQuestion].answer) {
                      variant = "success";
                    } else if (option === selectedOption && !isCorrect) {
                      variant = "danger";
                    }
                  } else if (selectedOption === option) {
                    variant = "primary";
                  }
                  
                  return (
                    <div key={index} className="col-md-6 mb-2">
                      <Button
                        variant={variant}
                        className="w-100 text-start p-3"
                        onClick={() => !showFeedback && handleOptionSelect(option)}
                        disabled={showFeedback || timeLeft === 0}
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
                  );
                })}
              </div>
            </div>

            {/* Hiển thị nút "Next Question" hoặc "Finish Quiz" */}
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                disabled={!selectedOption && timeLeft > 0}
                onClick={handleNextQuestion}
                className="px-5"
              >
                {currentQuestion === questions.length - 1
                  ? "🏁 Finish Quiz"
                  : "➡️ Next Question"}
              </Button>
              
              {!selectedOption && timeLeft > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    Please select an answer to continue
                  </small>
                </div>
              )}

              {timeLeft === 0 && (
                <div className="mt-2">
                  <small className="text-danger">
                    ⏰ Time's up! Moving to next question...
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