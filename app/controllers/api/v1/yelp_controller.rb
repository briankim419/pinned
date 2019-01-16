class Api::V1::YelpController < Api::V1::ApiController

  def search
    term = params[:term]
    location = params[:location]
    yelp_parser = YelpParser.new
    yelp_parser.search(term, location)
    render json: { data: yelp_parser.data}
  end
end
