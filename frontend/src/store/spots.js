import { csrfFetch } from './csrf';

const GET_SPOTS = "spots/getSpots";
const GET_SPOT_DETAILS = 'spots/getSpotDetails';

const getSpot = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const spotDetails = (spotDetail) => {
    return {
        type: GET_SPOT_DETAILS,
        spotDetail
    };
};

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpot(data.Spots));
    }
}

export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(spotDetails(data));
    }
}

const initialState = { spots: {}, currentSpot: {} };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state };
            action.spots.forEach(spot => {
                newState.spots[spot.id] = spot;
            });
            return newState;
        }
        case GET_SPOT_DETAILS: {
            const newState = { ...state };
            newState.currentSpot = action.spotDetail;
            newState.spots[action.spotDetail.id] = action.spotDetail;
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default spotReducer;
