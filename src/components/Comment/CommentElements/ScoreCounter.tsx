import { useReducer } from "react";
import styles from "../comment.module.css";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";

const getInitialState = (score: number) => ({
  score,
  username: "",
  scoreType: null,
});

interface ScoreState {
  score: number;
  username: string;
  scoreType: "increase" | "decrease" | null;
}

type Method = "increase" | "decrease";

interface ScoreActions {
  type: "increment" | "decrement";
  payload: {
    username: string;
    scoreType: Method | null;
    amount?: number;
  };
}

const scoreReducer = (state: ScoreState, action: ScoreActions) => {
  const counter = (
    method: Method,
    initialAmount: number,
    countAmount?: number
  ) =>
    method === "increase"
      ? !countAmount
        ? initialAmount + 1
        : initialAmount + countAmount
      : !countAmount
      ? initialAmount - 1
      : initialAmount - countAmount;

  const getScoreState = (method: Method) => {
    if (!state.username) {
      return {
        score: counter(method, state.score, action.payload.amount),
        username: action.payload.username,
        scoreType: action.payload.scoreType,
      };
    }

    return {
      score: counter(
        state.scoreType === "increase" ? "decrease" : "increase",
        state.score,
        action.payload.amount
      ),
      username: "",
      scoreType: null,
    };
  };

  switch (action.type) {
    case "increment": {
      const increaseState = getScoreState("increase");

      return increaseState;
    }
    case "decrement": {
      const increaseState = getScoreState("decrease");

      return increaseState;
    }
    default:
      return state;
  }
};

const ScoreCounter = ({
  scoreProp,
  username,
}: {
  scoreProp: number;
  username: string;
}) => {
  const [score, dispatch] = useReducer(
    scoreReducer,
    getInitialState(scoreProp)
  );

  return (
    <div className={styles.score_counter}>
      <button
        onClick={() =>
          dispatch({
            type: "increment",
            payload: { username, scoreType: "increase" },
          })
        }
        style={{
          background:
            score.scoreType === "increase" ? "rgba(150,150,150,.2)" : "",
        }}
        name="add-score"
      >
        <HiPlus />
      </button>
      <h3>{score.score}</h3>
      <button
        onClick={() =>
          dispatch({
            type: "decrement",
            payload: { username, scoreType: "decrease" },
          })
        }
        style={{
          background:
            score.scoreType === "decrease" ? "rgba(150,150,150,.2)" : "",
        }}
        name="decrease-score"
      >
        <HiOutlineMinus />
      </button>
    </div>
  );
};

export default ScoreCounter;
