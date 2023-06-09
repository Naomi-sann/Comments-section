import { useEffect, useRef } from "react";
import styles from "../comment.module.css";
import ScoreCounter from "./ScoreCounter";
import ModifyButtonSection from "./ModifyButtonSection";
import { LazyMotion, m, useInView, domAnimation } from "framer-motion";
import { useAppSelector } from "../../../features/hooks";
import { changeImage, getPassedTimeSince } from "../../../utils/utils";
import type { Comment, CommentReply } from "../../../data/data";

interface CommentProps {
  commentObj: Comment | CommentReply;
  type?: "reply" | "comment";
  index: number;
}

function CommentElement({
  commentObj: { user, createdAt, content, score, id },
  index,
  type,
}: CommentProps) {
  const commentRef = useRef(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const currentUser = useAppSelector((state) => state.user);
  const isInView = useInView(commentRef);

  useEffect(() => {
    changeImage(imageRef, `${user.image.png}`);
  }, []);

  const isUser: boolean = user.username === currentUser.username;

  const renderCreateDate = () => {
    if (/[a-zA-Z]/gi.test(createdAt)) return createdAt;

    let passedTimeText = "";

    const passedTimeObj: {
      [date: string]: number;
    } = getPassedTimeSince(parseInt(createdAt));

    const getPassedText = (date: number, dateText: string): string => {
      return `${date} ${dateText}${date > 1 ? "s" : ""} ago`;
    };

    for (const date in passedTimeObj) {
      const dateValue = passedTimeObj[date];

      passedTimeText = getPassedText(dateValue, date);

      if (dateValue) break;
    }

    return passedTimeText;
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ y: 20 }}
        animate={isInView && { y: 0, opacity: 1 }}
        transition={{ type: "tween", delay: 0.2 * index }}
        ref={commentRef}
        className="comment-box"
        id={type === "comment" ? styles.comment : styles.reply}
      >
        <div className={styles.comment_aside}>
          <ScoreCounter scoreProp={score} username={user.username} />
          <div className={styles.aside_reply}>
            {<ModifyButtonSection isUser={isUser} commentId={id} />}
          </div>
        </div>
        <div className={styles.comment_body}>
          <header className={styles.comment_header}>
            <section className={styles.profile}>
              <img src="" alt="User profile" ref={imageRef} />
              <h2>{user.username}</h2>
              {isUser && <mark className={styles.you_badge}>you</mark>}
              <span className={styles.created_at}>{renderCreateDate()}</span>
            </section>
            <div className={styles.header_reply}>
              {<ModifyButtonSection isUser={isUser} commentId={id} />}
            </div>
          </header>
          <p>{content}</p>
        </div>
      </m.div>
    </LazyMotion>
  );
}

export default CommentElement;
