import { csrfFetch } from './csrf';

const GET_SPOTS = "spots/getSpots";

const getSpot = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpot(data.Spots));
    }
}

const initialState = { spots: {} };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state };
            action.spots.forEach(spot => {
                newState.spots[spot.id] = spot;
            });
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default spotReducer;
