import { useEffect, useRef } from "react";
import ScoreCounter from "./ScoreCounter";
import styles from "./comment.module.css";
import type { Comment, CommentReply } from "../../data/data";
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { useAppSelector } from "../../features/hooks";
import { IconType } from "react-icons/lib";
import { useInView, LazyMotion, domAnimation, m } from "framer-motion";
import { changeImage } from "../../utils/utils";

interface CommentProps {
  commentObj: Comment | CommentReply;
  type?: "reply" | "comment";
  index: number;
}

function CommentModifyButton(props: {
  icon: IconType;
  children: React.ReactNode;
  className?: string;
  name: string;
}) {
  return (
    <button
      className={`${styles.comment_modify_button} ` + props.className}
      name={`modify-${props.name}-button`}
    >
      <props.icon />
      <span>{props.children}</span>
    </button>
  );
}

function CommentComponent({
  commentObj: { content, createdAt, user, score, replies },
  type = "comment",
  index,
}: CommentProps) {
  const currentUser = useAppSelector((state) => state.user);

  const commentRef = useRef(null);
  const isInView = useInView(commentRef);

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    changeImage(imageRef, `${user.image.png}`);
  }, []);

  const replyElements = replies?.map((reply: CommentReply) => (
    <CommentComponent
      key={reply.id}
      commentObj={reply}
      type="reply"
      index={index}
    />
  ));

  const isUser: boolean = user.username === currentUser.username;

  const replySection = isUser ? (
    <section className={styles.edit_section}>
      <CommentModifyButton
        icon={MdDelete}
        className={styles.delete}
        name="delete"
      >
        Delete
      </CommentModifyButton>
      <CommentModifyButton icon={TiPencil} className={styles.edit} name="edit">
        Edit
      </CommentModifyButton>
    </section>
  ) : (
    <CommentModifyButton icon={FaReply} className={styles.reply} name="reply">
      Reply
    </CommentModifyButton>
  );

  const commentElement = (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ y: 20 }}
        animate={isInView && { y: 0, opacity: 1 }}
        transition={{ type: "tween", delay: 0.2 * index }}
        id={type === "comment" ? styles.comment : styles.reply}
        className="comment-box"
        ref={commentRef}
      >
        <div className={styles.comment_aside}>
          <ScoreCounter scoreProp={score} username={user.username} />
          <div className={styles.aside_reply}>{replySection}</div>
        </div>
        <div className={styles.comment_body}>
          <header className={styles.comment_header}>
            <section className={styles.profile}>
              <img src="" alt="User profile" ref={imageRef} />
              <h2>{user.username}</h2>
              {isUser && <mark className={styles.you_badge}>you</mark>}
              <span className={styles.created_at}>{createdAt}</span>
            </section>
            <div className={styles.header_reply}>{replySection}</div>
          </header>
          <p>{content}</p>
        </div>
      </m.div>
    </LazyMotion>
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
