// server/routes/api/v1/userRoutes.js
const express = require('express');
const userController = require('../../../controllers/userController');
const authMiddleware = require('../../../middleware/authMiddleware');
const roleMiddleware = require('../../../middleware/roleMiddleware');

const router = express.Router();

// All routes after this middleware are protected
router.use(authMiddleware.protect);

// Special route for authenticated user to get their own profile
router.get('/me', userController.getMe, userController.getUser);

// Restrict these routes to 'admin' role
router.use(roleMiddleware.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;