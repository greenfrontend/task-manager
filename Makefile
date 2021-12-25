build:
	docker-compose build

prepare:
	docker-compose run --rm web bash -c "bundle install"
	docker-compose run --rm web bash -c "yarn"
	docker-compose run --rm web bash -c "rails db:create db:migrate db:seed"

up:
	docker-compose up -d

shell:
	docker-compose run --rm web bash

lint:
	yarn run lint

test:
	bin/rails test

.PHONY: test
