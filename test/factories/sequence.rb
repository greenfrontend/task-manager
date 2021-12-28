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
    Time.now + 1.week.seconds
  end
  sequence :reset_password_token do |_n|
    'token'
  end
  sequence :reset_password_token_created_at do |_n|
    Time.now
  end  
end
