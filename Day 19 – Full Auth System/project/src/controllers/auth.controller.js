import UserModel from '../models/user.model.js';
import AuthService from '../services/auth.service.js';

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const existingUsername = await UserModel.findByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      // Hash password and create user
      const hashedPassword = await AuthService.hashPassword(password);
      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword
      });

      // Generate JWT
      const token = AuthService.generateToken(newUser);

      res.status(201).json({
        message: 'User registered successfully',
        user: newUser,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await AuthService.comparePasswords(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Update last login
      await UserModel.updateLastLogin(user.id);

      // Generate token
      const token = AuthService.generateToken(user);

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new AuthController();