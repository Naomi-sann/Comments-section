import styles from "./comment.module.css";
import type { IconType } from "react-icons/lib";

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

export default CommentModifyButton;
