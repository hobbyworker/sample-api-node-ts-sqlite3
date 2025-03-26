import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import {
  createItemController,
  getAllItemsController,
  getItemByIdController,
  updateItemController,
  deleteItemController,
} from '../controllers/item.controller';

const router = Router();

// Apply JWT authentication middleware to all item-related routes
router.post('/', authenticateJWT, createItemController);       // Create
router.get('/', authenticateJWT, getAllItemsController);           // Read (All)
router.get('/:id', authenticateJWT, getItemByIdController);         // Read (One)
router.put('/:id', authenticateJWT, updateItemController);         // Update
router.delete('/:id', authenticateJWT, deleteItemController);      // Delete

export default router;
