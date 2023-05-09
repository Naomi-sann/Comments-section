import { useEffect } from "react";
import CommentComponent from "./components/Comment/Comment";
import AddComment from "./components/AddComment/AddComment";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import { setComment } from "./features/CommentsSlice";
import "./App.css";
import type { Comment } from "./data/data";
import PopupAlert from "./container/PopupAlert/PopupAlert";

function MainContainer({ comments }: { comments: Comment[] }): JSX.Element {
  const renderComments = () =>
    comments.map((comment: Comment, index) => (
      <CommentComponent key={comment.id} commentObj={comment} index={index} />
    )) ?? <></>;

  return (
    <>
      <div id="container">
        {renderComments()}
        <AddComment type="add_comment" />
      </div>
      <PopupAlert />
    </>
  );
}

function App() {
  const comments: Comment[] = useAppSelector(
    (state) => state.comments.comments
  );
  const dispatch = useAppDispatch();

  function getDatasFromLocalStorage(): void {
    const commentDatas = localStorage.getItem(
      process.env.REACT_APP_STORAGE_KEY as string
    );

    commentDatas &&
      commentDatas !== "undefined" &&
      dispatch(setComment(JSON.parse(commentDatas)));
  }

  useEffect(() => {
    getDatasFromLocalStorage();
  }, []);

  return <MainContainer comments={comments} />;
}

export default App;
