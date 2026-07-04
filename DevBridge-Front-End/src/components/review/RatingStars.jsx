import { Star } from "lucide-react";

const RatingStars = ({ rating, setRating, readOnly = false }) => {

    return (

        <div
            style={{
                display: "flex",
                gap: "8px"
            }}
        >

            {[1, 2, 3, 4, 5].map((star) => (

                <Star
                    key={star}
                    size={32}
                    fill={star <= rating ? "#fbbf24" : "none"}
                    color={star <= rating ? "#fbbf24" : "#6b7280"}
                    style={{
                        cursor: readOnly ? "default" : "pointer",
                        transition: ".2s"
                    }}
                    onClick={() => {

                        if (!readOnly) {

                            setRating(star);

                        }

                    }}
                />

            ))}

        </div>

    );

};

export default RatingStars;