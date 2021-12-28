class AddColumnToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_token_created_at, :datetime, precision: 6
  end
end
