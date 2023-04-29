import "./App.css";
import type { Comment } from "./data/data";
import CommentComponent from "./components/Comment/Comment";
import useFetchComments from "./hooks/useComments";

function MainContainer(): JSX.Element {
  const comments: Comment[] = useFetchComments();

  const renderComments = () =>
    comments.map((comment: Comment) => (
      <CommentComponent key={comment.id} commentObj={comment} />
    )) ?? <></>;

  return <div id="container">{renderComments()}</div>;
}

function App() {
  return <MainContainer />;
}

export default App;
