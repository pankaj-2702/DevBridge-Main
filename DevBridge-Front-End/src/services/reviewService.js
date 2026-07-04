import api from "./api";

export const createReview = async (contractId, reviewData) => {

    const response = await api.post(
        `/reviews/${contractId}`,
        reviewData
    );

    return response.data;
};

export const getUserReviews = async (userId) => {

    const response = await api.get(
        `/reviews/user/${userId}`
    );

    return response.data;
};