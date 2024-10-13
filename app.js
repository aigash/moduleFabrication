const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const userRoutes = require('./src/routes/userRoutes');

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
        }
    }
}));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/config', express.static(path.join(__dirname, 'config')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);

app.use((req, res, next) => {
    res.status(404).send("Désolé, cette page n'existe pas !");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose s\'est mal passé !');
});

app.listen(port, () => {
    console.log(`Le serveur est démarré sur http://localhost:${port}`);
});
