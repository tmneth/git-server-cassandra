```
docker compose down -v
docker compose up -d
docker ps
docker cp init.cql 80a963f9610a:/init.cql
docker exec -it 80a963f9610a cqlsh
SOURCE '/init.cql'
```
