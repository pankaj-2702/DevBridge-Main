import { useState } from "react";
import ToastContext from "./ToastContext";
import Toast from "../components/ui/Toast";

const ToastProvider = ({ children }) => {

    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {

        setToast({
            message,
            type
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);

    };

    return (

        <ToastContext.Provider value={{ showToast }}>

            {children}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                />
            )}

        </ToastContext.Provider>

    );

};

export default ToastProvider;