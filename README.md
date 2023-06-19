# TimeLog

### Требования для запуска локально:
* в корневой папке необходимо создать файл `.env` и заполнить его по шаблону `example.env`
* выполнить `npm install`
* запустить базу данных mongo в docker `docker compose run mongodb`
* запуск клиента и сервера
* * `npm run dev`
* * для запуска по отдельности
* * * клиент: `cd apps/client && npm run dev`
* * * сервер: `cd apps/server && npm run dev`

Клиент по умолчанию запускается на порту 5173. Сервер по умолчанию запускается на порту 3000

### Требования для запуска на удаленном сервере:
* подключиться к серверу
* установить node, npm, git, docker
* склонировать git репозиторий
* в корневой папке необходимо создать файл `.env` и заполнить его по шаблону `example.env`
* запустить `docker compose build`
* запустить `docker compose up`