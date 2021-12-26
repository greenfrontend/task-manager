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
end
