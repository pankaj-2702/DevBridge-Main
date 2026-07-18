import styles from "./MyProposals.module.css";

import { withdrawProposal, getMyProposals } from "../../services/proposalService";
import { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";
import useModal from "../../hooks/useModal";

import ProposalCard from "../../components/proposal/ProposalCard";
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton";

const MyProposals = () => {

  const [proposals, setProposals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const { showToast } = useToast();
  const { showModal } = useModal();

  useEffect(() => {

    const fetchProposals = async () => {

      try {

        const data = await getMyProposals();

        setProposals(data.proposals);

      } catch (err) {

        setError(
          err.response?.data?.message ||
          err.response?.data?.msg ||
          "Failed to load proposals."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProposals();

  }, []);

  if (loading) {
    return <UniversalPageSkeleton />;
  }

   const handleWithdraw = async (proposalId) => {
      showModal({
        title: "Withdraw Proposal",
        message: "Are you sure you want to withdraw this proposal? This action cannot be undone.",
        confirmText: "Withdraw",
        cancelText: "Cancel",
        onConfirm: async () => {
          try {
            await withdrawProposal(proposalId);
            setProposals((prev) => prev.filter((p) => p._id !== proposalId));
            showToast("Proposal withdrawn.", "success");
          } catch (err) {
            showToast("Failed to withdraw proposal.", "error");
          }
        }
      });
    };


  return (

    <div className={styles.container}>

      <div className={styles.pageHeader}>

        <h1>My Proposals</h1>

        <p>
          Track the proposals you've submitted and their current status.
        </p>

      </div>

      {error && (

        <p className={styles.error}>
          {error}
        </p>

      )}

      {!loading && proposals.length === 0 ? (

        <div className={styles.emptyState}>

          <h3>No Proposals Yet</h3>

          <p>
            Start applying to projects and your proposals will appear here.
          </p>

        </div>

      ) : (

        <div className={styles.proposals}>

          {proposals.map((proposal) => (

            <ProposalCard
              key={proposal._id}
              proposal={proposal}
              onWithdraw={handleWithdraw}
              mode='developer'
            />

          ))}

        </div>

      )}

    </div>

  );

};

export default MyProposals;