# Prueba Affi

## Ejecutar el Proyecto en Docker in Shell Console (Git Bash o Linux):

cd affi_solution/
sh ./startup.sh

## Provicional la Infraestructura en Azure:

cd terraform/azure/
terraform init
terraform plan
terraform apply

## Rutas Bases de los Recursos de la API:

- Login User [POST]:  http://localhost:4000/api/users/login
- List Users [GET]: http://localhost:4000/api/users
- Create User [POST]: http://localhost:4000/api/users

** En la carpeta docs/ ha un directorio con una colección Postman con los body y Request para probar la Api una vez levantada.