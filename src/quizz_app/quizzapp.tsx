import { useState } from "react";
import InGame from "../ingame-screen/ingame";
import StartGame from "../startgame-screen/startgame";
import Result from "../result-screen/result";
import Review from "../review-screen/review";

interface IAnswer {
  answer_content: string;
  correct: boolean;
  selected: boolean;
}

interface IQuestion {
  question_content: string;
  answers: Array<IAnswer>;
}

export default function Quizzapp() {
  const [screen, setScreen] = useState<string>("start");
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Array<IQuestion>>([]);

  return (
    <div>
      {screen === "start" ? (
        <StartGame handleStartNavigate={() => setScreen("ingame")} />
      ) : (
        ""
      )}
      {screen === "ingame" ? (
        <InGame
          handleIngameNavigate={(score, questions) => {
            setQuestions(questions);
            setScore(score);
            setScreen("result");
          }}
        />
      ) : (
        ""
      )}
      {screen === "result" ? (
        <Result
          score={score}
          handleResultToStart={() => setScreen("start")}
          handleResultToReview={() => setScreen("review")}
        />
      ) : (
        ""
      )}
      {screen === "review" ? (
        <Review
          usedQuestions={questions}
          handleReviewNavigate={() => setScreen("start")}
        />
      ) : (
        ""
      )}
    </div>
  );
}
