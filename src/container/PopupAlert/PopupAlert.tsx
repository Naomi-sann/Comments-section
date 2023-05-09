import styles from "./popupAlert.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { hideAlert } from "../../features/AlertSlice";

function PopupAlert(): JSX.Element {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert);

  const handleReject = () => dispatch(hideAlert({ delay: undefined }));

  return alert.isShowing ? (
    <AnimatePresence mode="wait">
      <motion.div
        transition={{ duration: 0.3, type: "tween" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.alert_container}
      >
        <motion.div
          id={styles.alert}
          transition={{ duration: 0.75, type: "spring" }}
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <h2>{alert.title}</h2>
          <p>{alert.message}</p>
          <div className={styles.button_container}>
            <Button
              className={styles.reject_button}
              name="reject-button"
              style={{ backgroundColor: "var(--gray)" }}
              onClick={handleReject}
            >
              no, cancel
            </Button>
            <Button
              className={styles.approve_button}
              name="approve-button"
              style={{ backgroundColor: "var(--tomato-red)" }}
            >
              yes, delete
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <></>
  );
}

export default PopupAlert;
