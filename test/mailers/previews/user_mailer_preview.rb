# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def task_created
    UserMailer.with(params).task_created
  end

  def task_edited
    UserMailer.with(params).task_edited
  end

  def task_deleted
    UserMailer.with(params).task_deleted
  end

  private

  def params
    user = User.first
    task = Task.first
    { user: user, task: task }
  end
end
