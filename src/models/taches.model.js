import db from '../config/db.js';

const model = {
    // Récupérer toutes les tâches d'un utilisateur
    getAllTachesByUser: async (userId, showAll) => {
        const query = showAll
            ? `SELECT * FROM taches WHERE utilisateur_id = $1`
            : `SELECT * FROM taches WHERE utilisateur_id = $1 AND complete != true`;

        const result = await db.query(query, [userId]);
        return result.rows;
    },

    // Détail d'une tâche + sous-tâches associées
    getTacheDetails: async (tacheId) => {
        const res = await db.query(`SELECT * FROM taches WHERE id = $1`, [tacheId]);
        if (res.rows.length === 0) return null;

        const sousTaches = await db.query(
            `SELECT id, titre, complete FROM sous_taches WHERE tache_id = $1`,
            [tacheId]
        );

        const tache = res.rows[0];
        tache.sous_taches = sousTaches.rows;

        return tache;
    },

    // Créer une tâche
    createTache: async (data, userId) => {
        const { titre, description, date_debut, date_echeance, complete } = data;
        const result = await db.query(
            `INSERT INTO taches (utilisateur_id, titre, description, date_debut, date_echeance, complete)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [userId, titre, description, date_debut, date_echeance, complete || false]
        );
        return result.rows[0].id;
    },

    // Modifier une tâche (sauf le statut)
    updateTache: async (id, data) => {
        const { titre, description, date_debut, date_echeance } = data;
        await db.query(
            `UPDATE taches SET titre = $1, description = $2, date_debut = $3, date_echeance = $4 WHERE id = $5`,
            [titre, description, date_debut, date_echeance, id]
        );
        return true;
    },

    // Modifier uniquement le statut
    updateStatutTache: async (id, complete) => {
        await db.query(`UPDATE taches SET complete = $1 WHERE id = $2`, [complete, id]);
        return true;
    },

    // Supprimer une tâche
    deleteTache: async (id) => {
        await db.query(`DELETE FROM sous_taches WHERE tache_id = $1`, [id]);
        await db.query(`DELETE FROM taches WHERE id = $1`, [id]);
        return true;
    },

    // Ajouter une sous-tâche
    addSousTache: async (tacheId, data) => {
        const { titre, complete } = data;
        const result = await db.query(
            `INSERT INTO sous_taches (tache_id, titre, complete) VALUES ($1, $2, $3) RETURNING id`,
            [tacheId, titre, complete || false]
        );
        return result.rows[0].id;
    },

    // Modifier une sous-tâche
    updateSousTache: async (id, titre) => {
        await db.query(`UPDATE sous_taches SET titre = $1 WHERE id = $2`, [titre, id]);
        return true;
    },

    // Modifier le statut d’une sous-tâche
    updateStatutSousTache: async (id, complete) => {
        await db.query(`UPDATE sous_taches SET complete = $1 WHERE id = $2`, [complete, id]);
        return true;
    },

    // Supprimer une sous-tâche
    deleteSousTache: async (id) => {
        await db.query(`DELETE FROM sous_taches WHERE id = $1`, [id]);
        return true;
    },


    getUserByApiKey: async (apiKey) => {
        const res = await db.query(
            `SELECT id FROM utilisateur WHERE cle_api = $1`,
            [apiKey]
        );
        return res.rows[0]?.id || null;
    }
};

export default model;
