class Api::V1::ApiController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }


end
