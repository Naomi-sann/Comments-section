import { useState, useContext, createContext, ReactNode } from "react";

export type AlertResponse = "rejected" | "accepted" | "pending" | null;

interface PromptAlert extends Alert<"prompt"> {
  onReject?: Function;
  onAccept?: Function;
}
interface MessageAlert extends Alert<"alert"> {
  onContinue?: Function;
}

interface HideAlertAction {
  delay?: number | undefined;
  response: AlertResponse;
}

interface Alert<Type = "alert" | "prompt" | null> {
  type: Type;
  title: string;
  message: string;
}
interface AlertState extends Alert {
  isShowing: boolean;
  response: AlertResponse;
  operations: {
    message?: {
      onContinue: Function | undefined;
    };
    prompt?: {
      onReject: Function | undefined;
      onAccept: Function | undefined;
    };
  };
}
const initialState: AlertState = {
  type: null,
  title: "",
  message: "",
  isShowing: false,
  response: null,
  operations: {},
};

interface AlertContextType {
  alert: AlertState;
  showAlert: Function;
  hideAlert: Function;
}

const AlertContext = createContext<AlertContextType | null>(null);
const useAlertContext = () => useContext(AlertContext);

const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>(initialState);

  function showAlert(action: PromptAlert | MessageAlert) {
    const { type, title, message } = action;

    const newValue = {
      type,
      title,
      message,
      isShowing: true,
      response: "pending",
    };

    switch (type) {
      case "alert": {
        const alertState = {
          ...newValue,
          operations: {
            message: {
              onContinue: action.onContinue,
            },
          },
        } as AlertState;

        setAlert(alertState);
        break;
      }
      case "prompt": {
        const promptState = {
          ...newValue,
          operations: {
            prompt: {
              onReject: action.onReject,
              onAccept: action.onAccept,
            },
          },
        } as AlertState;

        setAlert(promptState);
        break;
      }
      default:
        console.error("type is invalid");
    }
  }
  function hideAlert({ response, delay }: HideAlertAction) {
    const newValue = { ...alert, response: response, isShowing: false };

    if (delay)
      setTimeout(() => {
        setAlert(newValue);
      }, delay);
    else setAlert(newValue);
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { useAlertContext };
export default AlertContextProvider;
