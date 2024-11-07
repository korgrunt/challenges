
const express = require('express');
const path = require('path');


const app = express();


const PORT = 3000;


app.use(express.json());


// Database connection with these credentials => user: "database_admin12345" and pass: "H4rd_4nd_s3creT_p4s5", so, flag is => FLAG{<user>:<pass>}



app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur ! dites bonjours a l\'API');
});


app.get('/hello', (req, res) => {
    res.send('Bonjour, nos fichiers sont disponibles à l\'url /files, nous avons un fichier hello.txt à l\'intérieur');
});


const uploadDir = path.join(__dirname, 'uploads');



app.get('/files/:filename', (req, res) => {
    console.log("/files/:filename")

    const filename = req.params.filename;

    const filePath = path.join(uploadDir, filename);

    const normalizedPath = path.normalize(filePath);

    
    res.sendFile(normalizedPath, (err) => {
        if (err) {
            res.status(404).send('Fichier non trouvé dans le dossier upload');
        }
    });
});


app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});