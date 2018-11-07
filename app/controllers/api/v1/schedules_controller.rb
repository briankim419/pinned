class Api::V1::SchedulesController < Api::V1::ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def search
    @schedules = Schedule.where("title ILIKE ? OR body ILIKE ?", "%#{params['search_string']}%", "%#{params['search_string']}%")
    render json: @schedules
  end

  def new
    schedule = Schedule.new
    render json: {schedule: schedule}
  end

  def show
    schedule = Schedule.find(params[:id])

    render json: schedule

  end

  def create
    schedule = Schedule.new(schedule_params)
    if schedule.save
      yelp_parser = YelpParser.new
      if params[:savedID]["0"]
        response = yelp_parser.business(params[:savedID]["0"])
        address = response["location"]
        loc1 = Location.create(name: response["name"], state: address["state"], city: address["city"], zipcode: address["zip_code"], address: address["address1"], longitude: response["coordinates"]["longitude"], latitude:response["coordinates"]["latitude"], image: response["photos"][0])
        Timeslot.create(location_id:loc1.id,schedule_id:schedule.id)
      end
      if params[:savedID]["1"]
        response = yelp_parser.business(params[:savedID]["1"])
        address = response["location"]
        loc1 = Location.create(name:response["name"], state: address["state"], city: address["city"], zipcode: address["zip_code"], address: address["address1"], longitude: response["coordinates"]["longitude"], latitude:response["coordinates"]["latitude"], image:response["photos"][0])
        Timeslot.create(location_id:loc1.id,schedule_id:schedule.id)
      end
      if params[:savedID]["2"]
        response = yelp_parser.business(params[:savedID]["2"])
        address = response["location"]
        loc1 = Location.create(name:response["name"], state: address["state"], city: address["city"], zipcode: address["zip_code"], address: address["address1"], longitude: response["coordinates"]["longitude"], latitude:response["coordinates"]["latitude"], image:response["photos"][0])
        Timeslot.create(location_id:loc1.id,schedule_id:schedule.id)
      end
    render json: { schedule: schedule}, adapter: :json
    else
      render json: { error: schedule.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def schedule_params
    params.require(:schedule).permit(:title, :body)
  end
end
