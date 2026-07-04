import styles from './Auth.module.css'
import { useState } from "react";
import { login as loginAPI } from '../../services/authService';
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom";

const Login = () => {


const {login} = useAuth();
const navigate = useNavigate();

const [formData, setFormData] = useState({
  
  email: "",
  password: ""
 
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
        const data = await loginAPI(formData);

        //console.log("Login Successful");
        //console.log(data);
        login(data);
        navigate("/dashboard");
        // Later:
        // navigate("/login");

    } catch (err) {

        console.error(err);

        setError(
            err.response?.data?.message ||
            err.response?.data?.msg ||
            "Login failed"
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
          
          <h2>Welcome back</h2>
          <p>Start building amazing things with DevBridge.</p>

          
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
             placeholder="Enter password"
             name="password"
               value={formData.password}
              onChange={handleChange}
             />
          </div>
          
          {error && <p className={styles.error}>{error}</p>}
          <button 
          className="btn-primary"
          type='submit'
          disabled ={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className={styles.footer}>
            New to DevBridge?{' '}
            <Link to="/register">Create Account</Link>
          </p>
          
        </div>
      </div>
    </div>
    </form>
  )
}

export default Login