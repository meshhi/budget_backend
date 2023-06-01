Запуск (требуется Docker v23.0.1, NodeJS v19.7.0)
1. Запуск контейнера с БД
docker  run  --name  pg  -p  3003:5432  -e  POSTGRES_USER=postgres  -e  POSTGRES_PASSWORD=postgres  -e  POSTGRES_DB=welbex_db  -d  postgres:latest
2. Запуск приложения
npm run startЗапуск (требуется Docker v23.0.1, NodeJS v19.7.0)\
1\. Запуск контейнера с БД\
docker  run  --name  pg  -p  3003:5432  -e  POSTGRES_USER=postgres  -e  POSTGRES_PASSWORD=postgres  -e  POSTGRES_DB=welbex_db  -d  postgres:latest\
2\. Запуск приложения\
npm run start