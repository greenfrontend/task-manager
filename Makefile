run:
	docker-compose build
	docker-compose run --rm web bash -c "bundle install"
	docker-compose run --rm web bash -c "rails db:create db:migrate db:seed"
	docker-compose up -d

dev:
	DATABASE_PASSWORD=postgres DATABASE_USERNAME=postgres DATABASE_HOST=localhost bundle exec rails s -b '0.0.0.0' -p 3000