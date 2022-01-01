class SendTaskDeleteNotificationJob < ApplicationJob
  sidekiq_options queue: :mailers
  sidekiq_throttle_as :mailer

  def perform(task_id, email)
    return if task_id.blank?

    UserMailer.with(email: email, task_id: task_id).task_deleted.deliver_now
  end
end
