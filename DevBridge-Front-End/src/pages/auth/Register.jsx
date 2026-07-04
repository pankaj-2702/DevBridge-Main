import styles from './Auth.module.css'
import { useState } from "react";
import { register } from '../../services/authService';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
const Register = () => {

const { login } = useAuth();
    const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  role: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) =>{
  e.preventDefault();
  setLoading(true);
    setError("");

    try {
        const data = await register(formData);

        //console.log("Registration Successful");
        //console.log(data);
        login(data)
        navigate("/dashboard");
        // Later:
        // navigate("/login");

    } catch (err) {

        console.error(err);

        setError(
            err.response?.data?.message ||
            err.response?.data?.msg ||
            "Registration failed"
        );

    } finally {

        setLoading(false);

    }
}

  return (
    <form onSubmit={handleSubmit} > 
    <div className={styles.authPage}>
      <div className={styles.authCard}>

        <div className={styles.authLeft}>
          <h1>DevBridge</h1>
          <p>Connect with top developers and bring your projects to life.</p>
          <p>Join thousands of clients and developers already building together.</p>
        </div>

        <div className={styles.authRight}>
          
          <h2>Create your account</h2>
          <p>Start building amazing things with DevBridge.</p>

          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input 
            className="input"
              type="text"
              placeholder="John Doe" 
              name="name"
               value={formData.name}
              onChange={handleChange}
              />
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
             className="input"
              type="email"
               placeholder="you@example.com"
               name="email"
               value={formData.email}
              onChange={handleChange}
               />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
             className="input" 
             type="password" 
             placeholder="Create a password"
             name="password"
               value={formData.password}
              onChange={handleChange}
             />
          </div>

          <div className={styles.formGroup}>
            <label>I am a</label>
            <select 
            className="input"
            name="role"
            value={formData.role}
            onChange={handleChange}
            >
              <option value="">Select your role</option>
              <option value="client">Client — I want to post projects</option>
              <option value="developer">Developer — I want to find work</option>
            </select>
          </div>
          
          {error && <p className={styles.error}>{error}</p>}
          <button 
          className="btn-primary"
          type='submit'
          >Create Account</button>

          <p className={styles.footer}>
            Already have an account?{' '}
            <a href="/login">Login here</a>
          </p>
          
        </div>
      </div>
    </div>
    </form>
  )
}

export default Register