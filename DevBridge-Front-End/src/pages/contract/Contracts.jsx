import styles from "./Contracts.module.css";

import { useEffect, useState } from "react";

import { getAllContracts } from "../../services/contractService";

import ContractCard from "../../components/contract/ContractCard";
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton";

const Contracts = () => {

  const [contracts, setContracts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchContracts = async () => {

      try {

        const data = await getAllContracts();

        setContracts(data.contracts);

      } catch (err) {

        setError(
          err.response?.data?.message ||
          err.response?.data?.msg ||
          "Failed to load contracts."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchContracts();

  }, []);

  if (loading) {
    return <UniversalPageSkeleton />;
  }

  return (

  <div className={styles.page}>

    <div className={styles.header}>

      <h2>My Contracts</h2>

      <p>
        Manage your active and completed contracts with clients and developers.
      </p>

    </div>

    {error && (
      <p className={styles.error}>
        {error}
      </p>
    )}

    {!loading && contracts.length === 0 ? (

      <div className={styles.center}>

        <h3>No Contracts Yet</h3>

        <p>
          Once a proposal is accepted, your contracts will appear here.
        </p>

      </div>

    ) : (

      <div className={styles.grid}>

        {contracts.map((contract) => (

          <ContractCard
            key={contract._id}
            contract={contract}
          />

        ))}

      </div>

    )}

  </div>

);

};

export default Contracts;