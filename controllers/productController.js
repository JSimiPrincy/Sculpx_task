// server/controllers/productController.js
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/productService');
const { Parser } = require('json2csv'); // For CSV export
const AppError = require('../utils/AppError'); // Added AppError

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const { products, totalCount } = await productService.getAllProducts(req.query);

  res.status(200).json({
    status: 'success',
    results: products.length,
    totalCount, // Send total count for client-side pagination
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      product: updatedProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await productService.deleteProduct(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.exportProducts = catchAsync(async (req, res, next) => {
  // Use the same getAllProducts logic to get filtered/sorted data
  // Pass a query string that includes filter, sort, search but no pagination/limit
  const { products } = await productService.getAllProducts({
    ...req.query,
    limit: 'all', // Custom flag for service to not paginate for export
    page: '1'
  });

  if (products.length === 0) {
    return res.status(200).send('No products to export based on current filters.');
  }

  const fields = ['_id', 'name', 'description', 'price', 'category', 'stock', 'availableForPurchase', 'createdAt'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(products);

  res.header('Content-Type', 'text/csv');
  res.attachment('products.csv'); // This will trigger a download in the browser
  res.send(csv);
});