import { useEffect, useState } from "react";
import styles from "./style.module.css";
import data from "../data/questions.json";

interface IAnswer {
  answer_content: string;
  correct: boolean;
  selected: boolean;
}

interface IQuestion {
  question_content: string;
  answers: Array<IAnswer>;
}

export default function InGame({
  handleIngameNavigate,
}: {
  handleIngameNavigate: (score: number, questions: Array<IQuestion>) => void;
}) {
  const [questions, setQuestions] = useState<Array<IQuestion>>(
    JSON.parse(JSON.stringify(data))
  );
  const [answers, setAnswers] = useState<Array<IAnswer>>([]);

  const [num, setNum] = useState<number>(0);

  const [time, setTime] = useState<number>(90);

  const handleTime = (time: number) => {
    if (time === 0) {
      handleIngameNavigate(
        Math.floor((finalMark / questions.length) * 100),
        questions
      );
      return "End!";
    }
    if (time > 60) {
      let minute = Math.floor(time / 60);
      let second = time - minute * 60;
      if (second < 10) {
        return minute + ":0" + second;
      }
      return minute + ":" + second;
    } else {
      if (time < 10) {
        return "00:0" + time;
      }
      return "00:" + time;
    }
  };

  let finalMark = 0;
  const handleFinalMark = () => {
    questions.map((question) => {
      question.answers.map((answer) => {
        if (answer.selected === true && answer.correct === true) {
          finalMark = finalMark + 1;
        }
        return null;
      });
    });
  };

  const onSubmit = () => {
    handleFinalMark();
    handleIngameNavigate(
      Math.floor((finalMark / questions.length) * 100),
      questions
    );
    console.log(questions);
  };

  const handleToggleAnswer = (answer: IAnswer) => {
    const index = answers.indexOf(answer);
    const newAnswerList = answers.map((v, i) => {
      if (index === i) {
        v.selected = true;
      } else {
        v.selected = false;
      }
      return v;
    });
    setAnswers(newAnswerList);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
      if (time === 0) {
        setTime(0);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    setAnswers(questions[num].answers);
  }, [num]);

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
            num === questions.length - 1 ? styles.nextLastBtn : styles.nextBtn
          }
          onClick={() => {
            if (num === questions.length - 1) {
              setNum(questions.length - 1);
            } else setNum(num + 1);
          }}
        >
          Next
        </div>
        <div
          className={
            num === questions.length - 1 ? styles.orangeBtn : styles.hideBtn
          }
          onClick={onSubmit}
        >
          Submit
        </div>
      </div>

      <div className={styles.questionContainer}>
        <div
          className={styles.timer}
          style={{
            background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#4f46e5 ${Math.floor(
              (time / 90) * 100
            )}%, white 0)`,
          }}
        >
          {handleTime(time)}
        </div>
        <div className={styles.number}>
          Question <span>{num + 1}</span>/5
        </div>
        <div className={styles.question}>{questions[num].question_content}</div>
      </div>

      <div className={styles.answerContainer}>
        {questions[num].answers.map((answer, i) => (
          <Answer
            key={i}
            item={answer}
            index={i + 1}
            handleToggleAnswer={handleToggleAnswer}
          />
        ))}
      </div>
    </div>
  );
}

interface IAnswerProps {
  item: IAnswer;
  index: number;
  handleToggleAnswer: (item: IAnswer) => void;
}

function Answer({ item, index, handleToggleAnswer }: IAnswerProps) {
  const { answer_content, correct, selected } = item;
  return (
    <div
      className={
        selected === false || selected === undefined
          ? styles.answer
          : styles.answerSelected
      }
      onClick={() => {
        handleToggleAnswer(item);
      }}
    >
      {index}) {answer_content}
    </div>
  );
}
