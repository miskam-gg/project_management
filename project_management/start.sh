#!/bin/sh
echo Wait 5 seconds for database initialization
sleep 5

echo Start migrations
python3 manage.py migrate --noinput

echo Run application
gunicorn --workers 3 project_management.wsgi:application --bind 0.0.0.0:8000

# Wait for any process to exit
wait -n
exit $?
