import styles from "./ContractDetails.module.css";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton";
import {
  getContractById,
  completeContract
} from "../../services/contractService";

import {
  ArrowLeft,
  User,
  CalendarDays,
  FileText,
  Wallet,
  FolderOpen,
  IndianRupee,
  CheckCircle
} from "lucide-react";

const ContractDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [contract, setContract] = useState(null);

  useEffect(() => {

    const fetchContract = async () => {

      try {

        const data = await getContractById(id);

        setContract(data.contract);

      } catch (err) {

        console.log(err);

      }

    };

    fetchContract();

  }, [id]);

  if (!contract) {

    return <UniversalPageSkeleton />;

  }

  const handleComplete = async () => {

    const confirmComplete = window.confirm(
      "Mark this contract as completed?"
    );

    if (!confirmComplete) return;

    try {

      await completeContract(id);

      navigate("/contracts");

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className={styles.container}>

      {/* Back */}

      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >

        <ArrowLeft size={20} />

        Back to Contracts

      </button>

      {/* Header */}

      <div className={styles.header}>

        <h1>{contract.projectId.title}</h1>

        <span className={`badge badge-${contract.status.toLowerCase()}`}>
          {contract.status}
        </span>

      </div>

 <div className={styles.content}>
      {/* Client & Developer */}

      <div className={styles.peopleGrid}>

        {/* Client */}

        <div className="card">

          <h3>Client</h3>

          <Link
            to={`/users/${contract.clientId._id}`}
            className={styles.userLink}
          >

            {contract.clientId.profilePhoto ? (

              <img
                src={contract.clientId.profilePhoto}
                alt={contract.clientId.name}
                className={styles.avatar}
              />

            ) : (

              <div className={styles.avatarFallback}>
                <User size={22} />
              </div>

            )}

            <span>{contract.clientId.name}</span>

          </Link>

        </div>

        {/* Developer */}

        <div className="card">

          <h3>Developer</h3>

          <Link
            to={`/users/${contract.developerId._id}`}
            className={styles.userLink}
          >

            {contract.developerId.profilePhoto ? (

              <img
                src={contract.developerId.profilePhoto}
                alt={contract.developerId.name}
                className={styles.avatar}
              />

            ) : (

              <div className={styles.avatarFallback}>
                <User size={22} />
              </div>

            )}

            <span>{contract.developerId.name}</span>

          </Link>

        </div>

      </div>

      {/* Description */}

      <div className="card">

        <h3>Project Description</h3>

        <p>{contract.projectId.description}</p>

      </div>

      {/* Skills */}

      <div className="card">

        <h3>Skills Required</h3>

        <div className={styles.skills}>

          {contract.projectId.skillsRequired.map(skill => (

            <span
              key={skill}
              className="tag"
            >

              {skill}

            </span>

          ))}

        </div>

      </div>

      {/* Proposal */}

      <div className="card">

        <h3>Accepted Proposal</h3>

        <p>

          <strong>Bid Amount:</strong>

          {" "}

          ₹{contract.proposalId.bidAmount}

        </p>

        <br />

        <p>{contract.proposalId.coverLetter}</p>

      </div>

      {/* Contract Details */}

      <div className="card">

        <h3>Contract Details</h3>

        <div className={styles.detailsGrid}>

          <div className={styles.detailItem}>

            <Wallet size={22} />

            <div>

              <small>Project Budget</small>

              <h4>

                <IndianRupee />

                {contract.projectId.budget}

              </h4>

            </div>

          </div>

          <div className={styles.detailItem}>

            <FolderOpen size={22} />

            <div>

              <small>Agreed Amount</small>

              <h4>

                <IndianRupee />

                {contract.agreedAmount}

              </h4>

            </div>

          </div>

          <div className={styles.detailItem}>

            <CalendarDays size={22} />

            <div>

              <small>Project Created</small>

              <h4>

                {new Date(
                  contract.projectId.createdAt
                ).toLocaleDateString()}

              </h4>

            </div>

          </div>

          <div className={styles.detailItem}>

            <CalendarDays size={22} />

            <div>

              <small>Contract Started</small>

              <h4>

                {new Date(
                  contract.startDate
                ).toLocaleDateString()}

              </h4>

            </div>

          </div>

        </div>

      </div>

      </div>

      {/* Complete */}

     <div className={styles.actions}>

  <button
    className="btn-secondary"
    onClick={() => navigate(`/contracts/${id}/chat`)}
  >
    Open Chat
  </button>

  {contract.status === "COMPLETED" && (

    <button
      className="btn-secondary"
      onClick={() => navigate(`/contracts/${id}/review`)}
    >
      Leave Review
    </button>

  )}

  {user.role === "client" &&
    contract.status === "ACTIVE" && (

      <button
        className="btn-primary"
        onClick={handleComplete}
      >
        <CheckCircle size={18} />
        Complete Contract
      </button>

  )}

</div>

    </div>

  );

};

export default ContractDetails;