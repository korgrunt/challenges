// Importer les modules nécessaires
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();  // Base de données SQLite

// Créer une instance de l'application Express
const app = express();

// Définir le port d'écoute
const PORT = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Créer une base de données en mémoire (vulnérabilité potentielle si elle était persistante)
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Erreur lors de la création de la base de données :', err.message);
    } else {
        console.log('Base de données SQLite créée avec succès dans un fichier.');
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)");
            db.run(`INSERT INTO users (name, age) VALUES ('${FLAG_NAME}', ${99})`);  // Requête vulnérable aux injections

        });
    }
});

// Créer une table pour stocker des utilisateurs (sans sécurisation des champs)
//db.serialize(() => {
 //   db.run("CREATE TABLE users (name TEXT, age INTEGER)");
//});

// Définir une route GET pour la page d'accueil
app.get('/', (req, res) => {

    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Connexion</title>
        </head>
        <body>
            <h2>Connexion au serveur</h2>
            <form action="/user" method="get">
                <label for="name">Nom d'utilisateur :</label>
                <input type="text" id="name" name="name" required>
                <br><br>
                <label for="pass">Mot de passe :</label>
                <input type="password" id="pass" name="pass" required>
                <br><br>
                <button type="submit">Login</button>
            </form>
    
            <script>
                const form = document.querySelector('form');
                form.onsubmit = (e) => {
                    e.preventDefault();
                    const name = document.getElementById('name').value;
                    const pass = document.getElementById('pass').value;
                    fetch('/user?name=' + encodeURIComponent(name) + '&pass=' + encodeURIComponent(pass))
                        .then(response => response.text())
                        .then(data => alert(data))
                        .catch(error => console.error('Erreur:', error));
                };
            </script>
        </body>
        </html>
    `);
    

});

// Définir une route GET pour une page "hello"
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

const uploadDir = path.join(__dirname, 'uploads');


// Vulnérabilité : Injection SQL dans une requête non préparée
app.get('/user', (req, res) => {
    const userName = req.query.name;
    const query = `SELECT * FROM users WHERE name = '${userName}'`;  // Requête non préparée
    //`SELECT * FROM users WHERE name = 'Paul' OR '1' = '1'`; 
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send('Erreur du serveur');
        } else if (rows.length > 0) {
            res.send(`Utilisateur trouvé : ${JSON.stringify(rows)}`);
        } else {
            res.send('Utilisateur non trouvé');
        }
    });
});

const FLAG_NAME = 'Flag{Inj3ction_sqL_4r3_pr3tty_d4Ng3r0u5}';
// Vulnérabilité : Absence de validation d'entrée sur les requêtes POST
app.get('/re-inject-flag-if-has-been-deleted-253637377382hhdhd28', (req, res) => {


    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)");
        db.run(`INSERT INTO users (name, age) VALUES ('${FLAG_NAME}', ${99})`);  // Requête vulnérable aux injections
    });
    
    res.send(`flag re injecté.`);
});


// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});