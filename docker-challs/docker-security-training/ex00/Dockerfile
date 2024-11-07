# Utilise l'image de base officielle d'Ubuntu
FROM ubuntu:latest

# Met à jour les paquets et installe Python
RUN apt-get update && apt-get install -y python3

# Crée un répertoire pour l'application web et ajoute un fichier index.html
RUN mkdir -p /app
RUN echo "<h1>Hello, I'm an app hosted in a container and exposed</h1>" > /app/index.html

# Définit le répertoire de travail
WORKDIR /app

# Expose le port 3000
EXPOSE 3000

# Démarre le serveur HTTP
CMD ["python3", "-m", "http.server", "3000"]
