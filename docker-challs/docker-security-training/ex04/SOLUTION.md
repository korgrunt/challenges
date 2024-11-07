### Sommes-nous dans un conteneur Docker ?

Pour vérifier si vous êtes dans un conteneur Docker, suivez les étapes suivantes :

1. **Lister le contenu de la racine `/` :**

   ```bash
   ls -a /
   ```

   **Résultat attendu :**
   ```bash
   .     bin   dev  home  lib32  libx32  mnt  proc  run   srv  tmp  var
   ..  .dockerenv  boot  etc  lib   lib64  media   opt  root  sbin  sys  usr
   ```
   La présence du fichier `.dockerenv` indique que vous êtes dans un conteneur Docker.

2. **Mettre à jour les paquets et installer Docker :**

   Tout d'abord, mettez à jour les paquets disponibles :

   ```bash
   apt-get update
   ```

   Ensuite, installez Docker :

   ```bash
   apt-get install -y docker.io
   ```

3. **Lister les conteneurs Docker en cours d'exécution :**

   Vérifiez les conteneurs Docker actifs :

   ```bash
   docker ps
   ```

4. **Entrer dans un conteneur Docker en mode interactif :**

   Pour entrer dans un conteneur en cours d'exécution, utilisez la commande suivante :

   ```bash
   sudo docker exec -it my-ssh-container /bin/bash
   ```

   Cela vous permettra d'accéder au conteneur `my-ssh-container` en mode interactif.

5. **Trouver le flag dans le conteneur voisin :**

   Une fois à l'intérieur du conteneur voisin, il suffit de lire le fichier `/.password` pour récupérer le flag :

   ```bash
   cat /.password
   ```

   Cette commande affichera le contenu du fichier, qui contient le flag.

