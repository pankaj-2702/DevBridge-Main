import styles from "./ReviewCard.module.css";

import { Link } from "react-router-dom";

import {
    User,
    CalendarDays
} from "lucide-react";

import RatingStars from "./RatingStars";

const ReviewCard = ({ review }) => {

    return (

        <div className="card">

            {/* Top */}

            <div className={styles.topRow}>

                <div className={styles.user}>

                    {review.reviewerId.profilePhoto ? (

                        <img
                            src={review.reviewerId.profilePhoto}
                            alt={review.reviewerId.name}
                            className={styles.avatar}
                        />

                    ) : (

                        <div className={styles.avatarFallback}>
                            <User size={20}/>
                        </div>

                    )}

                    <div>

                        <Link
                            to={`/users/${review.reviewerId._id}`}
                            className={styles.userName}
                        >
                            {review.reviewerId.name}
                        </Link>

                        <p className={styles.projectName}>
                            {review.projectId.title}
                        </p>

                    </div>

                </div>

                <RatingStars
                    rating={review.rating}
                    readOnly
                />

            </div>

            {/* Review */}

            <p className={styles.comment}>

                {review.comment}

            </p>

            {/* Footer */}

            <div className={styles.footer}>

                <div className={styles.metaItem}>

                    <CalendarDays size={16}/>

                    <span>

                        {new Date(review.createdAt).toLocaleDateString()}

                    </span>

                </div>

            </div>

        </div>

    );

};

export default ReviewCard;