import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews';
const CLEAR_REVIEWS = 'reviews/clearReviews';

const getReview = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

const clearReviews = () => {
    return {
        type: CLEAR_REVIEWS
    };
};

export const getReviews = (spotId) => async (dispatch) => {
    dispatch(clearReviews());
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getReview(data.Reviews));
    }
};

const initialState = { reviews: {} };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = { ...state, reviews: {} };
            action.reviews.forEach(review => {
                newState.reviews[review.id] = review;
            });
            return newState;
        }
        case CLEAR_REVIEWS: {
            return { reviews: {} };
        }
        default: {
            return state;
        }
    }
};

export default reviewReducer;
