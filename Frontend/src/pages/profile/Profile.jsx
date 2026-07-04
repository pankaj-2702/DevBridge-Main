import styles from "./Profile.module.css";

import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { getMe } from "../../services/userService";

import { getUserReviews } from "../../services/reviewService";

import ReviewCard from '../../components/review/ReviewCard'

import {
  User,
  Mail,
  CalendarDays,
  ShieldCheck,
  Code2,
  Link2 as LinkIcon,
  Camera,
  Globe,
  Star,
  MessageSquare
} from "lucide-react";
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton";

const Profile = () => {
  
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  
 
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const data = await getMe();

        setUser(data.data);

       const reviewData = await getUserReviews(data.data._id);
        
        setReviews(reviewData.reviews);

      } catch (err) {

        //console.log(err);

      }

    };

    fetchProfile();

  }, []);

  if (!user) return <UniversalPageSkeleton />;

  return (

    <div className={styles.container}>

      {/* Heading */}

      <div className={styles.pageHeader}>

        <div>

          <h1>My Profile</h1>

          <p>Manage your profile information and preferences.</p>

        </div>
        
        <div className={styles.editBtn}>
        <Link
          to="/profile/editprofile"
          className="btn-primary"
        >
          Edit Profile
        </Link>
        </div>
      </div>

      {/* ================= Hero Card ================= */}

      <div className="card">

        <div className={styles.hero}>

          {/* Avatar */}

          <div className={styles.avatarSection}>

            {user.profilePhoto ? (

              <img
                src={user.profilePhoto}
                alt={user.name}
                className={styles.avatar}
              />

            ) : (

              <div className={styles.avatarPlaceholder}>

                <User size={60} />

              </div>

            )}
            <Link
             to="/profile/editprofile"
            >
            <button 
            className={styles.cameraBtn}
            >
          
              <Camera size={18} />

            </button>
            </Link>
          </div>

          {/* Right */}

          <div className={styles.heroContent}>

            <div className={styles.nameRow}>

              <h2>{user.name}</h2>

              <span className="tag">

                {user.role}

              </span>

            </div>

            <div className={styles.topInfo}>

              <span>{user.email}</span>

              <span>

                Member since{" "}

                {new Date(user.createdAt).toLocaleDateString()}

              </span>

              <span className="text-success">

                Active

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Grid ================= */}

      <div className={styles.grid}>

        {/* Left */}

        <div className={styles.leftColumn}>

          {/* About */}

          <div className="card">

            <div className={styles.cardTitle}>

              <User size={20} />

              <h3>About Me</h3>

            </div>

            <p>

              {user.bio || "No bio added yet."}

            </p>

          </div>

          <div className="card">
          
                      <div className={styles.cardTitle}>
          
                        <LinkIcon size={20} />
          
                        <h3>Portfolio</h3>
          
                      </div>
          
                      <div className={styles.links}>
          
                        {user.portfolioLinks.length ? (
          
                          user.portfolioLinks.map((item, index) => (
          
                            <a
                              key={index}
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.linkItem}
                            >
          
                              <LinkIcon size={18} />
          
                              <div>
          
                                <strong>{item.title}</strong>
          
                                <small>{item.link}</small>
          
                              </div>
          
                            </a>
          
                          ))
          
                        ) : (
          
                          <p className="text-muted">
          
                            No portfolio links added.
          
                          </p>
          
                        )}
          
                      </div>
          
                    </div>

                    <div className="card">

    <h3>

        Reviews ({reviews.length})

    </h3>

    {reviews.length === 0 ? (

        <p>

            No reviews yet.

        </p>

    ) : (

        <div className={styles.reviewList}>

            {reviews.map(review => (

                <ReviewCard
                    key={review._id}
                    review={review}
                />

            ))}

        </div>

    )}

</div>

         
        </div>

        {/* Right */}

        <div className={styles.rightColumn}>

          {/* Portfolio */}
           {/* Skills */}

          <div className="card">

            <div className={styles.cardHeader}>

              <div className={styles.cardTitle}>

                <Code2 size={20} />

                <h3>Skills</h3>

              </div>

            </div>

            <div className={styles.skills}>

              {user.skills.length > 0 ? (

                user.skills.map(skill => (

                  <span
                    key={skill}
                    className="tag"
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <p>No skills added.</p>

              )}

            </div>

          </div>

          

        {/* Personal Info */}
       <div className="card">

  <div className={styles.cardTitle}>
    <ShieldCheck size={20} />
    <h3>Personal Information</h3>
  </div>

  <div className={styles.infoTable}>

    <div>
      <Mail size={18} />
      <span>Email</span>
    </div>
    <span>{user.email}</span>

    <div>
      <User size={18} />
      <span>Role</span>
    </div>
    <span>{user.role}</span>

    <div>
      <CalendarDays size={18} />
      <span>Member Since</span>
    </div>
    <span>
      {new Date(user.createdAt).toLocaleDateString()}
    </span>

    <div>
      <Star size={18} />
      <span>Rating</span>
    </div>
    <span>
      {user.rating.toFixed(1)} / 5
    </span>

    <div>
      <MessageSquare size={18} />
      <span>Total Reviews</span>
    </div>
    <span>{user.totalReviews}</span>

    <div>
      <ShieldCheck size={18} />
      <span>Account Status</span>
    </div>
    <span className="text-success">
      {user.isActive ? "Active" : "Inactive"}
    </span>

  </div>

</div>
              

            

          

        </div>

      </div>

    </div>

  );

};

export default Profile;