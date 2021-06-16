run:
	docker-compose build
	docker-compose run --rm web bash -c "bundle install"
	docker-compose run --rm web bash -c "rails db:create db:migrate db:seed"
	docker-compose up -d
