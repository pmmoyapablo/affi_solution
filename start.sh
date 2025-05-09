#!/bin/bash

echo "****** Initializing Process ******"

echo "****** Uping database service ******"
#Start remaining services
docker-compose up -d db-mysql-nodejs

## Waiting 5 seg
sleep 5

echo "****** Initializing building images ******"
#Build all images of current project
docker-compose build --no-cache

## Waiting 5 seg
sleep 5

echo "****** Initializing migrations and seeders database ******"

cd mcs-nodejs/
#Check Packages node_modules
if [ -x "node_modules" ]; then
  echo "Packages node_modules already installed"
else 
  echo "Installing packages node_modules"
  npm install
fi
#Run migrations of the database
npx sequelize-cli db:migrate
## Waiting 5 seg
sleep 5
#Run seeders of the database
npx sequelize-cli db:seed:all
cd ..

echo "****** Migrations and seeders of database completed ******"

## Waiting 3 seg
sleep 3

echo "****** Uping microservice and microfrontend ******"
#Start remaining services
docker-compose up -d mcs-nodejs mcf-angular

echo "****** Finishing Process ******"