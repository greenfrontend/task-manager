require 'test_helper'

class Web::PasswordsControllerTest < ActionController::TestCase
  test 'edit' do
    user = create(:user, reset_password_token: 'qwerty')

    get :edit, params: { use_route: 'password/', token: user.reset_password_token }
    assert_response :success
  end

  test 'update' do
    user = create(:user)
    before_password_digest = user.password_digest

    patch :update,
          params: { password_form: { password: 'new_password', password_confirmation: 'new_password' }, token: user.reset_password_token }

    assert_response :redirect
    user.reload

    assert before_password_digest != user.password_digest
  end
end
