import { useState } from "react";
import ModalContext from "./ModalContext";
import Modal from "../components/ui/Modal";

const ModalProvider = ({ children }) => {

    const [modal, setModal] = useState(null);

    const showModal = ({
        title,
        message,
        confirmText = "Confirm",
        cancelText = "Cancel",
        onConfirm
    }) => {

        setModal({
            title,
            message,
            confirmText,
            cancelText,
            onConfirm
        });

    };

    const closeModal = () => {
        setModal(null);
    };

    const handleConfirm = () => {

        modal?.onConfirm?.();
        closeModal();

    };

    return (

        <ModalContext.Provider value={{ showModal }}>

            {children}

            {modal && (

                <Modal
                    title={modal.title}
                    message={modal.message}
                    confirmText={modal.confirmText}
                    cancelText={modal.cancelText}
                    onConfirm={handleConfirm}
                    onCancel={closeModal}
                />

            )}

        </ModalContext.Provider>

    );

};

export default ModalProvider;