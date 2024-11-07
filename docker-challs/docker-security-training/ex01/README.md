# Exercice d'Audit Dockerfile

## Objectif

L'objectif de cet exercice est d'auditer le Dockerfile et l'utilisation de Docker CLI pour identifier les vulnérabilités potentielles et proposer des améliorations.

## Instructions

1. **Examinez le Dockerfile :**

   - Examinez le Dockerfile présent dans ce dossier ainsi que la manière dont vous l'exécutez.
   - Identifiez et listez les vulnérabilités ou les problèmes potentiels.
   - Proposez des solutions pour chaque problème que vous avez identifié.

## Lancer le Dockerfile

1. **Construire l'image Docker :**

   Utilisez la commande suivante pour construire l'image Docker :

   ```bash
   docker build -t mon-http-server .
   ```

2. **Lancer un conteneur basé sur l'image construite :**

   Utilisez la commande suivante pour lancer un conteneur. Notez que le conteneur est lancé avec le mode `--privileged` et le socket Docker monté, ce qui peut introduire des risques de sécurité.

   ```bash
   docker run --privileged -d -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock mon-http-server
   ```

   Le serveur HTTP sera accessible sur [http://localhost:3000](http://localhost:3000).

   **Vérifiez que le conteneur est bien lancé :**

   ```bash
   docker ps
   ```

3. **Ouvrir un shell interactif sur le conteneur :**

   Pour ouvrir un shell interactif sur le conteneur afin de vous aider dans l'audit, utilisez la commande suivante :

   ```bash
   docker exec -it <container-id> /bin/bash
   ```

   Remplacez `<container-id>` par l'ID du conteneur que vous souhaitez examiner.
