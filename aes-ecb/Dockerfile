# Utilise l'image Node.js officielle en version 18
FROM node:18

# Crée et utilise un répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port 3000
EXPOSE 3000

# Définit la commande pour lancer le serveur
CMD ["node", "server.js"]