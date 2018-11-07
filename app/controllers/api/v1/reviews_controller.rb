class Api::V1::ReviewsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  # before_action :authenticate_user!, except: [:index, :show]

  def index
    render json: Schedule.find(params[:schedule_id]).reviews
  end

  def show
    render json: Review.find(params[:id])
  end

  def new
    review = Review.new(body: data[:body], rating: data[:rating])

    render json: {review: review}
  end

  def create
    review = Review.create(body: params[:body], rating: params[:rating], schedule_id: params[:schedule_id])
    render json: {review: review}
  end


  private

  def review_params
    params.require(:review).permit(:body, :rating, :schedule_id)
  end
end
