class PasswordForm
  include ActiveModel::Model

  attr_accessor(
    :password,
    :password_confirmation,
  )

  validates :password, :password_confirmation, presence: true, confirmation: true
end
