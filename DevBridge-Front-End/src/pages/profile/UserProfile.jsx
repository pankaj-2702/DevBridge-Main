import styles from "./Profile.module.css";
import { getUserReviews } from "../../services/reviewService";
import ReviewCard from "../../components/review/ReviewCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUserById } from "../../services/userService";

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
  MessageSquare,
  Briefcase
} from "lucide-react";
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton";

const UserProfile = () => {

  const { id } = useParams();
 
 const [reviews, setReviews] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const data = await getUserById(id);

        setUser(data.user);

        //const userData = await getUserById(id);

       //setProfile(userData.user);

      const reviewData = await getUserReviews(id);

       setReviews(reviewData.reviews);

      } catch (err) {

        //console.log(err);

      }

    };

    fetchUser();

  }, [id]);

  if (!user) return <UniversalPageSkeleton />;

  return (

    <div className={styles.container}>

      {/* Header */}

      <div className={styles.pageHeader}>

        <div>

          <h1>User Profile</h1>

          <p className="text-muted">
            View developer/client profile
          </p>

        </div>

      </div>

      {/* Hero */}

      <div className="card">

        <div className={styles.hero}>

          <div className={styles.avatarSection}>

            {user.profilePhoto ? (

              <img
                src={user.profilePhoto}
                alt={user.name}
                className={styles.avatar}
              />

            ) : (

              <div className={styles.avatarPlaceholder}>
                <User size={46} />
              </div>

            )}

          </div>

          <div className={styles.heroContent}>

            <div className={styles.nameRow}>

              <h2>{user.name}</h2>

              <span className="badge">
                {user.role}
              </span>

            </div>

            <div className={styles.topInfo}>

              <span>

                <Star size={16} />

                {user.rating.toFixed(1)} ({user.totalReviews} Reviews)

              </span>

              <span>

                <ShieldCheck size={16} />

                {user.isActive ? "Active" : "Inactive"}

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Main Grid */}

      <div className={styles.grid}>

        {/* Left */}

        <div className={styles.leftColumn}>

          {/* Bio */}

          <div className="card">

            <div className={styles.cardTitle}>

              <User size={20} />

              <h3>About</h3>

            </div>

            <p>

              {user.bio || "No bio added yet."}

            </p>

          </div>

          {/* Portfolio */}

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

          {/* Skills */}

          <div className="card">

            <div className={styles.cardTitle}>

              <Briefcase size={20} />

              <h3>Skills</h3>

            </div>

            <div className={styles.skills}>

              {user.skills.length ? (

                user.skills.map(skill => (

                  <span
                    key={skill}
                    className="tag"
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <span className="text-muted">

                  No skills added

                </span>

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

export default UserProfile;