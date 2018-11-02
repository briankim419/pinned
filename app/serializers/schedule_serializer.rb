class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :locations
end
