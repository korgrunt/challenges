# Utiliser une image Node.js de base
FROM node:14

# Créer un répertoire de travail dans le conteneur
WORKDIR /app

# Copier le code de l'application dans le conteneur
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port 3000 à l'intérieur du conteneur
EXPOSE 3000

# Démarrer l'application
CMD ["node", "server.js"]