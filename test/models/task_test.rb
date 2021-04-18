require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'create' do
    task = create(:task)
    puts task.inspect
    assert task.persisted?
  end
end
