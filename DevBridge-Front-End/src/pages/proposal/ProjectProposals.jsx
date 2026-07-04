import styles from "./MyProposals.module.css";

//import { withdrawProposal } from '../../services/proposalService'
import { useEffect, useState } from "react";

import { getProposals , acceptProposals } from "../../services/proposalService";

import ProposalCard from "../../components/proposal/ProposalCard";
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton";
import { useNavigate, useParams } from "react-router-dom";

const ProjectProposals = () => {

  const [proposals, setProposals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {

    const fetchProposals = async () => {

      try {

        const data = await getProposals(id);

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

  }, [id]);

  if (loading) {
    return <UniversalPageSkeleton />;
  }

   const handleAccept = async (proposalId) => {
         
       try {

        const data = await acceptProposals(proposalId);
         
        
        console.log(data.contract)
        navigate(`/contracts/${data.contract._id}`)
        

      } catch (err) {

        setError(
          err.response?.data?.message ||
          err.response?.data?.msg ||
          "Failed to accept proposals."
        );

      } finally {

        setLoading(false);

      }
    };

    // const handleReject = async (proposalId)=>{
        
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

    // console.log(id

  return (

    <div className={styles.container}>

      <div className={styles.pageHeader}>

        <h1>{`XYZ Project Proposals`} </h1>

        <p>
            Review proposals submitted by developers and choose the best fit for your project.
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
  Your project is live, but no developers have applied yet. Once proposals are submitted, they'll appear here.
</p>
          

        </div>

      ) : (

        <div className={styles.proposals}>

          {proposals.map((proposal) => (

            <ProposalCard
              key={proposal._id}
              proposal={proposal}
              mode="client"
             onAccept={handleAccept}
             />

          ))}

        </div>

      )}

    </div>

  );

};

export default ProjectProposals;