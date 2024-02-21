import styles from "./style.module.css";

interface IStartScreen {
  handleStartNavigate: () => void;
}

export default function StartGame({ handleStartNavigate }: IStartScreen) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Welcome to React Quiz Game!</div>
      <button className={styles.startBtn} onClick={handleStartNavigate}>
        Start
      </button>
    </div>
  );
}
