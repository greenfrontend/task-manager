FactoryBot.define do
  factory :task do
    name
    description
    state
    expired_at
    author_id { 1 }
    assignee_id { 1 }
  end
end
