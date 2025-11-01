// server/routes/api/v1/productRoutes.js
const express = require('express');
const productController = require('../../../controllers/productController');
const authMiddleware = require('../../../middleware/authMiddleware');
const roleMiddleware = require('../../../middleware/roleMiddleware');
const { validateBody } = require('../../../middleware/validationMiddleware');
const { createProductSchema, updateProductSchema } = require('../../../validators/productValidator');

const router = express.Router();

// --- Public Routes (Optional - depends on if you want anyone to see products) ---
// If you want products to be public, keep these outside the protected block:
// router.get('/', productController.getAllProducts);
// router.get('/:id', productController.getProduct);

// --- Export Route (Must be before dynamic ID route) ---
// This route is specific and should be matched before /:id
router.get('/export',
  authMiddleware.protect, // Protect this specific route
  roleMiddleware.restrictTo('admin', 'manager'), // Restrict roles
  productController.exportProducts
);

// --- All routes after this middleware are PROTECTED ---
router.use(authMiddleware.protect);

// Now define the general GET / and GET /:id routes
// They will *not* intercept /export because /export was defined first.
router.get('/', productController.getAllProducts); // Now protected
router.get('/:id', productController.getProduct); // Now protected

// --- Routes that require specific roles (Admin/Manager) ---
// Apply roleMiddleware.restrictTo to ALL routes below this line
router.use(roleMiddleware.restrictTo('admin', 'manager'));

router.post('/', validateBody(createProductSchema), productController.createProduct);

router
  .route('/:id')
  .patch(validateBody(updateProductSchema), productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;