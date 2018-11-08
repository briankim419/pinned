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

# yp = YelpParser.new
# yp.auto("cof", "boston")



# search("bowling", "boston")


# Look up a business by a given business id. Full documentation is online at:
# https://www.yelp.com/developers/documentation/v3/business
#
# business_id - a string buiness id
#
# Examples
#
#   business("yelp-san-francisco")
#   # => {
#          "name": "Yelp",
#          "id": "yelp-san-francisco"
#          ...
#        }
#
# Returns a parsed json object of the request

#
#
# options = {}
# OptionParser.new do |opts|
#   opts.banner = "Example usage: ruby sample.rb (search|lookup) [options]"
#
#   opts.on("-tTERM", "--term=TERM", "Search term (for search)") do |term|
#     options[:term] = term
#   end
#
#   opts.on("-lLOCATION", "--location=LOCATION", "Search location (for search)") do |location|
#     options[:location] = location
#   end
#
#   opts.on("-bBUSINESS_ID", "--business-id=BUSINESS_ID", "Business id (for lookup)") do |id|
#     options[:business_id] = id
#   end
#
#   opts.on("-h", "--help", "Prints this help") do
#     puts opts
#     exit
#   end
# end.parse!
#
#
# command = ARGV
#
#
# case command.first
# when "search"
#   term = options.fetch(:term, DEFAULT_TERM)
#   location = options.fetch(:location, DEFAULT_LOCATION)
#
#   raise "business_id is not a valid parameter for searching" if options.key?(:business_id)
#
#   response = search(term, location)
#
#   puts "Found #{response["total"]} businesses. Listing #{SEARCH_LIMIT}:"
#   response["businesses"].each {|biz| puts biz["name"]}
# when "lookup"
#   business_id = options.fetch(:business_id, DEFAULT_BUSINESS_ID)
#
#
#   raise "term is not a valid parameter for lookup" if options.key?(:term)
#   raise "location is not a valid parameter for lookup" if options.key?(:lookup)
#
#   response = business(business_id)
#
#   puts "Found business with id #{business_id}:"
#   puts JSON.pretty_generate(response)
# else
#   puts "Please specify a command: search or lookup"
# end


# Make a request to the Fusion search endpoint. Full documentation is online at:
# https://www.yelp.com/developers/documentation/v3/business_search
#
# term - search term used to find businesses
# location - what geographic location the search should happen
#
# Examples
#
#   search("burrito", "san francisco")
#   # => {
#          "total": 1000000,
#          "businesses": [
#            "name": "El Farolito"
#            ...
#          ]
#        }
#
#   search("sea food", "Seattle")
#   # => {
#          "total": 1432,
#          "businesses": [
#            "name": "Taylor Shellfish Farms"
#            ...
#          ]
#        }
#
# Returns a parsed json object of the request
