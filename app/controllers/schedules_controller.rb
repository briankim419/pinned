class SchedulesController < ApplicationController
  def index
  end

  def show
  end

  def search
    query = "%#{params[:query]}%"
    @schedules = Schedule.where('title ilike ? or body ilike ?', query, query)
  end
end
