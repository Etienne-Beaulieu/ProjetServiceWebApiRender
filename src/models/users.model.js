import db from '../config/db.js';

const model = {
    // Créer un utilisateur
    createUser: async ({ nom, prenom, email, apiKey, password }) => {
        const result = await db.query(
            `INSERT INTO utilisateur (nom, prenom, courriel, cle_api, password)
             VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [nom, prenom, email, apiKey, password]
        );
        return result.rows[0].id;
    },

    // Trouver un utilisateur par email
    findByEmail: async (email) => {
        const result = await db.query(`SELECT * FROM utilisateur WHERE courriel = $1`, [email]);
        return result.rows[0];
    },

    // Trouver un utilisateur par email et mot de passe
    findByEmailAndPassword: async (email, password) => {
        const result = await db.query(
            `SELECT * FROM utilisateur WHERE courriel = $1 AND password = $2`,
            [email, password]
        );
        return result.rows[0];
    },

    // Mettre à jour la clé API
    updateApiKey: async (userId, newKey) => {
        await db.query(`UPDATE utilisateur SET cle_api = $1 WHERE id = $2`, [newKey, userId]);
    }
};

export default model;
