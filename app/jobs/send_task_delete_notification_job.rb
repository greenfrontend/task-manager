class SendTaskDeleteNotificationJob < ApplicationJob
  sidekiq_options queue: :mailers, lock: :until_and_while_executing, on_conflict: { client: :log, server: :reject }
  sidekiq_throttle_as :mailer  

  def perform(task_id, email)
    return if task_id.blank?

    UserMailer.with(email: email, task_id: task_id).task_deleted.deliver_now
  end
end
