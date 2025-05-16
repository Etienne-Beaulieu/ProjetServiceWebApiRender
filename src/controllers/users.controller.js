import userModel from '../models/users.model.js';
import crypto from 'crypto';

const generateApiKey = () => crypto.randomBytes(15).toString('hex');

const controller = {
    // Fonction pour ajouter un user a la bd avec le modele
    registerUser: async (req, res, next) => {
        try {
            const { nom, prenom, email, password } = req.body;
            if (!nom || !prenom || !email || !password) {
                return res.status(400).json({ error: "Tous les champs sont requis." });
            }

            const existing = await userModel.findByEmail(email);
            if (existing) {
                return res.status(400).json({ error: "Utilisateur déjà existant." });
            }

            const apiKey = generateApiKey();
            const userId = await userModel.createUser({ nom, prenom, email, apiKey, password});

            res.status(201).json({ message: "Utilisateur créé avec succès.", apiKey });
        } catch (err) {
            next(err);
        }
    },

    // Fonction pour recuperer ou regenerer la cle api selon true ou false regenerate
    getOrGenerateApiKey: async (req, res, next) => {
        try {
            const { email, password, regenerate } = req.body;

            const user = await userModel.findByEmailAndPassword(email, password);
            if (!user) return res.status(401).json({ error: "Identifiants invalides." });

            if (regenerate) {
                const newKey = generateApiKey();
                await userModel.updateApiKey(user.id, newKey);
                return res.json({ apiKey: newKey });
            }

            res.json({ apiKey: user.cle_api });
        } catch (err) {
            next(err);
        }
    }
};

export default controller;
