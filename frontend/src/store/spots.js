import { csrfFetch } from './csrf';

const GET_SPOTS = "spots/getSpots";
const GET_SPOT_DETAILS = 'spots/getSpotDetails';
const CREATE_SPOT = 'spots/createSpot'
const ADD_IMAGE = 'spots/addImage';

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

const createSpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}

const addImage = (image) => ({
    type: ADD_IMAGE,
    image,
})

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

export const createNewSpot = (newSpot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSpot)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createSpot(data))
        return data;
    }
}

export const addImageToSpot = (spotId, url, preview) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, preview }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addImage({ ...data, spotId }));
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add image');
    }
};

const initialState = { spots: {}, currentSpot: {}, spotImages: {} };

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
        case CREATE_SPOT: {
            const newState = { ...state, spots: { ...state.spots } };
            newState.spots[action.newSpot.id] = action.newSpot;
            return newState;
        }
        case ADD_IMAGE: {
            const newState = { ...state };
            const spotId = action.image.spotId;
            if (!newState.spotImages[spotId]) {
                newState.spotImages[spotId] = [];
            }
            newState.spotImages[spotId].push(action.image);
            return newState;
        }

        default: {
            return state;
        }
    }
};


export default spotReducer;
