import styles from "./ChatHeader.module.css";

import { Link } from "react-router-dom";

const ChatHeader = ({ contract }) => {

  if (!contract) return null;

  return (

    <div className={styles.header}>

      <div>

        <h2>{contract.projectId.title}</h2>

        <p>

          {contract.clientId.name}

          {" • "}

          {contract.developerId.name}

        </p>

      </div>

      <span
        className={`badge badge-${contract.status.toLowerCase()}`}
      >
        {contract.status}
      </span>

    </div>

  );

};

export default ChatHeader;