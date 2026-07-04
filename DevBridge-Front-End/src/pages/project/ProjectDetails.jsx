import styles from "./ProjectDetails.module.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton";
import { getProjectById , deleteProject } from "../../services/projectService";

import {
  ArrowLeft,
  User,
  CalendarDays,
  FileText,
  Wallet,
  FolderOpen,
  Send,
  IndianRupee
} from "lucide-react";

const ProjectDetails = () => {
  const {user} = useAuth();

  const navigate = useNavigate();

  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {

    const fetchProject = async () => {

      try {

        const data = await getProjectById(id);

        setProject(data.project);

      } catch (err) {

        //console.log(err);

      }

    };

    fetchProject();

  }, [id]);

 const isOwner = user?._id=== project?.clientId?._id;
 
 
const handleSubmit = () =>{
   navigate(`/projects/${id}/proposal`)
}


  if (!project) {

    return <UniversalPageSkeleton />;

  }

  //console.log("Is Owner : "+ isOwner)
 //console.log("MY name : "+user._id + " and owner name : "+project.clientId?._id )

  const handleEdit = () => {
  navigate(`/projects/${id}/edit`);
};

const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProject(id);
    navigate("/my-projects");
  } catch (err) {
    //console.log(err);
  }
};

const handleViewProposals = () =>{
   navigate(`/projects/${id}/proposals`)
   console.log(id)
}
  //console.log(project.clientId);

  return (

    <div className={styles.container}>

      {/* Back */}

      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} />
        Back to Projects
      </button>

      {/* Title */}

      <div className={styles.header}>

        <h1>{project.title}</h1>

        <span className={`badge badge-${project.status.toLowerCase()}`}>
          {project.status}
        </span>

      </div>

      {/* Info */}

      <div className={styles.infoRow}>

        <div className={styles.infoItem}>

         <div className={styles.infoItem}>

  <Link to={`/users/${project.clientId._id}`}
    className={styles.userLink}

  >
    {project.clientId.profilePhoto ? (

        <img
            src={project.clientId.profilePhoto}
            alt={project.clientId.name}
            className={styles.avatar}
        />

    ) : (

        <div className={styles.avatarFallback}>
            <User size={22}/>
        </div>

    )}
    
      <span>{project.clientId.name}</span>
    </Link>
   

</div>

        </div>

        <div className={styles.infoItem}>

          <CalendarDays size={20} />

          <span>
            Posted on{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </span>

        </div>

        <div className={styles.infoItem}>

          <FileText size={20} />

          <span>
            {project.proposalCount} Proposals
          </span>

        </div>

      </div>

      {/* Tabs */}

      <div className={styles.tabs}>

        <button className={styles.activeTab}>
          Overview
        </button>

      </div>

      {/* Description */}

      <div className="card">

        <h3>Project Description</h3>

        <p>
          {project.description}
        </p>

      </div>

      {/* Skills */}

      <div className="card">

        <h3>Skills Required</h3>

        <div className={styles.skills}>

          {project.skillsRequired.length > 0 ? (

            project.skillsRequired.map((skill) => (

              <span
                key={skill}
                className="tag"
              >
                {skill}
              </span>

            ))

          ) : (

            <span className="tag">

              No skills listed

            </span>

          )}

        </div>

      </div>

      {/* Details */}

      <div className="card">

        <h3>Project Details</h3>

        <div className={styles.detailsGrid}>

          <div className={styles.detailItem}>

            <Wallet size={22} />

            <div>

              <small>Budget</small>

              <h4><IndianRupee/>{project.budget}</h4>

            </div>

          </div>

          <div className={styles.detailItem}>

            <FolderOpen size={22} />

            <div>

              <small>Status</small>

              <h4>{project.status}</h4>

            </div>

          </div>

          <div className={styles.detailItem}>

            <FileText size={22} />

            <div>

              <small>Proposal Count</small>

              <h4>{project.proposalCount}</h4>

            </div>

          </div>

          <div className={styles.detailItem}>

            <CalendarDays size={22} />

            <div>

              <small>Created At</small>

              <h4>

                {new Date(project.createdAt).toLocaleDateString()}

              </h4>

            </div>

          </div>

        </div>

      </div>

      <div className={styles.actionButtons}>

  {/* Developer */}

  {user?.role === "developer" && !isOwner && (
    <button
      className="btn-primary"
      onClick={handleSubmit}
    >
      <Send size={18} />
      Submit Proposal
    </button>
  )}

  {/* Owner */}

  {isOwner && (
    <>
      <button
        className="btn-secondary"
        onClick={handleEdit}
      >
        Edit Project
      </button>

      <button
        className={styles.viewProposalBtn}
         onClick={handleViewProposals}
      >
        {`View Proposals(${project.proposalCount})`}
      </button>

      <button
        className={styles.deleteBtn}
        onClick={handleDelete}
      >
        Delete Project
      </button>
    </>
  )}

</div>

    </div>

  );

};

export default ProjectDetails;