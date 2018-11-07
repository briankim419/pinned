class CreateUserschedules < ActiveRecord::Migration[5.2]
  def change
    create_table :userschedules do |t|
      t.belongs_to :user, null: false
      t.belongs_to :schedule, null: false

      t.timestamps
    end
  end
end
