class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :description
      t.string :url
      t.string :phone_number
      t.string :state, null: false
      t.string :city, null: false
      t.integer :zipcode, null: false
      t.string :address, null: false
      t.integer :price
      t.decimal :rating
      t.integer :review_count
      t.decimal :latitude
      t.decimal :longitude
      t.string :image

      t.timestamps
    end
  end
end
