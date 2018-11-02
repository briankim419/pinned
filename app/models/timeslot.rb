class Timeslot < ApplicationRecord
  belongs_to :schedule
  belongs_to :location

end
