import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews';
const CLEAR_REVIEWS = 'reviews/clearReviews';
const CREATE_REVIEW = 'reviews/createReview'

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

const createReview = (newReview) => {
    return {
        type: CREATE_REVIEW,
        payload: newReview
    }
}

export const getReviews = (spotId) => async (dispatch) => {
    dispatch(clearReviews());
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getReview(data.Reviews));
    }
};

export const postReview = (spotId, newReview) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createReview(data))
        return data
    } else {
        const error = await response.json();
        return { errors: error.errors || 'Failed to post review' };
    }
}

const initialState = { reviews: {} };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = { ...state };
            action.reviews.forEach(review => {
                newState.reviews[review.id] = review;
            });
            return newState;
        }
        case CLEAR_REVIEWS: {
            return { reviews: {} };
        }
        case CREATE_REVIEW: {
            const newState = { ...state }
            newState.reviews = { ...state.reviews, [action.payload.id]: action.payload };
            return newState
        }
        default: {
            return state;
        }
    }
};

export default reviewReducer;
