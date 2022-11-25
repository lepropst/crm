#!/bin/sh
# { # try
#   pip install --upgrade pip
#   pip install -r requirements.txt


# } || { # catch
#     # save log for exception 
#     echo "pip commannds failed"
# }


if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# python manage.py flush --no-input
# python manage.py migrate

exec "$@"