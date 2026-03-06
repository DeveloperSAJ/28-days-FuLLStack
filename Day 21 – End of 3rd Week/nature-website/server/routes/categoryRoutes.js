import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  getCategoryWithItems
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.get('/:id/items', getCategoryWithItems);

export default router;