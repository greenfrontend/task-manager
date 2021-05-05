class Admin::UsersController < Admin::ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def index
    @q = User.ransack(params[:q])
    @users = @q.result.order(:type).order(:id).page(params[:page]).per(10)
  end
end
