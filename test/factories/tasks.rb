FactoryBot.define do
  factory :task do
    name
    description
    state
    expired_at
    author factory: :manager
    assignee factory: :manager
  end
end
