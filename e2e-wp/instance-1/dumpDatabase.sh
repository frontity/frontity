#!/usr/bin/env sh
docker-compose exec -T db sh -c "exec mysqldump -u root -ppassword wordpress" > ./data/dump.sql