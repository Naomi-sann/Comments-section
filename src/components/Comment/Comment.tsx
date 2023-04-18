import { useEffect, useRef } from "react";
import ScoreCounter from "./ScoreCounter";
import styles from "./comment.module.css";
import type { Comment } from "../../data/data";
import { FaReply } from "react-icons/fa";

interface CommentProps {
  commentObj: Comment;
}

function CommentComponent({
  commentObj: { content, createdAt, user, score, replies },
}: CommentProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  async function changeImage(src: string) {
    const image = await import(`${src}`);

    if (imageRef.current) imageRef.current.src = image.default;
  }

  useEffect(() => {
    changeImage(`${user.image.png}`);
  }, []);

  return (
    <div id={styles.comment}>
      <div>
        <ScoreCounter score={score} />
      </div>
      <div className={styles.comment_body}>
        <header className={styles.comment_header}>
          <section className={styles.profile}>
            <img src="" alt="User profile" draggable="false" ref={imageRef} />
            <h2>{user.username}</h2>
          </section>
          <button className={styles.reply}>
            <FaReply />
            <span>Reply</span>
          </button>
        </header>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default CommentComponent;
