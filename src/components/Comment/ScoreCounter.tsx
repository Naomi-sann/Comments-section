import styles from "./comment.module.css";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";

const ScoreCounter = ({ score }: { score: number }) => {
  return (
    <div className={styles.score_counter}>
      <button>
        <HiPlus />
      </button>
      <h3>{score}</h3>
      <button>
        <HiOutlineMinus />
      </button>
    </div>
  );
};

export default ScoreCounter;
