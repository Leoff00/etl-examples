localstack: 
	docker-compose up -d
tf: 
	terraform -chdir=infra init
	terraform -chdir=infra apply --auto-approve

logs3: 
	aws --endpoint-url=http://localhost:4566 s3 ls

build: localstack tf logs3

see_content:
	aws --endpoint-url=http://localhost:4566 s3 cp s3://etl-test-bucket/users_1.json


.PHONY: localstack tf logs3 build