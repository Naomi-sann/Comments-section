import { useEffect, useRef } from "react";
import ScoreCounter from "./ScoreCounter";
import styles from "./comment.module.css";
import type { Comment, CommentReply } from "../../data/data";
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { useAppSelector } from "../../features/hooks";
import { IconType } from "react-icons/lib";

interface CommentProps {
  commentObj: Comment | CommentReply;
  type?: "reply" | "comment";
}

function CommentModifyButton(props: {
  icon: IconType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button className={`${styles.comment_modify_button} ` + props.className}>
      <props.icon />
      <span>{props.children}</span>
    </button>
  );
}

function CommentComponent({
  commentObj: { content, user, score, replies },
  type = "comment",
}: CommentProps) {
  const currentUser = useAppSelector((state) => state.datas.currentUser);

  const imageRef = useRef<HTMLImageElement | null>(null);

  async function changeImage(src: string) {
    const image = await import(`${src}`);

    if (imageRef.current) imageRef.current.src = image.default;
  }

  useEffect(() => {
    changeImage(`${user.image.png}`);
  }, []);

  const replyElements = replies?.map((reply: CommentReply) => (
    <CommentComponent key={reply.id} commentObj={reply} type="reply" />
  ));

  const commentElement = (
    <div id={type === "comment" ? styles.comment : styles.reply}>
      <div>
        <ScoreCounter scoreProp={score} username={user.username} />
      </div>
      <div className={styles.comment_body}>
        <header className={styles.comment_header}>
          <section className={styles.profile}>
            <img src="" alt="User profile" ref={imageRef} />
            <h2>{user.username}</h2>
          </section>
          {user.username === currentUser.username ? (
            <section className={styles.edit_section}>
              <CommentModifyButton icon={MdDelete} className={styles.delete}>
                Delete
              </CommentModifyButton>
              <CommentModifyButton icon={TiPencil} className={styles.edit}>
                Edit
              </CommentModifyButton>
            </section>
          ) : (
            <CommentModifyButton icon={FaReply} className={styles.reply}>
              Reply
            </CommentModifyButton>
          )}
        </header>
        <p>{content}</p>
      </div>
    </div>
  );

  const renderComment = () => {
    if (
      (type === "comment" && replies && replies.length < 1) ||
      type === "reply"
    ) {
      return commentElement;
    } else if (type === "comment" && replies && replies.length > 0) {
      return (
        <div className={styles.comments_container}>
          {commentElement}
          <section className={styles.replies_section}>{replyElements}</section>
        </div>
      );
    }
    return <></>;
  };

  return renderComment();
}

export default CommentComponent;
