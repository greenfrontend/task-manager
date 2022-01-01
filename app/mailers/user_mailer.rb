class UserMailer < ApplicationMailer
  def task_created
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'New Task Created')
  end

  def task_edited
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: "Task #{@task.id} was edited")
  end

  def task_deleted
    email = params[:email]
    @task_id = params[:task_id]

    mail(to: email, subject: "Task #{@task_id} was deleted")
  end

  def token_created
    user = params[:user]
    @link = params[:link]

    mail(to: user.email, subject: 'Reset your password')
  end
end
