import styles from "./popupAlert.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../components/Button/Button";
import { useAlertContext } from "../../providers/AlertContext/AlertContext";

function PopupAlert(): JSX.Element {
  const alertContext = useAlertContext();

  if (!alertContext) return <></>;

  const { alert, hideAlert } = alertContext;
  const { message, prompt } = alert.operations;

  const handleReject = () =>
    prompt?.onReject ? prompt?.onReject() : hideAlert({ response: "rejected" });
  const handleAccept = () =>
    prompt?.onAccept ? prompt?.onAccept() : hideAlert({ response: "accepted" });
  const handleContinue = () =>
    message?.onContinue
      ? message?.onContinue()
      : hideAlert({ response: "accepted" });

  return (
    <AnimatePresence>
      {alert.isShowing ? (
        <motion.div
          key="container"
          transition={{ duration: 0.3, type: "tween" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.alert_container}>
          <motion.div
            key="alert"
            id={styles.alert}
            transition={{ duration: 0.75, type: "spring" }}
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0 }}>
            <h2>{alert.title}</h2>
            <p>{alert.message}</p>
            <div className={styles.button_container}>
              {alert.type === "prompt" ? (
                <>
                  <Button
                    className={styles.reject_button}
                    name="reject-button"
                    style={{ backgroundColor: "var(--gray)" }}
                    onClick={handleReject}>
                    no, cancel
                  </Button>
                  <Button
                    className={styles.approve_button}
                    name="approve-button"
                    style={{ backgroundColor: "var(--tomato-red)" }}
                    onClick={handleAccept}>
                    yes, delete
                  </Button>
                </>
              ) : (
                <Button
                  className={styles.continue_button}
                  name="continue-button"
                  style={{ backgroundColor: "dodgerblue" }}
                  onClick={handleContinue}>
                  ok
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
}

export default PopupAlert;
