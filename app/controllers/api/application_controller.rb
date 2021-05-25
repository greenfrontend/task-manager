class Api::ApplicationController < ApplicationController
  respond_to :json
  include AuthHelper
  helper_method :current_user
end
