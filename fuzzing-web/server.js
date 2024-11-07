
const express = require('express');
const path = require('path');


const app = express();


const PORT = 3000;


app.use(express.json());




app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenue sur la page web du site de report d'informations sensibles</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f4f4f4;
                    color: #333;
                }
                h1 {
                    color: #0073e6;
                }
            </style>
        </head>
        <body>
            <h1>Bienvenue sur le site de signalement de nos sservices !</h1>
            <p>Administrateur, vous savez où vous rendre...</p>
        </body>
        </html>`);
});


app.post('/server_admin_small', (req, res) => {
    const { user, pass } = req.body;

    // Vérifie si les identifiants sont fournis
    if (!user || !pass) {
        return res.send("Pour s'authentifier, il faut un 'user' et un 'pass' dans le corps de la requête POST.");
    }

    // Vérifie les identifiants
    if (user === 'admin' && pass === 'admin') {
        res.send("success, the flag is => Flag{4dm1n_$th3nth1cation_suc3es_it_s_th3_fl4g}");
    } else {
        res.send("Accès refusé");
    }
});




app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});