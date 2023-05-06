import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  [key: string]: any;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button id={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
