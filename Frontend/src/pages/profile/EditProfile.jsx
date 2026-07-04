import styles from "./EditProfile.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton"
import { getMe, updateMe, uploadPhoto } from "../../services/userService";


const EditProfile = () => {

  const navigate = useNavigate();
  const {updateUser} = useAuth();
  const [loading, setLoading] = useState(true);
  
const [photo, setPhoto] = useState(null);

  const [error,setError] = useState("");

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: [],
    portfolioLinks: []
  });

  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const data = await getMe();

        setFormData({
          name: data.data.name,
          bio: data.data.bio || "",
          skills: data.data.skills || [],
          portfolioLinks: data.data.portfolioLinks || []
        });

      } catch (err) {
           setError(
            err.response?.data?.message ||
            err.response?.data?.msg ||
            "Failed"
        );
        console.lo(err);

      } finally {

        setLoading(false);

      }

    };

    fetchUser();

  }, []);

  if (loading) return <UniversalPageSkeleton />;

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  if (loading) return <h2>Loading...</h2>;

  const addSkill = () => {

  if (!skillInput.trim()) return;

  if (formData.skills.includes(skillInput.trim())) return;

  setFormData({
    ...formData,
    skills: [...formData.skills, skillInput.trim()]
  });

  setSkillInput("");

};

const removeSkill = (skill) => {

  setFormData({
    ...formData,
    skills: formData.skills.filter(s => s !== skill)
  });

};

const addPortfolio = () => {

  setFormData({
    ...formData,
    portfolioLinks: [
      ...formData.portfolioLinks,
      {
        title: "",
        link: ""
      }
    ]
  });

};

const updatePortfolio = (index, field, value) => {

  const updated = [...formData.portfolioLinks];

  updated[index][field] = value;

  setFormData({
    ...formData,
    portfolioLinks: updated
  });

};

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setSaving(true);
    if(photo){
      await uploadPhoto(photo)
    }
    await updateMe(formData);
    
    const data = await getMe()
    updateUser(data.data);
    
    navigate("/profile");

  } catch (err) {

    setError(
            err.response?.data?.message ||
            err.response?.data?.msg ||
            "Failed"
        );
        //console.log(err);

  } finally {

    setSaving(false);

  }

};

const removePortfolio = (index) => {

  setFormData({
    ...formData,
    portfolioLinks: formData.portfolioLinks.filter((_, i) => i !== index)
  });

};

  return (

    <div className={styles.container}>

      <h1>Edit Profile</h1>
     <form
      onSubmit={handleSubmit}>

        <div className={styles.formGroup}>

  <label>Profile Photo</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setPhoto(e.target.files[0])}
  />

</div>
      <div className={styles.formGroup}>

        <label>Full Name</label>

        <input
          className="input"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

      </div>

      <div className={styles.formGroup}>

        <label>Bio</label>

        <textarea
          className={styles.textarea}
          name="bio"
          rows={5}
          value={formData.bio}
          onChange={handleChange}
        />
        
      </div>

      <div className={styles.formGroup}>

  <label>Skills</label>

  <div className={styles.skillTags}>

    {formData.skills.map(skill => (

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
      value={skillInput}
      placeholder="React"
      onChange={(e) => setSkillInput(e.target.value)}
    />

    <button
      className="btn-secondary"
      type="button"
      onClick={addSkill}
    >
      Add
    </button>

  </div>

</div>

<div className={styles.formGroup}>

  <label>Portfolio Links</label>

  {formData.portfolioLinks.map((item, index) => (

    <div
      key={index}
      className={styles.portfolioRow}
    >

      <input
        className="input"
        placeholder="Title"
        value={item.title}
        onChange={(e) =>
          updatePortfolio(index, "title", e.target.value)
        }
      />

      <input
        className="input"
        placeholder="https://..."
        value={item.link}
        onChange={(e) =>
          updatePortfolio(index, "link", e.target.value)
        }
      />

      <button
        type="button"
        className="btn-secondary"
        onClick={() => removePortfolio(index)}
      >
        Remove
      </button>

    </div>

  ))}

  <button
    type="button"
    className="btn-secondary"
    onClick={addPortfolio}
  >
    + Add Link
  </button>

</div>
{error && <p className={styles.error}>{error}</p>}
<div className={styles.actions}>

  <button
    type="button"
    className="btn-secondary"
    onClick={() => navigate("/profile")}
  >
    Cancel
  </button>

  <button
    className="btn-primary"
    type="submit"
    disabled={saving}
  >
    {saving ? "Saving..." : "Save Changes"}
  </button>

</div>

</form>



    </div>

    

  );

};

export default EditProfile;