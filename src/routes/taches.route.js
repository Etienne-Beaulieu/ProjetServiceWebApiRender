import express from 'express';
import controller from '../controllers/taches.controller.js';

const router = express.Router();

// Afficher la liste de toutes les tâches
router.get('/', controller.getAllTaches);

// Afficher le détail d'une tâche
router.get('/:id', controller.getTacheDetails);

// Ajouter une tâche
router.post('/', controller.createTache);

// Modifier une tâche
router.put('/:id', controller.updateTache);

// Modifier le statut d'une tâche
router.patch('/:id/statut', controller.updateStatutTache);

// Supprimer une tâche
router.delete('/:id', controller.deleteTache);

// Ajouter une sous-tâche
router.post('/:id/sous-taches', controller.addSousTache);

// Modifier une sous-tâche
router.put('/:id/sous-taches/:sousTacheId', controller.updateSousTache);

// Modifier le statut d'une sous-tâche
router.patch('/:id/sous-taches/:sousTacheId/statut', controller.updateStatutSousTache);

// Supprimer une sous-tâche
router.delete('/:id/sous-taches/:sousTacheId', controller.deleteSousTache);

// Afficher les tâches d'un utilisateur
router.get('/utilisateur/:userId', controller.getAllTachesByUserId);

export default router;
