class SendForgotPasswordTokenNotificationJob < ApplicationJob
  sidekiq_options queue: :mailers
  sidekiq_throttle_as :mailer

  def perform(user_id, link)
    user = User.find_by(id: user_id)
    return if user.blank?

    UserMailer.with(user: user, link: link).token_created.deliver_now
  end
end
