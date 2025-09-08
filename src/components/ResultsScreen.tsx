import { Question } from "@/data/questions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsScreenProps {
  questions: Question[];
  userAnswers: (number | null)[];
  onReset: () => void;
}

export const ResultsScreen = ({ questions, userAnswers, onReset }: ResultsScreenProps) => {
  const correctAnswers = userAnswers.reduce((count, answer, index) => {
    return answer === questions[index].correctAnswer ? count + 1 : count;
  }, 0);

  const percentage = Math.round((correctAnswers / questions.length) * 100);

  const getScoreMessage = () => {
    if (percentage >= 80) return "🎉 Outstanding! You're a quiz master!";
    if (percentage >= 60) return "🌟 Great job! You know your stuff!";
    if (percentage >= 40) return "👍 Not bad! Keep practicing!";
    return "💪 Keep learning! You'll do better next time!";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-gradient-success";
    if (percentage >= 60) return "text-gradient-secondary";
    if (percentage >= 40) return "text-gradient-primary";
    return "text-gradient-accent";
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-bounce-in">
      {/* Score Card */}
      <Card className="p-8 mb-8 text-center border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={getScoreColor()}>Quiz Complete!</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {getScoreMessage()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gradient-primary mb-2">
              {correctAnswers}/{questions.length}
            </div>
            <p className="text-muted-foreground">Correct Answers</p>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gradient-secondary mb-2">
              {percentage}%
            </div>
            <p className="text-muted-foreground">Score</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-4">
            <div
              className="bg-gradient-success h-4 rounded-full animate-progress-fill transition-all duration-1000 ease-out"
              style={{ 
                width: `${percentage}%`,
                '--progress-width': `${percentage}%`
              } as React.CSSProperties}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Your Performance
          </p>
        </div>

        <Button
          onClick={onReset}
          size="lg"
          className="bg-gradient-primary hover:glow-primary transition-all duration-300"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </Button>
      </Card>

      {/* Detailed Results */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gradient-accent">
          Review Your Answers
        </h2>
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          const wasAnswered = userAnswer !== null;

          return (
            <Card
              key={question.id}
              className="p-6 border-border/30 bg-card/30 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-success" />
                  ) : (
                    <XCircle className="w-8 h-8 text-destructive" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    Question {index + 1}: {question.question}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Your answer:
                      </span>
                      <span
                        className={cn(
                          "font-medium",
                          wasAnswered
                            ? isCorrect
                              ? "text-success"
                              : "text-destructive"
                            : "text-muted-foreground"
                        )}
                      >
                        {wasAnswered 
                          ? question.options[userAnswer] 
                          : "Not answered"
                        }
                      </span>
                    </div>
                    
                    {!isCorrect && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Correct answer:
                        </span>
                        <span className="font-medium text-success">
                          {question.options[question.correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};