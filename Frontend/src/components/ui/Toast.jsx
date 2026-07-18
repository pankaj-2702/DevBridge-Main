import styles from "./Toast.module.css";

const Toast = ({ message, type, onClose }) => {

    return (

        <div className={`${styles.toast} ${styles[type]}`}>

            <span>{message}</span>

            <button
                onClick={onClose}
                className={styles.close}
            >
                ×
            </button>

        </div>

    );

};

export default Toast;