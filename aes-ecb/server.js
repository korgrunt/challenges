const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Clé AES hardcodée
const key = Buffer.from('0000000000000099', 'utf8');

// Fonction pour chiffrer en AES-128-ECB
function encrypt(text, key) {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    return Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
}

// Fonction pour déchiffrer en AES-128-ECB
function decrypt(encrypted, key) {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}

// Endpoint de login qui génère le cookie
app.get('/login', (req, res) => {
    const svc = req.query.svc || 'crawl';
    const svcparam = req.query.svc_param || 'url';

    // Vérifie que les paramètres ne contiennent pas 'adm=1'
    if (/adm=1/i.test(svc) || /adm=1/i.test(svcparam)) {
        return res.status(403).send('Hacking attempt detected');
    }

    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const str_cookie = `service=${svc};adm=0;service_param=${svcparam};date=${date}`;
    const cookie = encrypt(str_cookie, key);
    const encodedCookie = Buffer.from(cookie).toString('base64');

    res.cookie('admin', encodedCookie);
    res.send('Login successful, cookie set');
});

// Endpoint admin qui vérifie le cookie et renvoie le flag si 'adm=1' est présent
app.get('/admin', (req, res) => {
    const adminCookie = req.cookies.admin ? Buffer.from(req.cookies.admin, 'base64') : null;

    if (adminCookie) {
        const decrypted = decrypt(adminCookie, key);
        console.log(decrypted)
        if (decrypted.includes('adm=1')) {
            return res.send('FLAG{HO_B3_c4refuL_us1ng_th3_right_c1ph3r_m0dE}');
        } else {
            return res.status(403).send('Access denied');
        }
    } else {
        res.status(403).send('No valid admin cookie set');
    }
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
