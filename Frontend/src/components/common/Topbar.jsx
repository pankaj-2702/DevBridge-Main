import styles from "./Topbar.module.css";
import useAuth from "../../hooks/useAuth";
import { Bell, User , MenuIcon,
  CrossIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const visitProfile = ()=>{
   
    navigate("/profile");
  }
   const visitNotifications = ()=>{
     
    window.alert("Notifications\n Coming in DevBridge v1.1\nYou'll receive updates about\n• Contracts\n• Applications\n• Reviews");
    //navigate("/messages");
  }
  //console.log(user)
  return (

     
      
      <header className={styles.topbar}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
        <MenuIcon size={20} />
      </button>

      {/* Left */}

      <div className={styles.left}>
        <h2>
          Welcome back, {user?.name} 
          
        </h2>

        <p>
          Ready to build something amazing today?
        </p>
      </div>

      {/* Right */}

      <div className={styles.right}>

        {/* Optional Notification */}

        <button
         className={styles.iconBtn}
         onClick={visitNotifications}
         >
          <Bell size={20} />
        </button>

        {/* Profile */}

        <div className={styles.profile}
        onClick={visitProfile}
        >

          {user?.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt={user.name}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>
              <User size={20} />
            </div>
          )}

          <span>{user?.name}</span>

        </div>

      </div>

    </header>
    
    
  );
};

export default Topbar;