import styles from "./MessageInput.module.css";

import { SendHorizonal } from "lucide-react";

const MessageInput = ({
    value,
    setValue,
    onSend
}) => {

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            onSend();

        }

    };

    return (

        <div className={styles.container}>

            <textarea
                className={styles.input}
                placeholder="Type your message..."
                rows={2}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button
                className={styles.sendBtn}
                onClick={onSend}
            >

                <SendHorizonal size={20} />

            </button>

        </div>

    );

};

export default MessageInput;