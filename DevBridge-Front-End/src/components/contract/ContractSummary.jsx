import styles from "./ContractSummary.module.css";

import { Link } from "react-router-dom";

import {
    IndianRupee,
    CalendarDays,
    FolderOpen
} from "lucide-react";

const ContractSummary = ({ contract }) => {

    if (!contract) return null;

    return (

        <div className={styles.sidebar}>

            <h3>Contract Summary</h3>

            <div className={styles.item}>

                <small>Status</small>

                <span
                    className={`badge badge-${contract.status.toLowerCase()}`}
                >
                    {contract.status}
                </span>

            </div>

            <div className={styles.item}>

                <small>Budget</small>

                <p>

                    <IndianRupee size={16} />

                    {contract.projectId.budget}

                </p>

            </div>

            <div className={styles.item}>

                <small>Agreed Amount</small>

                <p>

                    <IndianRupee size={16} />

                    {contract.agreedAmount}

                </p>

            </div>

            <div className={styles.item}>

                <small>Started</small>

                <p>

                    <CalendarDays size={16} />

                    {new Date(contract.startDate).toLocaleDateString()}

                </p>

            </div>

            <Link
                to={`/contracts/${contract._id}`}
                className={styles.button}
            >

                <FolderOpen size={18} />

                View Contract

            </Link>

        </div>

    );

};

export default ContractSummary;