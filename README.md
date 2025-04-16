# Мой Ежедневник

## Описание проекта

Приложение предоставляет возможность создавать записи, редактировать и удалять записи, просматривать список записей и помечать записи отработанными. Отработанные записи в списке записей выделяются отдельным цветом. 

Приложение доступно по адресу [http://localhost/](http://localhost/)


### Автор проекта Артём Куликов

tg: [@Berg1005](https://t.me/berg1005)

[GitHub](https://github.com/berg96)

## Используемые технологии 

Проект использует реляционную базу данных PostgreSQL для хранения данных и реализован на языке python c использованием следующего технгологического стека:

* FastAPI
* Uvicorn
* sqlalchemy
* Pydantic
* Alembic

## Как запустить проект

Клонировать репозиторий:
```
git clone https://github.com/berg96/dailyplanner_testtask_vista.git
```
Перейти в него в командной строке:
```
cd dailyplanner_testtask_vista
```
Создать файл .env с актуальными переменными окружения по примеру .env_example

Запустить Docker compose:
```
docker compose up -d
```
Документация API при запущенном контейнере доступна по следующему адресу:
[http://localhost/api/docs](http://localhost/api/docs)
