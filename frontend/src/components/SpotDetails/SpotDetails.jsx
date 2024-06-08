
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { useParams } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';
import './SpotDetails.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spot.currentSpot);

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch, spotId]);

    if (!spot.id) {
        return <div>Loading...</div>;
    }

    const previewImage = spot.SpotImages.find(image => image.preview);
    const otherImages = spot.SpotImages.filter(image => !image.preview);
    const mainImage = previewImage ? previewImage.url : (otherImages[0] ? otherImages[0].url : null);
    const visibleThumbnails = spot.SpotImages.filter(image => !image.preview).slice(0, 4);

    return (
        <div className="spot-details">
            <div className="spot-header">
                <h1>{spot.name}</h1>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div className="spot-images">
                {mainImage ? (
                    <img className="main-image" src={mainImage} alt={spot.name} />
                ) : (
                    <div className="main-image-alt">{spot.name}</div>
                )}
                <div className="thumbnail-wrapper">
                    {visibleThumbnails.map((image, index) => (
                        <img key={index} src={image.url} alt={`${spot.name} ${index + 1}`} />
                    ))}
                </div>
            </div>
            <div className='wrapper'>
                <div className="spot-hosted">
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p className='spot-description'>{spot.description}</p>
                </div>
                <div className="spot-reserve">
                    <div className="price-and-rating">
                        <p className="spot-price">${spot.price} / night</p>
                        <p className="spot-rating">
                            ★ {spot.avgStarRating || 'New'}
                            {spot.numReviews > 0 && ` · ${spot.numReviews} reviews`}
                        </p>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div className="spot-reviews">
                <h2>
                    ★ {spot.avgStarRating || 'New'}
                    {spot.numReviews > 0 && ` · ${spot.numReviews} reviews`}
                </h2>
                <Reviews spotId={spotId} />
            </div>
        </div>
    );
}

export default SpotDetails;
