http://challenge99.howhackthis.com:8067/files/..%2Fserver.js

sudo docker build -t xss-vuln .
sudo docker run -d -p 9746:3000 --name xss_vuln_container xss-vuln