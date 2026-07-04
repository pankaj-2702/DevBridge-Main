import styles from "./CreateProject.module.css";

import { useState , useEffect} from "react";
import { useNavigate , useParams } from "react-router-dom";

import { FolderPlus, FileText, IndianRupee, Code2 , RocketIcon } from "lucide-react";

import {getProjectById , updateProject } from "../../services/projectService";

const EditProject = () => {

  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skillsRequired: []
  });

const { id } = useParams();

useEffect(() => {

    const fetchProject = async () => {

        const data = await getProjectById(id);

        setFormData({
            title: data.project.title,
            description: data.project.description,
            budget: data.project.budget,
            skillsRequired: data.project.skillsRequired
        });

    };

    fetchProject();

}, [id]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const addSkill = () => {

    const skill = skillInput.trim();

    if (!skill) return;

    if (formData.skillsRequired.includes(skill)) return;

    setFormData({
      ...formData,
      skillsRequired: [...formData.skillsRequired, skill]
    });

    setSkillInput("");

  };

  const removeSkill = (skill) => {

    setFormData({
      ...formData,
      skillsRequired: formData.skillsRequired.filter(
        s => s !== skill
      )
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setSaving(true);
     // console.log(formData)
      await updateProject(id,{
        ...formData,
        budget: Number(formData.budget)
      });

      navigate("/my-projects");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Something went wrong."
      );

    } finally {

      setSaving(false);

    }

  };

  return (

    <div className={styles.container}>

      {/* Header */}

      <div className={styles.pageHeader}>

        <div>

          <h1>Create Project</h1>

          <p>
            Describe your project and receive proposals from developers.
          </p>

        </div>

      </div>

      {/* Card */}

      <div className="card">

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

          {/* Title */}

          <div className={styles.formGroup}>

            <label>

              <FolderPlus size={18} />

              Project Title

            </label>

            <input
              className="input"
              type="text"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleChange}
              maxLength={150}
            />

            <small>
              Minimum 10 characters • Maximum 150 characters
            </small>

          </div>

          {/* Description */}

          <div className={styles.formGroup}>

            <label>

              <FileText size={18} />

              Project Description

            </label>

            <textarea
              className={styles.textarea}
              rows={8}
              name="description"
              placeholder="Describe your project in detail..."
              value={formData.description}
              onChange={handleChange}
              maxLength={5000}
            />

            <small>
              Minimum 50 characters • Maximum 5000 characters
            </small>

          </div>

          {/* Budget */}

          <div className={styles.formGroup}>

            <label>

              <IndianRupee size={18} />

              Budget

            </label>

            <input
              className="input"
              type="number"
              name="budget"
              min={1}
              placeholder="Enter your budget"
              value={formData.budget}
              onChange={handleChange}
            />

          </div>

          {/* Skills */}

          <div className={styles.formGroup}>

            <label>

              <Code2 size={18} />

              Skills Required

            </label>

            <div className={styles.skillTags}>

              {formData.skillsRequired.map(skill => (

                <span
                  key={skill}
                  className={styles.skill}
                >

                  {skill}

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                  >
                    ×
                  </button>

                </span>

              ))}

            </div>

            <div className={styles.skillInput}>

              <input
                className="input"
                placeholder="React"
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
              />

              <button
                type="button"
                className="btn-secondary"
                onClick={addSkill}
              >
                + Add Skill
              </button>

            </div>

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
              onClick={() => navigate("/projects")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            > 
            <RocketIcon size={20}/>
              {saving ? "Editing..." : "Edit Project"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditProject;