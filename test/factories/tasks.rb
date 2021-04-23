FactoryBot.define do
  factory :task do
    name
    description
    state { 'new_task' }
    expired_at
    author factory: :manager
    assignee factory: :manager
  end
end
