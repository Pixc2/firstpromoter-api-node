up:
	@docker-compose up -d --build

rebuild:
	@docker-compose build --no-cache

down:
	@docker-compose down

ssh:
	@docker-compose exec firstpromoter-api-node sh
