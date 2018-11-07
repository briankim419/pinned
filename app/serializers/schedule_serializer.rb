class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :locations, :reviews
end
