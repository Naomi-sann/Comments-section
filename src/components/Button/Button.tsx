import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  className: string;
  name: string;
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
}

const Button = ({ children, className, name, onClick, style }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      name={name}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
