import Tache from '../models/taches.model.js';

const controller = {
    getAllTaches: async (req, res, next) => {
        try {
            const userId = req.headers['authorization'];
            const all = req.query.all === 'true';
            const taches = await Tache.getAllTachesByUser(userId, all);
            res.json(taches);
        } catch (err) {
            next(err);
        }
    },

    getTacheDetails: async (req, res, next) => {
        try {
            const tache = await Tache.getTacheDetails(req.params.id);
            if (!tache) return res.status(404).json({ error: 'Tâche non trouvée' });
            res.json(tache);
        } catch (err) {
            next(err);
        }
    },

    createTache: async (req, res, next) => {
        try {
            const apiKey = req.headers['authorization'];
            if (!apiKey) return res.status(401).json({ error: 'Clé API manquante' });

            const userId = await Tache.getUserByApiKey(apiKey);
            if (!userId) return res.status(403).json({ error: 'Clé API invalide' });

            const id = await Tache.createTache(req.body, userId);
            res.status(201).json({ id, message: 'Tâche ajoutée' });
        } catch (err) {
            next(err);
        }
    },

    updateTache: async (req, res, next) => {
        try {
            const apiKey = req.headers['authorization'];
            if (!apiKey) return res.status(401).json({ error: 'Clé API manquante' });

            await Tache.updateTache(req.params.id, req.body);
            res.json({ message: 'Tâche modifiée' });
        } catch (err) {
            next(err);
        }
    },

    updateStatutTache: async (req, res, next) => {
        try {
            const apiKey = req.headers['authorization'];
            if (!apiKey) return res.status(401).json({ error: 'Clé API manquante' });

            await Tache.updateStatutTache(req.params.id, req.body.complete);
            res.json({ message: 'Statut modifié' });
        } catch (err) {
            next(err);
        }
    },

    deleteTache: async (req, res, next) => {
        try {
            const apiKey = req.headers['authorization'];
            if (!apiKey) return res.status(401).json({ error: 'Clé API manquante' });

            await Tache.deleteTache(req.params.id);
            res.json({ message: 'Tâche supprimée' });
        } catch (err) {
            next(err);
        }
    },

    addSousTache: async (req, res, next) => {
        try {
            const apiKey = req.headers['authorization'];
            if (!apiKey) return res.status(401).json({ error: 'Clé API manquante' });

            await Tache.addSousTache(req.params.id, req.body);
            const tache = await Tache.getTacheDetails(req.params.id);
            res.status(201).json(tache);
        } catch (err) {
            next(err);
        }
    },

    updateSousTache: async (req, res, next) => {
        try {
            const apiKey = req.headers['authorization'];
            if (!apiKey) return res.status(401).json({ error: 'Clé API manquante' });
            
            await Tache.updateSousTache(req.params.sousTacheId, req.body.titre);
            const tache = await Tache.getTacheDetails(req.params.id);
            res.json(tache);
        } catch (err) {
            next(err);
        }
    },

    updateStatutSousTache: async (req, res, next) => {
        try {
            const apiKey = req.headers['authorization'];
            if (!apiKey) return res.status(401).json({ error: 'Clé API manquante' });

            await Tache.updateStatutSousTache(req.params.sousTacheId, req.body.complete);
            const tache = await Tache.getTacheDetails(req.params.id);
            res.json(tache);
        } catch (err) {
            next(err);
        }
    },

    deleteSousTache: async (req, res, next) => {
        try {
            const apiKey = req.headers['authorization'];
            if (!apiKey) return res.status(401).json({ error: 'Clé API manquante' });

            await Tache.deleteSousTache(req.params.sousTacheId);
            const tache = await Tache.getTacheDetails(req.params.id);
            res.json(tache);
        } catch (err) {
            next(err);
        }
    },

    getAllTachesByUserId: async (req, res, next) => {
    try {
            const userId = req.params.userId;
            const all = req.query.all === 'true';
            const taches = await Tache.getAllTachesByUser(userId, all);
            res.json(taches);
        } catch (err) {
            next(err);
        }
    },
};

export default controller;
