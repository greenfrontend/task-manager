class Web::ForgotPasswordsController < Web::ApplicationController
  def new
    @forgot_password_form = ForgotPasswordForm.new
  end

  def create
    @forgot_password_form = ForgotPasswordForm.new(forgot_form_params)
    user = @forgot_password_form.user

    return redirect_to(:new_forgot_password, notice: 'User not found') unless user

    token = generate_token
    link = generate_forgot_password_link(token)

    user.update({
                  reset_password_token: token,
                  reset_password_token_created_at: Time.current,
                })

    SendForgotPasswordTokenNotificationJob.perform_async(user.id, link)

    redirect_to(:root, notice: 'Link for password reset was sent to your email')
  end

  private

  def forgot_form_params
    params.require(:forgot_password_form).permit(:email)
  end

  def generate_token
    SecureRandom.base58(5)
  end

  def generate_forgot_password_link(token)
    "#{edit_password_path}?token=#{token}"
  end
end
