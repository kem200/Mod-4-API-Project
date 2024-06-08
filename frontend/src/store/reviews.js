import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews'

const getReview = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getReview(data.Reviews))
    }
}

const initialState = { reviews: {} }

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = { ...state }
            action.reviews.forEach(review => {
                newState.reviews[review.id] = review;
            });
        }
        default: {
            return state;
        }
    }
}

export default reviewReducer
