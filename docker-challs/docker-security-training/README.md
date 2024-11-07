# Docker Security Training

Bienvenue dans le projet **docker-security-training**. Ce repository est conçu pour aider les étudiants et les professionnels à comprendre et à pratiquer les concepts de sécurité Docker. Chaque dossier de ce repo contient un exercice spécifique visant à explorer divers aspects de la sécurité Docker.

## Requirements

- Docker Engine installé sur votre système
- Un terminal POSIX
- Vagrant

## Tips

Ajouter ces alias dans votre fichier ~/.bashrc ou ~/.zshrc, en fonction du bash que vous utilisez

```bash
alias vag-destroy="sudo vagrant destroy -f"
alias vag-up="sudo vagrant up"
alias vag-ssh="sudo vagrant ssh"
alias vag-ssh-ssh="sudo vagrant ssh -c 'ssh root@0.0.0.0 -p 2222'"
```

## Aprés chaques challenges

```bash
vag-destroy
```

## Pour commencer un challenge

```bash
cd ./ex0X
vag-up
vag-ssh-ssh # mot de passe pour se connecter en ssh => "password-ssh"
```

## Structure du repository

Chaque dossier dans ce repository est un exercice distinct. Voici un aperçu de la structure des dossiers et des objectifs de chaque exercice :

- **ex0**: Simple lancement d'un conteneur Docker pour ceux qui n'ont jamais utilisé Docker.
- **ex1**: Audit simple d'un Dockerfile.
- **ex2**: Évasion en utilisant les capabilities.
- **ex3**: Évasion en utilisant les cgroups.
- **ex4**: Évasion en utilisant le socket.
- **ex5**: Forensic sur un conteneur Docker.

## Objectifs des exercices

### ex0 - Simple lancement de conteneur Docker
L'objectif de cet exercice est de familiariser les utilisateurs avec les commandes de base de Docker pour lancer un conteneur. C'est une introduction pour ceux qui n'ont jamais utilisé Docker.

### ex1 - Audit simple de Dockerfile
Dans cet exercice, les utilisateurs apprendront à analyser et à auditer un Dockerfile pour identifier des configurations et des pratiques potentiellement risquées.

### ex2 - Évasion en utilisant les capacités
Cet exercice explore comment les capacités Docker peuvent être exploitées pour échapper à l'isolement du conteneur.

### ex3 - Évasion en utilisant les cgroups
Ici, les utilisateurs apprendront à échapper à l'isolement du conteneur en manipulant les cgroups.

### ex4 - Évasion en utilisant le socket
Cet exercice démontre comment l'accès au socket Docker peut être utilisé pour échapper à l'isolement du conteneur.

### ex5 - Forensic sur un conteneur Docker
L'objectif de cet exercice est de réaliser une analyse forensic sur un conteneur Docker pour identifier les traces d'une compromission ou d'une activité suspecte.

## Comment utiliser ce repository

1. Clonez le repository :
   ```bash
   git clone https://github.com/votre-utilisateur/docker-security-training.git
   ```

2. Naviguez dans le dossier des exercices que vous souhaitez réaliser :
   ```bash
   cd docker-security-training/
   ```

3. Suivez les instructions dans le README du dossier pour compléter les exercices.
   ```bash
   ls -la
   ```

## Contributions

Les contributions sont les bienvenues ! Si vous avez des suggestions pour de nouveaux exercices ou des améliorations pour les exercices existants, n'hésitez pas à créer une pull request.

## Licence

Ce projet est la propriété exclusive de FuzzingLabs et de Patrick Ventuzelo, CEO de FuzzingLabs. Tous les droits sont réservés.

### Conditions d'utilisation

#### Utilisation Personnelle et Éducative
- Ce projet peut être utilisé à des fins personnelles et éducatives uniquement.
- Toute utilisation commerciale sans autorisation écrite préalable de FuzzingLabs est strictement interdite.

#### Propriété Intellectuelle
- Tous les droits de propriété intellectuelle relatifs à ce projet, y compris les droits d'auteur et les marques, appartiennent à FuzzingLabs et à Patrick Ventuzelo.

# Trainings & Contact

Patrick Ventuzelo - [@pat_ventuzelo](https://twitter.com/pat_ventuzelo)
* Independent Security Researcher / Trainer.
* FREE online courses: [here](https://academy.fuzzinglabs.com/)