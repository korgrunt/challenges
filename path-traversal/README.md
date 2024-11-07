http://challenge99.howhackthis.com:8067/files/..%2Fserver.js

sudo docker build -t path-traversal .
sudo docker run -d -p 8067:3000 --name path_traversal_container path-traversal