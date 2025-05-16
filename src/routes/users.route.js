import express from 'express';
import userController from '../controllers/users.controller.js';

const router = express.Router();

// Ajouter un utilisateur
router.post('/register', userController.registerUser);

// Récupérer ou regénérer une clé API
router.post('/apikey', userController.getOrGenerateApiKey);

export default router;
