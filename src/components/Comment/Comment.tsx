import { memo } from "react";
import styles from "./comment.module.css";
import CommentElement from "./CommentElement";
import type { Comment, CommentReply } from "../../data/data";

interface CommentProps {
  commentObj: Comment | CommentReply;
  type?: "reply" | "comment";
  index: number;
}

function CommentComponent({
  commentObj,
  type = "comment",
  index,
}: CommentProps) {
  const { replies } = commentObj;

  const replyElements = replies?.map((reply: CommentReply) => (
    <CommentComponent
      key={reply.id}
      commentObj={reply}
      type="reply"
      index={index}
    />
  ));

  const renderComment = () => {
    if (
      (type === "comment" && replies && replies.length < 1) ||
      type === "reply"
    ) {
      return (
        <CommentElement commentObj={commentObj} index={index} type={type} />
      );
    } else if (type === "comment" && replies && replies.length > 0) {
      return (
        <div className={styles.comments_container}>
          {<CommentElement commentObj={commentObj} index={index} type={type} />}
          <section className={styles.replies_section}>{replyElements}</section>
        </div>
      );
    }
    return <></>;
  };

  return renderComment();
}

export default memo(CommentComponent);
