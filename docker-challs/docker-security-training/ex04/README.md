# Exercice d'Audit Dockerfile

## Objectif

L'objectif est d'accéder au daemon Docker depuis un conteneur, ce qui permet d'interagir avec d'autres conteneurs voisins.

## Lancer le challenge

1. **Lancer Vagrant :**

   Pour démarrer l'environnement, exécutez la commande suivante :

   ```bash
   vagrant up
   ```

2. **Se connecter au conteneur Docker pour commencer le challenge :**

   Une fois Vagrant démarré, connectez-vous au conteneur Docker en utilisant la commande suivante :

   ```bash
   sudo vagrant ssh -c "ssh root@0.0.0.0 -p 2222"
   ```

   **Mot de passe requis :**  
   Le mot de passe est `password-ssh`.

## Escape the VM

Pour accéder au daemon Docker depuis le conteneur, vous devrez utiliser les capacités du conteneur et potentiellement manipuler des fichiers et des paramètres du système.

### Trouver le flag

Pour trouver le flag, explorez l'environnement du conteneur et essayez d'accéder au daemon Docker pour interagir avec les conteneurs voisins. Le flag que vous cherchez aura un format similaire à :

```bash
FLAG{___SOMETHING___}
```
