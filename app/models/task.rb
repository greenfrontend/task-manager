class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }

  state_machine initial: :new_task do
    event :archive do
      transition [:new_task, :released] => :archived
    end

    # dev
    event :start_development do
      transition new_task: :in_development
    end
    event :finish_development do
      transition in_development: :in_qa
    end

    # qa
    event :qa_success do
      transition in_qa: :in_code_review
    end
    event :qa_fails do
      transition in_qa: :in_development
    end

    # review
    event :review_success do
      transition in_code_review: :ready_for_release
    end
    event :review_fails do
      transition in_code_review: :in_development
    end

    # release
    event :release do
      transition ready_for_release: :released
    end
  end
end
