# Utiliser une image Node.js officielle
FROM node:18

# Créer un répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port 3000 pour l'application à l'intérieur du conteneur
EXPOSE 3000

# Démarrer l'application
CMD ["node", "server.js"]
