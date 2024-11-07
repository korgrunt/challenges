# Solutions pour ex00 - Simple lancement de conteneur Docker

## Étape 1: Construire l'image Docker

Utilisez la commande suivante pour construire l'image Docker :

```bash
docker build -t my-python-http-server .
```

Lister les images disponibles sur votre système :

```bash
docker images
```

## Étape 2: Lancer le conteneur

Utilisez la commande suivante pour lancer le conteneur et exposer le port 3000 :

```bash
docker run -d -p 3000:3000 --name python-http-server my-python-http-server
```

## Étape 3: Vérifier le fonctionnement du serveur

```bash
docker ps # Liste les conteneurs en cours d'exécution, il doit y en avoir un
```

Ouvrez un navigateur web et visitez `http://localhost:3000`. Vous devriez voir le message suivant :

```
Hello, I'm an app hosted in a Docker container and exposed on localhost:3000
```

## Étape 4: Arrêter et supprimer le conteneur

Pour arrêter le conteneur, utilisez la commande suivante :

```bash
docker stop <container-id>
```

Pour lister les conteneurs, même ceux stoppés, utilisez la commande suivante :

```bash
docker ps -a # Liste les conteneurs arrêtés, il doit y en avoir un
```

Pour supprimer le conteneur, utilisez la commande suivante :


```bash
docker rm <container-id>
```

Pour lister les conteneurs, même ceux stoppés, utilisez la commande suivante :

```bash
docker ps -a # Liste les conteneurs arrêtés, il ne doit plus y en avoir
```

## Étape 5: Supprimer l'image

Pour supprimer l'image, utilisez la commande suivante :

```bash
docker rmi <image-id>
```