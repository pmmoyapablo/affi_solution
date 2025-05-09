echo "****** Initializing Process ******"

cd cloudkube/db

echo "****** Deploying database services ******"
kubectl apply -f ./

cd ..
cd rabbitmq/

echo "****** Deploying RabbitMQ services ******"
kubectl apply -f ./

cd ..

echo "****** Deploying microservicos services ******"

kubectl apply -f ./

echo "****** Finishing Process ******"