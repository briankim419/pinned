class CreateTimeslots < ActiveRecord::Migration[5.2]
  def change
    create_table :timeslots do |t|
      t.belongs_to :location, null: false
      t.belongs_to :schedule, null: false

      t.string :description
      
      t.timestamps
    end
  end
end
