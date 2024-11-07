// Importer les modules nécessaires
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();  // Base de données SQLite

// Créer une instance de l'application Express
const app = express();

// Définir le port d'écoute
const PORT = 3000;

// Middleware pour analyser les requêtes JSON et les requêtes en URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Créer une base de données en fichier
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Erreur lors de la création de la base de données :', err.message);
    } else {
        console.log('Base de données SQLite créée avec succès dans un fichier.');
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, comment TEXT)");
        });
    }
});

// Route GET pour afficher le formulaire de soumission de commentaires
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Commentaires</title>
        </head>
        <body>
            <h2>Poster un commentaire</h2>
            <form action="/comment" method="post">
                <label for="comment">Commentaire :</label>
                <textarea id="comment" name="comment" required></textarea>
                <br><br>
                <button type="submit">Envoyer</button>
            </form>
            <br>
            <a href="/comments">Voir les commentaires</a>
        </body>
        </html>
    `);
});

// Route POST pour soumettre un commentaire
app.post('/comment', (req, res) => {
    const userComment = req.body.comment;

    db.run("INSERT INTO comments (comment) VALUES (?)", [userComment], (err) => {
        if (err) {
            res.status(500).send('Erreur du serveur lors de l\'insertion du commentaire');
        } else {
            res.redirect('/comments');
        }
    });
});

// Route GET pour afficher tous les commentaires
app.get('/comments', (req, res) => {
    db.all("SELECT comment FROM comments", [], (err, rows) => {
        if (err) {
            res.status(500).send('Erreur du serveur lors de la récupération des commentaires');
        } else {
            const commentsHTML = rows.map(row => `<p>${row.comment}</p>`).join('');
            res.send(`
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Commentaires</title>
                    <script>
                        // Rafraîchit la page toutes les 30 secondes
                        setInterval(() => {
                            window.location.reload();
                        }, 30000);
                    </script>
                </head>
                <body>
                    <h2>Liste des commentaires</h2>
                    ${commentsHTML}
                    <br>
                    <a href="/">Retour au formulaire</a>
                </body>
                </html>
            `);
        }
    });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
//Flaf{Y0ur_g0t_mY_T0k3n_c0ngr4tul4t10n}