import express from 'express';
import {
  getAllTrees,
  getTreeById,
  getTreesByCategory,
  searchTrees,
  createTree
} from '../controllers/treeController.js';

const router = express.Router();

// Get all trees
router.get('/', getAllTrees);

// Search trees - this must come BEFORE the /:id route
router.get('/search/:query', searchTrees);

// Get trees by category - this must come BEFORE the /:id route
router.get('/category/:categoryId', getTreesByCategory);

// Get single tree by ID
router.get('/:id', getTreeById);

// Create new tree
router.post('/', createTree);

export default router;