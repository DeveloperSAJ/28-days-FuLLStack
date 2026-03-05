// src/routes/user.routes.js
import express from "express";
import UserController from "../controllers/user.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route (no authentication required)
router.get("/public", (req, res) => {
  res.json({
    success: true,
    message: "This is a public endpoint - no authentication needed",
  });
});

// Protected routes (authentication required)
router.get(
  "/profile",
  verifyToken,
  UserController.getUserById.bind(UserController),
);

// User routes (any authenticated user)
router.get("/user", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Welcome User!",
    user: req.user,
  });
});

// Moderator routes (moderator and admin only)
router.get(
  "/moderator",
  [verifyToken, checkRole(["moderator", "admin"])],
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Moderator! You have access to moderator features.",
      user: req.user,
    });
  },
);

// Admin only routes
router.get("/admin", [verifyToken, checkRole(["admin"])], (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin! You have full access to all features.",
    user: req.user,
  });
});

// Get all users (admin only)
router.get(
  "/users",
  [verifyToken, checkRole(["admin"])],
  UserController.getAllUsers.bind(UserController),
);

// Get user by ID (admin only or own profile)
router.get(
  "/users/:id",
  verifyToken,
  UserController.getUserById.bind(UserController),
);

// Update user (own profile or admin)
router.put(
  "/users/:id",
  verifyToken,
  UserController.updateUser.bind(UserController),
);

// Delete user (own profile or admin)
router.delete(
  "/users/:id",
  verifyToken,
  UserController.deleteUser.bind(UserController),
);

// Change user role (admin only)
router.patch(
  "/users/:id/role",
  [verifyToken, checkRole(["admin"])],
  UserController.changeUserRole.bind(UserController),
);

// Get dashboard stats (admin only)
router.get(
  "/admin/stats",
  [verifyToken, checkRole(["admin"])],
  UserController.getDashboardStats.bind(UserController),
);

// Get users by role (admin only)
router.get(
  "/admin/users/role/:role",
  [verifyToken, checkRole(["admin"])],
  async (req, res) => {
    try {
      const users = await UserModel.findByRole(req.params.role);
      res.json({
        success: true,
        users: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

export default router;
