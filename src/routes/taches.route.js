import express from 'express';
import controller from '../controllers/taches.controller.js';

const router = express.Router();

// Route pour afficher la liste de toutes les tâches
router.get('/', controller.getAllTaches);

// Route pour afficher le détail d'une tâche selon son id
router.get('/:id', controller.getTacheDetails);

// Route pour ajouter une tâche
router.post('/', controller.createTache);

// Route pour modifier une tâche avec son id
router.put('/:id', controller.updateTache);

// Route pour modifier le statut d'une tâche avec son id
router.patch('/:id/statut', controller.updateStatutTache);

// Route pour supprimer une tâche avec son id
router.delete('/:id', controller.deleteTache);

// Route pour ajouter une sous-tâche avec son id
router.post('/:id/sous-taches', controller.addSousTache);

// Route pour modifier une sous-tâche avec le id de la tache et de la sous-tache
router.put('/:id/sous-taches/:sousTacheId', controller.updateSousTache);

// Route pour modifier le statut d'une sous-tâche avec le id de la tache et de la sous-tache
router.patch('/:id/sous-taches/:sousTacheId/statut', controller.updateStatutSousTache);

// Route pour supprimer une sous-tâche avec le id de la tache et de la sous-tache
router.delete('/:id/sous-taches/:sousTacheId', controller.deleteSousTache);

// Route pour afficher les tâches d'un utilisateur avec le id du user
router.get('/utilisateur/:userId', controller.getAllTachesByUserId);

export default router;
