require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'create' do
    author = create(:user)
    task = create(:task, author: author)
    assert task.persisted?
  end
end
