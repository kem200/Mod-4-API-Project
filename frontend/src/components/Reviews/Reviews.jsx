import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getReviews } from "../../store/reviews";
import { useSelector } from "react-redux";
import PostReviewModal from "../PostReviewModal/PostReviewModal";
import OpenModalButton from "../OpenModalButton";
import './Reviews.css'

function Reviews({spotId, ownerId}) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => Object.values(state.review.reviews))
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

    useEffect(() => {

    }, [reviews])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const handleReviewButtonRender = () => {
        if (!sessionUser) return false;
        if (sessionUser.id === ownerId) return false;
        const hasPostedReview = reviews.some(review => review.userId === sessionUser.id);
        return !hasPostedReview;
    };

    const handleFirstReviewRender = () => {
        if (reviews.length === 0 && handleReviewButtonRender()) return true;
    }

    return (
        <div className="review-box">
            {handleReviewButtonRender() && (
                <OpenModalButton
                 buttonText={'Post a review!'}
                 modalComponent={<PostReviewModal spotId={spotId}/>}
                />
            )}
            {handleFirstReviewRender() && (
                <p>Be the first to post a review!</p>
            )}
            {[...reviews].reverse().map(review => (
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
