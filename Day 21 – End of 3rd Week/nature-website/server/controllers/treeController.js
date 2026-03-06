import Tree from '../models/Tree.js';

export const getAllTrees = async (req, res, next) => {
  try {
    const trees = await Tree.findAll();
    res.json({
      success: true,
      count: trees.length,
      data: trees
    });
  } catch (error) {
    next(error);
  }
};

export const getTreeById = async (req, res, next) => {
  try {
    const tree = await Tree.findById(req.params.id);
    if (!tree) {
      return res.status(404).json({
        success: false,
        message: 'Tree not found'
      });
    }
    res.json({
      success: true,
      data: tree
    });
  } catch (error) {
    next(error);
  }
};

export const getTreesByCategory = async (req, res, next) => {
  try {
    const trees = await Tree.findByCategory(req.params.categoryId);
    res.json({
      success: true,
      count: trees.length,
      data: trees
    });
  } catch (error) {
    next(error);
  }
};

export const searchTrees = async (req, res, next) => {
  try {
    const { query } = req.params;
    const trees = await Tree.search(query);
    res.json({
      success: true,
      count: trees.length,
      data: trees
    });
  } catch (error) {
    next(error);
  }
};

export const createTree = async (req, res, next) => {
  try {
    const tree = await Tree.create(req.body);
    res.status(201).json({
      success: true,
      data: tree
    });
  } catch (error) {
    next(error);
  }
};