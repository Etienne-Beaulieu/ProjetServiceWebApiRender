import express from 'express';
import userController from '../controllers/users.controller.js';

const router = express.Router();

// Route pour ajouter un utilisateur
router.post('/register', userController.registerUser);

// Route pour recuperer ou regenerer une cle API
router.post('/apikey', userController.getOrGenerateApiKey);

export default router;
