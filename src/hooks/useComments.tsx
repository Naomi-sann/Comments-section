import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import type { Comment } from "../data/data";
import { setComment } from "../features/CommentsSlice";

function useComments() {
  const comments: Comment[] = useAppSelector((state) => state.datas.comments);
  const dispatch = useAppDispatch();

  const dataKey: string = "commentDatas";

  function createCommentDatas(value: Comment[] = []) {
    dispatch(setComment(value));
  }
  function getDatasFromLocalStorage() {
    const commentDatas = localStorage.getItem(dataKey);

    commentDatas && commentDatas !== "undefined"
      ? dispatch(setComment(JSON.parse(commentDatas)))
      : createCommentDatas(comments);
  }

  useEffect(() => {
    getDatasFromLocalStorage();
  }, []);

  return comments;
}

export default useComments;
