import React, { Component } from 'react';
import ReviewsFormContainer from './ReviewsFormContainer'
import StarRatingComponent from 'react-star-rating-component';

class ReviewsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
    this.addNewReview = this.addNewReview.bind(this);
  }
  addNewReview(reviewPayload) {
    debugger
   if(this.state.reviews.length == undefined){
     debugger;
     let firstReview = this.state.reviews
     debugger;
     firstReview = [reviewPayload]
     debugger;
     this.setState({reviews: firstReview})
   }else {
     debugger
   let newReviews = this.state.reviews.concat(reviewPayload)
   this.setState({ reviews: newReviews })
    }
  }
  componentDidMount() {
    fetch(`/api/v1/schedules/${this.props.id}/reviews`)
    .then(response => { debugger;
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(message);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(fetchedReviews => {
      this.setState({ reviews: fetchedReviews})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let allReviews = this.state.reviews
    let reviewList
    let reviewForm = <div className = "small-12 small-centered medium-4 columns row"> <ReviewsFormContainer
        id={this.props.id}
        addNewReview={this.addNewReview}
      />
      </div>
    if (Array.isArray(allReviews) && allReviews.length != 0) {
      debugger;
      reviewList = allReviews.map(review =>
      <div className="reviewstile small-12 small-centered medium-4 columns row" >
        <div className="reviews" key={review.id}>
          <div className="reviews-content ">
            <StarRatingComponent
              key={review.id}
              name="app4"
              editing={false}
              starCount={5}
              value={review.rating} />
            <h4>{review.body}</h4>
          </div>
        </div>
      </div>
    )
    }
    return(
      <div>
        {reviewForm}
        <h3 className="center titleBorder small-12 small-centered medium-4 columns row">Reviews</h3>

        {reviewList}
      </div>

    )
  }
}

export default ReviewsIndexContainer;
