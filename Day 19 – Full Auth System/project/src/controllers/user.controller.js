// src/controllers/user.controller.js
import UserModel from '../models/user.model.js';

class UserController {
    // Get all users (admin only)
    async getAllUsers(req, res) {
        try {
            // You'll need to add this method to your UserModel
            const users = await UserModel.findAll();
            res.json({
                success: true,
                users: users
            });
        } catch (error) {
            console.error('Get all users error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    }

    // Get user by ID
    async getUserById(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const user = await UserModel.findById(userId);
            
            if (!user) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }

            res.json({
                success: true,
                user: user
            });
        } catch (error) {
            console.error('Get user by ID error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    }

    // Update user
    async updateUser(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const { username, email } = req.body;

            // Check if user exists
            const existingUser = await UserModel.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }

            // Check permissions (users can only update their own profile unless admin)
            if (req.user.id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({ 
                    success: false, 
                    message: 'You can only update your own profile' 
                });
            }

            // Update user
            const updatedUser = await UserModel.update(userId, { username, email });
            
            res.json({
                success: true,
                message: 'User updated successfully',
                user: updatedUser
            });
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    }

    // Delete user
    async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id);

            // Check if user exists
            const existingUser = await UserModel.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }

            // Check permissions (users can only delete their own profile unless admin)
            if (req.user.id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({ 
                    success: false, 
                    message: 'You can only delete your own profile' 
                });
            }

            // Delete user
            await UserModel.delete(userId);
            
            res.json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    }

    // Change user role (admin only)
    async changeUserRole(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const { role } = req.body;

            // Validate role
            const validRoles = ['user', 'moderator', 'admin'];
            if (!validRoles.includes(role)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid role' 
                });
            }

            // Check if user exists
            const existingUser = await UserModel.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }

            // Update role
            const updatedUser = await UserModel.updateRole(userId, role);
            
            res.json({
                success: true,
                message: 'User role updated successfully',
                user: updatedUser
            });
        } catch (error) {
            console.error('Change role error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    }

    // Get dashboard stats
    async getDashboardStats(req, res) {
        try {
            // You'll need to add these methods to your UserModel
            const totalUsers = await UserModel.countUsers();
            const recentUsers = await UserModel.findRecent(5);
            
            res.json({
                success: true,
                stats: {
                    totalUsers,
                    recentUsers
                }
            });
        } catch (error) {
            console.error('Get dashboard stats error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    }
}

export default new UserController();