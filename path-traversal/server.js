// Importer les modules nécessaires
const express = require('express');
const path = require('path');

// Créer une instance de l'application Express
const app = express();

// Définir le port d'écoute
const PORT = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());



// Créer une table pour stocker des utilisateurs (sans sécurisation des champs)
//db.serialize(() => {
 //   db.run("CREATE TABLE users (name TEXT, age INTEGER)");
//});

// Définir une route GET pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur !');
});

// Définir une route GET pour une page "hello"
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

const uploadDir = path.join(__dirname, 'uploads');


// Vulnérabilité : Inclusion de fichier avec un chemin d'accès non sécurisé
app.get('/files/:filename', (req, res) => {
    console.log("/files/:filename")

    const filename = req.params.filename;

    const filePath = path.join(uploadDir, filename);

    const normalizedPath = path.normalize(filePath);

    // Envoyer le fichier
    res.sendFile(normalizedPath, (err) => {
        if (err) {
            res.status(404).send('Fichier non trouvé');
        }
    });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});