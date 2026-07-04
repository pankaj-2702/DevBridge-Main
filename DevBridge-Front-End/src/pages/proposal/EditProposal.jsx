import styles from "./SubmitProposal.module.css";

import { useState ,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IndianRupee, FileText, Lightbulb, Send } from "lucide-react";

import { editProposal , getProposalById } from "../../services/proposalService";

const EditProposal = () => {

  const navigate = useNavigate();

  const { id } = useParams();
 //console.log("Id ins submit fun : " +id)
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    bidAmount: "",
    coverLetter: ""
  });

  useEffect(() => {
  
      const fetchProposal = async () => {
  
          const data = await getProposalById(id);
          
          console.log(data.proposal)
          setFormData({
              bidAmount: data.proposal.bidAmount,
              coverLetter: data.proposal.coverLetter
          });
  
      };
  
      fetchProposal();
  
  }, [id]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setSaving(true);
     //console.log(formData)
      await editProposal(id, {
        ...formData,
        bidAmount: Number(formData.bidAmount)
      });

      navigate("/proposals");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Something went wrong. with you"
      );

    } finally {

      setSaving(false);

    }

  };

  return (

    <div className={styles.container}>

      {/* Header */}

      <div className={styles.pageHeader}>

        <h1>Submit Proposal</h1>

        <p>
          Send a professional proposal that explains why you're the right developer for this project.
        </p>

      </div>

      {/* Form Card */}

      <div className="card">

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

          {/* Bid Amount */}

          <div className={styles.formGroup}>

            <label>

              <IndianRupee size={18} />

              Bid Amount

            </label>

            <input
              className="input"
              type="number"
              min={1}
              name="bidAmount"
              placeholder="Enter your bid amount"
              value={formData.bidAmount}
              onChange={handleChange}
            />

            <small>
              Enter the amount you want to work for.
            </small>

          </div>

          {/* Cover Letter */}

          <div className={styles.formGroup}>

            <label>

              <FileText size={18} />

              Cover Letter

            </label>

            <textarea
              className={styles.textarea}
              rows={8}
              name="coverLetter"
              placeholder="Introduce yourself, explain your experience, how you'll approach the project, estimated timeline, etc."
              value={formData.coverLetter}
              onChange={handleChange}
            />

            <small>
              Minimum 50 characters • Maximum 2000 characters
            </small>

          </div>

          {/* Tips */}

          <div className={styles.tipBox}>

            <div className={styles.tipTitle}>

              <Lightbulb size={18} />

              <span>Tips for a Great Proposal</span>

            </div>

            <ul>

              <li>Introduce yourself and mention relevant experience.</li>

              <li>Explain why you're the right fit for this project.</li>

              <li>Describe your approach to completing the work.</li>

              <li>Mention your expected delivery timeline.</li>

              <li>Keep your proposal clear, professional and concise.</li>

            </ul>

          </div>

          {/* Error */}

          {error && (

            <p className={styles.error}>
              {error}
            </p>

          )}

          {/* Buttons */}

          <div className={styles.actions}>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            >

              <Send size={18} />

              {saving ? "Editing..." : "Edit Proposal"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditProposal;