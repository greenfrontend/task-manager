class SendTaskCreateNotificationJob < ApplicationJob
  sidekiq_options queue: :mailers, lock: :until_and_while_executing, on_conflict: { client: :log, server: :reject }
  sidekiq_throttle_as :mailer

  def perform(task_id)
    task = Task.find_by(id: task_id)
    return if task.blank?

    UserMailer.with(user: task.author, task: task).task_created.deliver_now
  end
end
