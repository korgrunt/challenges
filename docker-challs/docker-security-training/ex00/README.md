# ex00 - Simple lancement de conteneur Docker

## Objectif

L'objectif de cet exercice est de familiariser les utilisateurs avec les commandes de base de Docker pour lancer un conteneur. Cet exercice est une introduction pour ceux qui n'ont jamais utilisé Docker.

## Instructions

1. **Construire l'image Docker :**

   Vous devez créer une image Docker à partir d'un Dockerfile fourni. Ce Dockerfile installe Python, crée un répertoire avec un fichier `index.html`, et configure un serveur HTTP pour servir ce fichier sur le port 3000.

   ```bash
   docker build -t my-python-app -f Dockerfile .
   ```

2. **Lancer le conteneur :**

   Une fois l'image construite, vous devez lancer un conteneur à partir de cette image. Le conteneur doit exposer le port 3000 sur votre machine hôte.

   ```bash
   docker run -d -p 3000:3000 my-python-app
   ```

3. **Vérifier le fonctionnement du serveur :**

   Après avoir lancé le conteneur, ouvrez un navigateur web et visitez [http://localhost:3000](http://localhost:3000). Vous devriez voir le message "Hello, I'm an app hosted in a container and exposed".

4. **Stopper le conteneur :**

   Identifiez l'ID ou le nom du conteneur en cours d'exécution et arrêtez-le.

   ```bash
   docker ps  # Pour lister les conteneurs en cours
   docker stop <container_id_or_name>
   ```

5. **Supprimer l'image :**

   Supprimez l'image Docker de votre système après avoir arrêté le conteneur.

   ```bash
   docker rmi my-python-app
   ```

## IoC: Indicator of Completed

- L'image Docker est correctement construite.
- Le conteneur est lancé et en cours d'exécution.
- Le serveur HTTP est accessible via [http://localhost:3000](http://localhost:3000) et affiche le message attendu.
