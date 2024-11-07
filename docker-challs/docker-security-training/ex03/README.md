# Exercice d'Audit Dockerfile

## Objectif

L'objectif est de sortir de la VM.

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

Pour sortir de la VM, Google peut être votre ami.

### Trouver le flag

Pour trouver le flag, examinez les fichiers et l'environnement dans le conteneur. Le flag aura un format similaire à :

```bash
FLAG{___SOMETHING___}
```
