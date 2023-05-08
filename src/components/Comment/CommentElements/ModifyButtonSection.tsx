import { useAppDispatch } from "../../../features/hooks";
import { deleteComment } from "../../../features/CommentsSlice";
import CommentModifyButton from "./CommentModifyButton";
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import styles from "../comment.module.css";

function ModifyButtonSection({
  isUser,
  commentId,
}: {
  isUser: boolean;
  commentId: number;
}) {
  const dispatch = useAppDispatch();

  const handleReply = () => {};
  const handleDelete = () => {
    console.log("delete");
    dispatch(deleteComment(commentId));
  };
  const handleEdit = () => {};

  return isUser ? (
    <section className={styles.edit_section}>
      <CommentModifyButton
        icon={MdDelete}
        className={styles.delete}
        name="delete"
        onClick={handleDelete}
      >
        Delete
      </CommentModifyButton>
      <CommentModifyButton
        icon={TiPencil}
        className={styles.edit}
        name="edit"
        onClick={handleEdit}
      >
        Edit
      </CommentModifyButton>
    </section>
  ) : (
    <CommentModifyButton
      icon={FaReply}
      className={styles.reply}
      name="reply"
      onClick={handleReply}
    >
      Reply
    </CommentModifyButton>
  );
}

export default ModifyButtonSection;
