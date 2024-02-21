import styles from "./style.module.css";

interface handleResultNavigate {
  handleResultToStart: () => void;
  handleResultToReview: () => void;
  score: number;
}

export default function Result({
  handleResultToStart,
  handleResultToReview,
  score,
}: handleResultNavigate) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Your score is: <span>{score}%</span>
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.redoBtn} onClick={handleResultToStart}>
          Try again
        </div>
        <div className={styles.reviewBtn} onClick={handleResultToReview}>
          Review
        </div>
      </div>
    </div>
  );
}
