import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getReviews } from "../../store/reviews";
import { useSelector } from "react-redux";
import './Reviews.css'

function Reviews({spotId}) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => Object.values(state.review.reviews))

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    return (
        <div className="review-box">
            {reviews.map(review => (
                <div key={review.id}>
                    <h4>{review.User.firstName}</h4>
                    <p className="date">{formatDate(review.createdAt)}</p>
                    <p className="review-p">{review.review}</p>
                </div>
            ))}
        </div>
    )
}

export default Reviews
