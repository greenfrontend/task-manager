FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :name, :description, :state] do |n|
    "string#{n}"
  end
  sequence :email do |n|
    "person#{n}@example.com"
  end
  sequence :avatar do |n|
    "avatar#{n}.jpg"
  end
  sequence :expired_at do |_n|
    week_in_seconds = 7 * 24 * 60 * 60
    Time.now + week_in_seconds
  end
end
