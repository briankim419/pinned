class Api::V1::LocationController < Api::V1::ApiController

  def search
    @locations = Location.where("name ILIKE ? OR description ILIKE ?", "%#{params['search_string']}%", "%#{params['search_string']}%")
    render json: @locations
  end

end
