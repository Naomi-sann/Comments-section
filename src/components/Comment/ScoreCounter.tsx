import { useReducer } from "react";
import styles from "./comment.module.css";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";

const getInitialState = (score: number) => ({
  score,
});

interface ScoreState {
  score: number;
}

interface ScoreActions {
  type: "increment" | "decrement";
  payload?: number;
}

const scoreReducer = (state: ScoreState, action: ScoreActions) => {
  switch (action.type) {
    case "increment": {
      return { score: state.score + 1 };
    }
    case "decrement": {
      return {
        score: state.score - 1,
      };
    }
    default:
      return state;
  }
};

const ScoreCounter = (props: { score: number }) => {
  const [score, dispatch] = useReducer(
    scoreReducer,
    getInitialState(props.score)
  );

  return (
    <div className={styles.score_counter}>
      <button onClick={() => dispatch({ type: "increment" })}>
        <HiPlus />
      </button>
      <h3>{score.score}</h3>
      <button onClick={() => dispatch({ type: "decrement" })}>
        <HiOutlineMinus />
      </button>
    </div>
  );
};

export default ScoreCounter;
