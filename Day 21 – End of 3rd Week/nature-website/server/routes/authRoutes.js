import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getFavorites,
  addFavorite,
  removeFavorite,
  getReviews,
  addReview
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../utils/validation.js';

const router = express.Router();

// Public routes
router.post('/register',
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  validate,
  register
);

router.post('/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile',
  authenticate,
  [
    body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').optional().isEmail().withMessage('Please provide a valid email')
  ],
  validate,
  updateProfile
);

router.post('/change-password',
  authenticate,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
  ],
  validate,
  changePassword
);

// Favorites routes
router.get('/favorites', authenticate, getFavorites);
router.post('/favorites',
  authenticate,
  [
    body('itemType').isIn(['plant', 'tree']).withMessage('Item type must be plant or tree'),
    body('itemId').isInt().withMessage('Valid item ID is required')
  ],
  validate,
  addFavorite
);
router.delete('/favorites/:itemType/:itemId', authenticate, removeFavorite);

// Reviews routes
router.get('/reviews', authenticate, getReviews);
router.post('/reviews',
  authenticate,
  [
    body('itemType').isIn(['plant', 'tree']).withMessage('Item type must be plant or tree'),
    body('itemId').isInt().withMessage('Valid item ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().trim()
  ],
  validate,
  addReview
);

export default router;