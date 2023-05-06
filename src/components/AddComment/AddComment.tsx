import { useEffect, useRef } from "react";
import styles from "./addComment.module.css";
import { useAppSelector } from "../../features/hooks";
import { changeImage } from "../../utils/utils";
import Button from "../Button/Button";

interface AddCommentProps {
  type: "add_comment" | "add_reply";
}

const AddComment = (props: AddCommentProps): JSX.Element => {
  const profile = useAppSelector((state) => state.datas.currentUser);
  const imageRef = useRef(null);

  useEffect(() => {
    changeImage(imageRef, profile.image.png as string);
  });

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
      ></div>
      <Button className={styles.send_comment}>send</Button>
    </div>
  );
};

export default AddComment;
