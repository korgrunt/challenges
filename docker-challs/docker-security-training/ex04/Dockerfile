# Utiliser une image Ubuntu de base
FROM ubuntu:20.04

# Mettre à jour les paquets et installer OpenSSH Server
RUN apt-get update && \
    apt-get install -y openssh-server && \
    echo 'root:password-ssh' | chpasswd && useradd -m user-ssh && echo 'user-ssh:password-ssh' | chpasswd

# Configurer SSH pour accepter les connexions root et l'authentification par mot de passe
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Créer le répertoire pour le processus SSH et copier la clé publique
RUN mkdir /var/run/sshd && \
    mkdir -p /root/.ssh && \
    chmod 700 /root/.ssh

# Copier la clé publique dans le conteneur
# COPY id_rsa.pub /root/.ssh/master_host_id_rsa.pub
# RUN cat /root/.ssh/master_host_id_rsa.pub > /root/.ssh/authorized_keys

# Assurer les permissions correctes pour le fichier authorized_keys
# RUN chmod 600 /root/.ssh/authorized_keys && \
#    chown root:root /root/.ssh/authorized_keys

# Exposer le port 22 pour SSH
EXPOSE 22

# Lancer le serveur SSH
CMD ["/usr/sbin/sshd", "-D"]
