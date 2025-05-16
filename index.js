import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import routerTaches from './src/routes/taches.route.js';
import routeUsers from './src/routes/users.route.js'; // Assure-toi d'avoir ce fichier

import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Morgan pour les erreurs 500
const errorLogStream = fs.createWriteStream(path.resolve('error.log'), { flags: 'a' });
app.use(morgan('dev'));
app.use(morgan('combined', {
  skip: (req, res) => res.statusCode < 500,
  stream: errorLogStream
}));

app.get('/', (req, res) => {
    res.send("<h1>Etienne Beaulieu</h1>");
});

app.get('/api', (req, res) => {
    res.send("<h1>Bienvenue sur mon API de gestion de tâches!</h1>");
});

// Routes importees
app.use('/api/taches', routerTaches);
app.use('/api/users', routeUsers);

// Log dans error.log
app.use((err, req, res, next) => {
    console.error(err.stack);
    fs.appendFileSync('error.log', `${new Date().toISOString()} - ${err.stack}\n`);
    res.status(500).json({ error: "Erreur interne du serveur" });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});
