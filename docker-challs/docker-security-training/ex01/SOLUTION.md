# Solutions de l'Audit Dockerfile

## Points à Noter

- Le Dockerfile utilise une version spécifique de Python (`python:3.11`), ce qui pourrait ne pas être à jour avec les derniers correctifs de sécurité.
- Le Dockerfile est monostage, ce qui peut entraîner des images Docker plus grandes que nécessaire.
- L'application s'exécute sous l'utilisateur root par défaut, ce qui n'est pas recommandé pour des raisons de sécurité.

## Problèmes Identifiés
Voici la version corrigée et complétée du texte :

---

## Problèmes Identifiés

1. **Utilisation d'une version spécifique de Python**
   - **Problème** : L'image `python:3.11-slim` pourrait ne pas recevoir les mises à jour de sécurité ou devenir obsolète avec le temps.
   - **Solution** : Utilisez une version de Python plus récente ou une image basée sur une version LTS (Long Term Support) pour bénéficier des dernières mises à jour de sécurité. Vérifiez régulièrement la disponibilité des nouvelles versions pour garantir la sécurité.

2. **Absence de gestion des dépendances spécifiques**
   - **Problème** : Le Dockerfile utilise le serveur HTTP intégré de Python sans gestion des dépendances. Cela peut être acceptable pour une application simple, mais il est important de gérer les versions des dépendances dans des cas plus complexes.
   - **Solution** : Si des packages Python supplémentaires sont ajoutés, utilisez un fichier `requirements.txt` ou un fichier de configuration similaire pour gérer les versions des dépendances de manière précise et fiable.

3. **Pas d'utilisation de Dockerfile multi-stage**
   - **Problème** : Le Dockerfile est monostage, ce qui peut entraîner des tailles d'image plus grandes et contenir des artefacts de construction inutiles.
   - **Solution** : Utilisez une construction multi-stage pour réduire la taille de l'image et optimiser l'efficacité. Par exemple, utilisez une étape de construction pour créer des artefacts et une étape finale pour les exécuter dans une image plus légère.

4. **Pas d'utilisation de `USER` pour les pratiques de sécurité**
   - **Problème** : L'application s'exécute par défaut en tant qu'utilisateur root, ce qui peut poser des risques de sécurité.
   - **Solution** : Ajoutez un utilisateur non privilégié dans le Dockerfile et exécutez l'application sous cet utilisateur pour améliorer la sécurité. Par exemple :
     ```Dockerfile
     # Ajouter un utilisateur non-root
     RUN useradd -m appuser
     USER appuser
     ```

5. **Trop de privilèges donnés au conteneur, notamment via l'option `--privileged`**
   - **Problème** : Le conteneur est lancé avec des privilèges élevés, ce qui peut exposer l'hôte à des risques de sécurité. Les capacités (`capabilities`) permettent de granulariser les privilèges root, mais `--privileged` donne tous les privilèges, ce qui est excessif.
   - **Solution** : Identifiez et attribuez uniquement les capacités nécessaires en utilisant `--cap-add` et `--cap-drop`. Pour lister les capacités disponibles, utilisez :
     ```bash
     capsh --print # si not found, apt install
     ```

6. **Absence de limitation de la consommation des ressources du conteneur**
   - **Problème** : Sans limitation, un conteneur peut consommer toutes les ressources disponibles de l'hôte, ce qui peut entraîner une exhaustion des ressources et potentiellement un déni de service (DoS).
   - **Solution** : Limitez les ressources du conteneur en utilisant les options suivantes lors de l'exécution :
     - Limiter la mémoire : `--memory="512m"`
     - Limiter le CPU : `--cpus="1.0"`
     - Limiter les opérations d'E/S disque : `--device-read-bps`, `--device-write-bps`, etc.

7. **Possibilité de supprimer les shells (`bash` et `sh`) du conteneur**
   - **Problème** : Supprimer les shells dans le conteneur peut compliquer le débogage pour les développeurs, mais cela réduit considérablement la surface d'attaque en production.
   - **Solution** : Pour une meilleure sécurité en production, supprimez les shells non nécessaires après le déploiement. Cependant, assurez-vous que le conteneur reste suffisamment fonctionnel pour les opérations et la gestion nécessaires.

8. **Montage du socket Docker dans le conteneur**
   - **Problème** : Monter le socket Docker (`/var/run/docker.sock`) dans un conteneur permet à ce dernier d'accéder au démon Docker de l'hôte, lui donnant ainsi la capacité d'exécuter des commandes Docker, de créer, arrêter, et gérer d'autres conteneurs. Cela peut compromettre la sécurité de l'hôte en offrant au conteneur des privilèges élevés similaires à ceux de l'utilisateur Docker sur l'hôte.
   - **Solution** : Évitez de monter le socket Docker à moins que cela ne soit absolument nécessaire et que vous compreniez les risques impliqués. Si vous devez monter le socket, assurez-vous que le conteneur et les applications qui y sont exécutées sont sécurisés et que l'accès est limité aux utilisateurs ou processus fiables. Utilisez des outils et des techniques pour restreindre les permissions et surveillez les activités du conteneur pour détecter tout comportement suspect.

   

## Commande docker amélioré

  ```bash
   docker run \
   -d \ #  Démarre le conteneur en arrière-plan
   -p 3000:3000 \ #   Mappe port 3000 hôte:container.
   --memory="512m" \ # Limite l'utilisation de la mémoire RAM à 512 Mo.
   --memory-swap="1g" \ # Limite l'usage de la mémoire (RAM + swap) à 1 Go.
   --cpus="1.0" \ # Limite le conteneur à 1 cœur CPU.
   --cpu-shares=512 \ # Définit la priorité de l'utilisation du CPU relative.
   --blkio-weight=500 \ # Définit la priorité d'E/S disque (entre 10 et 1000).
   --device-read-bps=/dev/sda:1mb \ # Limite la bande passante en lecture sur /dev/sda à 1 Mo par seconde.
   --device-write-bps=/dev/sda:1mb \ # Limite la bande passante en ecriture sur /dev/sda à 1 Mo par seconde. 
   --device-read-iops=/dev/sda:1000 \ # Limite les opérations de sortie par seconde sur /dev/sda à 1000.
   --device-write-iops=/dev/sda:1000 \ # Limite les opérations d'entrée par seconde sur /dev/sda à 1000.
   --cap-drop=ALL \ # Supprime toutes les capacités du conteneur (pour une sécurité renforcée).
   --cap-add=NET_ADMIN \ # Ajoute la capacité NET_ADMIN pour permettre les opérations de gestion réseau.
   mon-http-server
   ```
## Dockerfile Amélioré

```Dockerfile
# Stage 1: Build stage
FROM python:3.11 AS build

# Set working directory
WORKDIR /app

# Create a simple index.html file
RUN echo '<!DOCTYPE html><html><head><title>My Docker App</title></head><body><h1>Hello, World!</h1></body></html>' > index.html

# Stage 2: Final stage
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Create a non-root user
RUN useradd -ms /bin/sh myuser

# Copy the index.html from the build stage
COPY --from=build /app/index.html .

# Change ownership to the non-root user
RUN chown myuser:myuser /app/index.html

# Switch to the non-root user
USER myuser

# Expose port 3000
EXPOSE 3000

# Start the HTTP server
CMD ["python3", "-m", "http.server", "3000"]
```
