import { Question } from "@/data/questions";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-accent">
            {question.category}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="p-8 mb-8 border-border/50 bg-card/50 backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
          {question.question}
        </h2>
      </Card>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <Card
            key={index}
            className={cn(
              "p-6 cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.02] border-2",
              selectedAnswer === index
                ? "border-primary bg-gradient-primary text-primary-foreground glow-primary"
                : "border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:bg-card-hover"
            )}
            onClick={() => onAnswerSelect(index)}
          >
            <div className="flex items-center space-x-4">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-sm",
                  selectedAnswer === index
                    ? "border-primary-foreground bg-primary-foreground text-primary"
                    : "border-muted-foreground text-muted-foreground"
                )}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-lg font-medium">{option}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};