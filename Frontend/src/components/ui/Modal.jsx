import styles from './ Modal.module.css';

const Modal = ({
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel
}) => {

    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className={styles.actions}>

                    <button
                        className={styles.cancel}
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        className={styles.confirm}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Modal;