class Location < ApplicationRecord
  has_many :timeslots
  has_many :schedules, through: :timeslots

  validates :state, presence: true
  validates :city, presence: true
  validates :zipcode, presence: true
  validates :address, presence: true
  validates :name, presence: true

  validates :zipcode, numericality: true

end
