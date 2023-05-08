import { useEffect, useRef } from "react";
import styles from "./addComment.module.css";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { changeImage, getId } from "../../utils/utils";
import Button from "../Button/Button";
import type { User, Comment } from "../../data/data";
import { addComment } from "../../features/CommentsSlice";

interface AddCommentProps {
  type: "add_comment" | "add_reply";
}

const AddComment = (props: AddCommentProps): JSX.Element => {
  const profile: User = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const textareaRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const imageRef: React.MutableRefObject<HTMLImageElement | null> =
    useRef(null);

  useEffect(() => {
    changeImage(imageRef, profile.image.png as string);
  });

  const handleAddComment = () => {
    const currentTime = new Date().getTime();

    const comment: Comment = {
      id: getId(),
      content: textareaRef.current ? textareaRef.current.innerText : "",
      createdAt: currentTime + "",
      replies: [],
      score: 0,
      user: profile,
    };
    dispatch(addComment(comment));

    if (textareaRef.current) textareaRef.current.innerText = "";
  };

  return (
    <div id={styles[props.type]} className="comment-box">
      <img
        src={profile.image.png as string}
        alt="profile"
        id={styles.profile_image}
        ref={imageRef}
      />
      <div
        id={styles.comment_text}
        placeholder="Add a comment..."
        contentEditable
        ref={textareaRef}
      ></div>
      <Button
        className={styles.send_comment}
        name="add-comment"
        onClick={handleAddComment}
      >
        send
      </Button>
    </div>
  );
};

export default AddComment;
