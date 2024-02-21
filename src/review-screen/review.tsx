import { useState } from "react";
import styles from "./style.module.css";

interface IAnswer {
  answer_content: string;
  correct: boolean;
  selected: boolean;
}

interface IQuestion {
  question_content: string;
  answers: Array<IAnswer>;
}

export default function Review({
  handleReviewNavigate,
  usedQuestions,
}: {
  handleReviewNavigate: () => void;
  usedQuestions: Array<IQuestion>;
}) {
  const [num, setNum] = useState<number>(0);

  const onSubmit = () => {
    handleReviewNavigate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <div
          className={num === 0 ? styles.prevFirstBtn : styles.prevBtn}
          onClick={() => {
            if (num === 0) {
              setNum(num);
            } else setNum(num - 1);
          }}
        >
          Previous
        </div>
        <div
          className={
            num === usedQuestions.length - 1
              ? styles.nextLastBtn
              : styles.nextBtn
          }
          onClick={() => {
            if (num === usedQuestions.length - 1) {
              setNum(usedQuestions.length - 1);
            } else setNum(num + 1);
          }}
        >
          Next
        </div>
        <div className={styles.orangeBtn} onClick={onSubmit}>
          Restart
        </div>
      </div>

      <div className={styles.questionContainer}>
        <div
          className={styles.timer}
          style={{
            background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#4f46e5 0%, white 0)`,
          }}
        >
          End!
        </div>
        <div className={styles.number}>
          Question <span>{num + 1}</span>/5
        </div>
        <div className={styles.question}>
          {usedQuestions[num].question_content}
        </div>
      </div>

      <div className={styles.answerContainer}>
        {usedQuestions[num].answers.map((answer, i) => (
          <Answer key={i} item={answer} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

interface IAnswerProps {
  item: IAnswer;
  index: number;
}

function Answer({ item, index }: IAnswerProps) {
  const answerAccuracy = () => {
    if (item.selected === true && item.correct === true) {
      return styles.answerCorrect;
    } else if (item.selected === true && item.correct === false) {
      return styles.answerWrong;
    } else if (item.correct === true) {
      return styles.answerCorrect;
    }
    return styles.answer;
  };
  return (
    <div className={answerAccuracy()}>
      {index}) {item.answer_content}
    </div>
  );
}
