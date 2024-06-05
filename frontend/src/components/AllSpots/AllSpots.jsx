import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { selectSpots } from "../../store/selectors";
import './AllSpots.css';

function AllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(selectSpots);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    if (!spots || spots.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <main className="spots-main">
            <div className="spots-grid">
                {spots.map(spot => (
                    <div key={spot.id} className="spot-card">
                        <img src={'https://a0.muscache.com/im/pictures/5e67688b-757d-44d6-8b4b-1e91dc6fe49f.jpg?im_w=1920'} alt={spot.name} />
                        <div className="spot-info">
                            <h3>{spot.name}</h3>
                            <div className="spot-location">
                                <p>{spot.city}, {spot.state}</p>
                                <p className="spot-rating">⭐ {spot.avgStarRating || "No rating"}</p>
                            </div>
                            <p className="spot-price">${spot.price} / night</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default AllSpots;
