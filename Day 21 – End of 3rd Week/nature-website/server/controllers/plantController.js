import Plant from '../models/Plant.js';

export const getAllPlants = async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    next(error);
  }
};

export const getPlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }
    res.json({
      success: true,
      data: plant
    });
  } catch (error) {
    next(error);
  }
};

export const getPlantsByCategory = async (req, res, next) => {
  try {
    const plants = await Plant.findByCategory(req.params.categoryId);
    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    next(error);
  }
};

export const searchPlants = async (req, res, next) => {
  try {
    const { query } = req.params;
    const plants = await Plant.search(query);
    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    next(error);
  }
};

export const createPlant = async (req, res, next) => {
  try {
    const plant = await Plant.create(req.body);
    res.status(201).json({
      success: true,
      data: plant
    });
  } catch (error) {
    next(error);
  }
};

export const updatePlant = async (req, res, next) => {
  try {
    const plant = await Plant.update(req.params.id, req.body);
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }
    res.json({
      success: true,
      data: plant
    });
  } catch (error) {
    next(error);
  }
};

export const deletePlant = async (req, res, next) => {
  try {
    const plant = await Plant.delete(req.params.id);
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }
    res.json({
      success: true,
      message: 'Plant deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};