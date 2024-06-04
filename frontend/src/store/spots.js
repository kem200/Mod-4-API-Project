import { csrfFetch } from './csrf';

const GET_SPOTS = "spots/getSpots";

const getSpot = (spots) => {
    return {
        type: GET_SPOTS,
    };
};

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpot(data))
    }
}

const initialState = {};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            return { ...state };
        default:
            return state;
    }
};

export default spotReducer;
