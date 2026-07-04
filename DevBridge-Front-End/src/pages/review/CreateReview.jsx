import styles from "./CreateReview.module.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RatingStars from "../../components/review/RatingStars";
import { createReview } from "../../services/reviewService";

const CreateReview = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (rating === 0) {

            setError("Please select a rating.");

            return;

        }

        try {

            setSaving(true);

           const data = await createReview(id, {
                rating,
                comment
            });
           console.log(data)
           navigate(`/users/${data.review.revieweeId}`);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to submit review."
            );

        } finally {

            setSaving(false);

        }

    };

    return (

        <div className={styles.container}>

            <div className="card">

                <h1>Leave a Review</h1>

                <p>
                    Share your experience working on this project.
                </p>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >

                    <div className={styles.formGroup}>

                        <label>Your Rating</label>

                        <RatingStars
                            rating={rating}
                            setRating={setRating}
                        />

                    </div>

                    <div className={styles.formGroup}>

                        <label>Comment</label>

                        <textarea
                            rows={6}
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            placeholder="Tell others about your experience..."
                            className={styles.textarea}
                        />

                    </div>

                    {error && (

                        <p className={styles.error}>
                            {error}
                        </p>

                    )}

                    <div className={styles.actions}>

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Submitting..."
                                : "Submit Review"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateReview;