require "json"
require "http"
require "optparse"

class YelpParser
  attr_reader :data

  API_KEY = ENV["YELP_KEY"]

  # Constants, do not change these
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  BUSINESS_PATH = "/v3/businesses/"  # trailing / because we append the business id to the path
  AUTO_PATH  = "/v3/autocomplete"

  DEFAULT_BUSINESS_ID = "yelp-san-francisco"
  DEFAULT_TERM = "dinner"
  DEFAULT_LOCATION = "San Francisco, CA"
  SEARCH_LIMIT = 6

  def initialize
    @data = []
  end

  def auto (text, location)
    url = "#{API_HOST}#{AUTO_PATH}"
    params = {
      text: text,
      location: location,
      limit: SEARCH_LIMIT
    }
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params).parse
    puts response
  end

  def search(term, location)
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      term: term,
      location: location,
      limit: SEARCH_LIMIT
    }
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params).parse
    response["businesses"].each do |biz|
      review_data = {
        name: biz["name"],
        rating: biz["rating"],
        image: biz["image_url"],
        url: biz["url"],
        price: biz["price"],
        phone: biz["phone"],
        yelp_id: biz["id"],
        address: biz["location"]["address1"],
        zip_code: biz["location"]["zip_code"],
        review_count: biz["review_count"],
        city: biz["location"]["city"],
        state: biz["location"]["state"],
        display_address: biz["location"]["display_address"],
        longitude: biz["coordinates"]["longitude"],
        latitude: biz["coordinates"]["latitude"]
      }
      @data << review_data
    end

  end

  def business(business_id)
    url = "#{API_HOST}#{BUSINESS_PATH}#{business_id}"

    response = HTTP.auth("Bearer #{API_KEY}").get(url)
    response.parse
  end

end
