http://challenge99.howhackthis.com:8067/files/..%2Fserver.js

sudo docker build -t sql-injection .
sudo docker run -d -p 9332:3000 --name sql_injection_container sql-injection