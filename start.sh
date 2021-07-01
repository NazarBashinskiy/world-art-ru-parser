docker-compose up -d postgres
sleep 5
docker-compose up -d redis
sleep 5
docker-compose up --build world-art-ru-parser