export const API_BASE_URL = 'http://localhost:5000/api';

export const SUNLIGHT_OPTIONS = [
  { value: 'full_sun', label: 'Full Sun' },
  { value: 'partial_sun', label: 'Partial Sun' },
  { value: 'partial_shade', label: 'Partial Shade' },
  { value: 'full_shade', label: 'Full Shade' }
];

export const WATERING_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'high', label: 'High' },
  { value: 'very_high', label: 'Very High' }
];

export const GROWTH_RATE_OPTIONS = [
  { value: 'slow', label: 'Slow' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'fast', label: 'Fast' }
];

export const SOIL_TYPES = [
  'Clay',
  'Sandy',
  'Loamy',
  'Chalky',
  'Peaty',
  'Silty'
];

export const TEMPERATURE_ZONES = [
  'Tropical',
  'Subtropical',
  'Temperate',
  'Mediterranean',
  'Alpine',
  'Arid'
];

export const BLOOM_SEASONS = [
  'Spring',
  'Summer',
  'Fall',
  'Winter',
  'Year Round'
];

export const NAVIGATION_ITEMS = [
  { name: 'Home', path: '/', icon: 'Home' },
  { name: 'Plants', path: '/plants', icon: 'Leaf' },
  { name: 'Trees', path: '/trees', icon: 'TreePine' },
  { name: 'Categories', path: '/categories', icon: 'Grid' }
];

export const USER_MENU_ITEMS = [
  { name: 'Profile', path: '/profile', icon: 'User' },
  { name: 'Favorites', path: '/favorites', icon: 'Heart' },
  { name: 'Reviews', path: '/reviews', icon: 'Star' },
  { name: 'Settings', path: '/settings', icon: 'Settings' }
];

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  REGISTER: 'Successfully registered!',
  LOGOUT: 'Successfully logged out!',
  PROFILE_UPDATE: 'Profile updated successfully!',
  PASSWORD_CHANGE: 'Password changed successfully!',
  ADD_FAVORITE: 'Added to favorites!',
  REMOVE_FAVORITE: 'Removed from favorites!',
  ADD_REVIEW: 'Review added successfully!'
};

export const PLACEHOLDER_IMAGES = {
  plant: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400',
  tree: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
  category: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600',
  user: 'https://images.unsplash.com/photo-1494790108777-0ad5193d3f8d?w=400'
};

export const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' }
];

export const ITEMS_PER_PAGE = 12;

export const MAX_REVIEW_LENGTH = 500;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_USERNAME_LENGTH = 50;