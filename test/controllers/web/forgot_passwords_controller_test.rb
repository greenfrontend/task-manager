require 'test_helper'

class Web::ForgotPasswordsControllerTest < ActionController::TestCase
  test 'new' do
    get :new
    assert_response :success
  end

  test 'create success' do
    user = create(:user)
    before_token = user.reset_password_token

    assert_emails 1 do
      post :create, params: { forgot_password_form: { email: user.email } }
    end

    assert_response :redirect
    user.reload
    assert before_token != user.reset_password_token
  end
end
