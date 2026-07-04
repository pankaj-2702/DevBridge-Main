import styles from "./ContractCard.module.css";

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {
  User,
  IndianRupee,
  CalendarDays,
  ArrowRight
} from "lucide-react";

const ContractCard = ({ contract }) => {

  const { user } = useAuth();

  const otherPerson =
    user.role === "client"
      ? contract.developerId
      : contract.clientId;

  const statusClass = {
    ACTIVE: "badge-active",
    COMPLETED: "badge-completed",
    CANCELLED: "badge-cancelled"
  };

  return (

    <div className="card">

      {/* Top */}

      <div className={styles.topRow}>

        <div>

          <h4>{contract.projectId.title}</h4>

          <p className={styles.userName}>

            {user.role === "client"
              ? "Developer"
              : "Client"}

          </p>
       
          <Link 
           to={`/users/${otherPerson._id}`}
          >
          <div className={styles.user}>
         
            {otherPerson.profilePhoto ? (

              <img
                src={otherPerson.profilePhoto}
                alt={otherPerson.name}
                className={styles.avatar}
              />

            ) : (

              <div className={styles.avatarFallback}>
                <User size={20} />
              </div>

            )}

            <span>{otherPerson.name}</span>

          </div>
          </Link>
        </div>
        

        <span className={`badge ${statusClass[contract.status]}`}>
          {contract.status}
        </span>

      </div>

      {/* Footer */}

      <div className={styles.footer}>

        <div className={styles.meta}>

          <div className={styles.metaItem}>

            <IndianRupee size={18} />

            <span>{contract.agreedAmount}</span>

          </div>

          <div className={styles.metaItem}>

            <CalendarDays size={18} />

            <span>
              {new Date(contract.createdAt).toLocaleDateString()}
            </span>

          </div>

        </div>

        <div className={styles.actions}>

  <Link
    to={`/contracts/${contract._id}`}
    className={styles.viewBtn}
  >
    View Contract
  </Link>

  <Link
    to={`/contracts/${contract._id}/chat`}
    className={styles.chatBtn}
  >
    Open Chat
  </Link>

</div>

      </div>

    </div>

  );

};

export default ContractCard;