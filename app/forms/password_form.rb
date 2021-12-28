class PasswordForm
  include ActiveModel::Model

  attr_accessor(
    :password,
    :password_confirmation
  )

  validates :password, :password_confirmation, presence: true
  validate :passwords_match

  def passwords_match
    if password != password_confirmation
      errors.add(:password_confirmation, "passwords should be equal")
    end
  end
end
