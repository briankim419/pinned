# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Location.create(name:"Boston Bowling Alley", state: "MA", city: "Boston", zipcode: 02134, address: "30 Holton Street", price:4)
Location.create(name:"Allston Bowl", state: "MA", city: "Boston", zipcode: 02101, address: "30 Holton Street", price:4)
Location.create(name:"Bowl a lot", state: "MA", city: "Boston", zipcode: 02111, address: "30 Holton Street", price:4)

Schedule.create(title: "First Schedule", body: "First Schedule is cool")
Schedule.create(title: "Second Schedule", body: "Second Schedule is cool")
Schedule.create(title: "Third Schedule", body: "Third Schedule is cool")

Timeslot.create(location_id:Location.first.id, schedule_id: Schedule.first.id)
Timeslot.create(location_id:Location.second.id, schedule_id: Schedule.first.id)
Timeslot.create(location_id:Location.third.id, schedule_id: Schedule.first.id)
