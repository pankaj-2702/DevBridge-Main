import styles from "./ProposalCard.module.css";

import { Link  , useParams , useNavigate} from "react-router-dom";

import {
  IndianRupee,
  CalendarDays,
  ArrowRight
} from "lucide-react";

const ProposalCard = ({ proposal,
    mode,
    onWithdraw,
    onAccept,
    }) => {

  const statusClass = {
    PENDING: styles.pending,
    ACCEPTED: styles.accepted,
    REJECTED: styles.rejected
  };

  const navigate = useNavigate();

 

  return (

    <div className={styles.card}>

      {/* Top */}

      <div className={styles.header}>

        <div>

          <h3>{proposal.projectId.title}</h3>

          <p>
            Submitted on{" "}
            {new Date(proposal.createdAt).toLocaleDateString()}
          </p>

        </div>

        <span
          className={`${styles.status} ${statusClass[proposal.status]}`}
        >
          {proposal.status}
        </span>

      </div>

      {/* Cover Letter */}

      <p className={styles.coverLetter}>

        {proposal.coverLetter}


      </p>

      {/* Footer */}

<div className={styles.footer}>

  <div className={styles.bid}>

    <IndianRupee size={18} />

    <span>{proposal.bidAmount}</span>

  </div>

  <div className={styles.date}>

    <CalendarDays size={18} />

    <span>
      {new Date(proposal.createdAt).toLocaleDateString()}
    </span>

  </div>

</div>

{/* Action Buttons */}

<div className={styles.actions}>

    {mode === "developer" && (

        <>
            <Link
                to={`/projects/${proposal.projectId._id}`}
                className={styles.viewBtn}
            >
                View Project
            </Link>

            {proposal.status === "PENDING" && (
                <>
                    <Link
                        to={`/proposals/${proposal._id}/edit`}
                        className={styles.editBtn}
                    >
                        Update
                    </Link>

                    <button
                        className={styles.deleteBtn}
                        onClick={() => onWithdraw(proposal._id)}
                    >
                        Withdraw
                    </button>
                </>
            )}

        </>

    )}

    {mode === "client" && (

        <>
            <Link
                to={`/users/${proposal.developerId._id}`}
                className={styles.viewBtn}
            >
                View Developer
            </Link>

            {proposal.status === "PENDING" && (
                <>
                    <button
                        className={styles.acceptBtn}
                        onClick={() => onAccept(proposal._id)}
                    >
                        Accept
                    </button>

                </>
            )}

        </>

    )}

</div>

    </div>

  );

};

export default ProposalCard;