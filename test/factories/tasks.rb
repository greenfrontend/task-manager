FactoryBot.define do
  factory :task do
    name { generate :string }
    description { generate :string }
    author_id { create :user }
    assignee_id { create :user }
  end
end
