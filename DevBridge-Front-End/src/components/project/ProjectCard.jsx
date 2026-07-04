import styles from './ProjectCard.module.css'
import { useNavigate } from "react-router-dom";
import {
Wallet,
FileText,
IndianRupee
} from "lucide-react";

const ProjectCard = ({ project }) => {
 
 const navigate = useNavigate();
  // Convert createdAt to "2d ago" format
  const timeAgo = (dateString) => {
    const now = new Date()
    const created = new Date(dateString)
    const diffMs = now - created
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffDays > 0) return `${diffDays}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    return `${diffMins}m ago`
  }

  const handleChange = () =>{
    navigate(`/projects/${project._id}`);

  }
  const truncate = (text, maxLength = 120) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};

  return (
    <div className="card">
      <div className={styles.inner}>

        {/* Top Row — Title + Badge */}
        <div className={styles.topRow}>
          <h4>{project.title}</h4>
          <span className={`badge badge-${project.status.toLowerCase()}`}>
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p>{truncate(project.description,120)}</p>

        {/* Skill Tags — only show if skills exist */}
        {project.skillsRequired && project.skillsRequired.length > 0 ? (
          <div className={styles.tags}>
            {project.skillsRequired.map((skill) => (
              <span key={skill} className="tag">{skill}</span>
            ))}
          </div>
        ) : (
          <div className={styles.tags}>
            <span className="tag">No skills listed</span>
          </div>
        )}

        
        {/* Footer */}
<div className={styles.footer}>

  <div className={styles.meta}>
    <div className={styles.metaItem}>
      <Wallet size={18} />
      <span><IndianRupee size={18}/>{project.budget}</span>
    </div>

    <div className={styles.metaItem}>
      <FileText size={18} />
      <span>{project.proposalCount} Proposals</span>
    </div>

    <span className="text-muted">
      {timeAgo(project.createdAt)}
    </span>
  </div>

  <button
   className={styles.seeBtn}
    onClick={handleChange}
  >
    View Details
  </button>

</div>

      </div>
    </div>
  )
}

export default ProjectCard