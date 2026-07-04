import styles from "./MessageBubble.module.css";

import useAuth from "../../hooks/useAuth";

import { User } from "lucide-react";

const MessageBubble = ({ message }) => {

    const { user } = useAuth();

    const isMine = message.senderId._id === user._id;

    return (

        <div
            className={`${styles.messageRow} ${
                isMine ? styles.mine : styles.other
            }`}
        >

            {!isMine && (

                message.senderId.profilePhoto ? (

                    <img
                        src={message.senderId.profilePhoto}
                        alt={message.senderId.name}
                        className={styles.avatar}
                    />

                ) : (

                    <div className={styles.avatarFallback}>

                        <User size={18} />

                    </div>

                )

            )}

            <div className={styles.bubble}>

                {!isMine && (

                    <small className={styles.sender}>

                        {message.senderId.name}

                    </small>

                )}

                <p>

                    {message.message}

                </p>

                <small className={styles.time}>

                    {new Date(message.createdAt)
                        .toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}

                </small>

            </div>

        </div>

    );

};

export default MessageBubble;