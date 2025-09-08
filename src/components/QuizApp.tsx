import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { ResultsScreen } from "./ResultsScreen";
import { quizQuestions } from "@/data/questions";
import { Send, Brain } from "lucide-react";

export const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const allQuestionsAnswered = userAnswers.every(answer => answer !== null);

  const handleAnswerSelect = (answer: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quizQuestions.length).fill(null));
    setShowResults(false);
  };

  if (showResults) {
    return (
      <ResultsScreen
        questions={quizQuestions}
        userAnswers={userAnswers}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Brain className="w-12 h-12 text-primary mr-3 animate-pulse-glow" />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
            QuizMaster
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Test your knowledge with our fun interactive quiz!
        </p>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={userAnswers[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={quizQuestions.length}
      />

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="outline"
          className="w-full sm:w-auto border-border/50 hover:border-primary/50 hover:bg-card-hover"
        >
          Previous
        </Button>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{userAnswers.filter(answer => answer !== null).length} of {quizQuestions.length} answered</span>
        </div>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            size="lg"
            className="w-full sm:w-auto bg-gradient-success hover:glow-success transition-all duration-300"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={userAnswers[currentQuestionIndex] === null}
            className="w-full sm:w-auto bg-gradient-primary hover:glow-primary transition-all duration-300"
          >
            Next Question
          </Button>
        )}
      </div>

      {/* Question Overview */}
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {quizQuestions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-10 h-10 rounded-full border-2 font-bold text-sm transition-all duration-300 ${
              index === currentQuestionIndex
                ? "border-primary bg-gradient-primary text-primary-foreground glow-primary"
                : userAnswers[index] !== null
                ? "border-success bg-gradient-success text-success-foreground"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};