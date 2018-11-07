class Schedule < ApplicationRecord
  has_many :timeslots
  has_many :locations, through: :timeslots

  has_many :userschedules
  has_many :users, through: :userschedules

  has_many :reviews

  validates :title, presence: true
  validates :body, presence: true
end
