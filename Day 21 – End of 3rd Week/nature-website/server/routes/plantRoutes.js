import express from 'express';
import {
  getAllPlants,
  getPlantById,
  getPlantsByCategory,
  searchPlants,
  createPlant,
  updatePlant,
  deletePlant
} from '../controllers/plantController.js';

const router = express.Router();

router.get('/', getAllPlants);
router.get('/search/:query', searchPlants);
router.get('/category/:categoryId', getPlantsByCategory);
router.get('/:id', getPlantById);
router.post('/', createPlant);
router.put('/:id', updatePlant);
router.delete('/:id', deletePlant);

export default router;