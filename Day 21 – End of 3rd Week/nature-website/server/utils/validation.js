import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

export const validatePlantData = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Plant name must be at least 2 characters long' });
  }
  
  if (data.category_id && isNaN(parseInt(data.category_id))) {
    errors.push({ field: 'category_id', message: 'Valid category ID is required' });
  }
  
  return errors;
};

export const validateTreeData = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Tree name must be at least 2 characters long' });
  }
  
  if (data.category_id && isNaN(parseInt(data.category_id))) {
    errors.push({ field: 'category_id', message: 'Valid category ID is required' });
  }
  
  return errors;
};

export const validateReviewData = (data) => {
  const errors = [];
  
  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.push({ field: 'rating', message: 'Rating must be between 1 and 5' });
  }
  
  if (data.comment && data.comment.length > 500) {
    errors.push({ field: 'comment', message: 'Comment must not exceed 500 characters' });
  }
  
  return errors;
};