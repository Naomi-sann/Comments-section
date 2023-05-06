import "./App.css";
import type { Comment } from "./data/data";
import CommentComponent from "./components/Comment/Comment";
import AddComment from "./components/AddComment/AddComment";
import useComments from "./hooks/useComments";

function MainContainer(): JSX.Element {
  const comments: Comment[] = useComments();

  const renderComments = () =>
    comments.map((comment: Comment, index) => (
      <CommentComponent key={comment.id} commentObj={comment} index={index} />
    )) ?? <></>;

  return (
    <div id="container">
      {renderComments()}
      <AddComment type="add_comment" />
    </div>
  );
}

function App() {
  return <MainContainer />;
}

export default App;
