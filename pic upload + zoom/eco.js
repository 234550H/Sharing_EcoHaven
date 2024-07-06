const express = require('express');
const router = express.Router();
const { ProductDetail } = require('../models'); // Adjust this import based on your project structure
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const yup = require('yup');

// multer configuration
const storage = multer.diskStorage({

  // destination of uploaded files
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // unique suffix using current timestamp & random number
    cb(null, uniqueSuffix + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 } // 1MB file size limit
}).single('file'); // field name for file input

// validation schema using yup
const validationSchema = yup.object({
  prodName: yup.string().trim().min(3).max(100).required(),
  leaves: yup.number().min(0).required(),
  stock: yup.number().min(0).required(),
  sku: yup.string().trim().min(3).max(50).required()
});

// POST route to create a new product detail with file upload
router.post('/product-detail', upload, async (req, res) => {
  try {
    // validate request body (excluding file) using yup schema
    const { prodName, leaves, stock, sku } = req.body;
    await validationSchema.validate({ prodName, leaves, stock, sku }, { abortEarly: false });

    // create new product detail
    const newProduct = await ProductDetail.create({
      prodName,
      leaves,
      stock,
      sku,
      prodimg: req.file ? req.file.filename : null // save file filename in the database
    });

    res.status(201).json(newProduct); // respond with the newly created product detail
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
});

// GET route to fetch all product details
router.get('/product-detail', async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
    condition[Op.or] = [
      { prodName: { [Op.like]: `%${search}%` } },
      { sku: { [Op.like]: `%${search}%` } },
      { prodimg: { [Op.like]: `%${search}%` } }
    ];
  }

  try {
    const productList = await ProductDetail.findAll({
      where: condition,
      order: [['createdAt', 'DESC']]
    });
    res.json(productList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product list', error: error.message });
  }
});

// GET route to fetch a single product detail by id
router.get('/product-detail/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const productDetail = await ProductDetail.findByPk(id);
    if (!productDetail) {
      res.sendStatus(404);
      return;
    }

    // assuming prodimg contains the filename of the uploaded image
    const filename = productDetail.prodimg;

    // return the image file path
    res.sendFile(path.join(__dirname, '../uploads', filename));
  } catch (error) {
    res.status(500).json({ message: `Error fetching product with id ${id}`, error: error.message });
  }
});

// route to serve images based on filename
router.get('/product-images/:filename', (req, res) => {
  const filename = req.params.filename;
  // construct the path to the image file
  const imagePath = path.join(__dirname, '../uploads', filename); // adjust the path as per your file storage location

  // send the file as a response
  res.sendFile(imagePath);
});


// PUT route to update a product detail by id
router.put('/product-detail/:id', upload, async (req, res) => {
  const id = req.params.id;
  try {
    let productDetail = await ProductDetail.findByPk(id);
    if (!productDetail) {
      res.sendStatus(404);
      return;
    }

    // validate request body (excluding file) using yup schema
    const { prodName, leaves, stock, sku } = req.body;
    await validationSchema.validate({ prodName, leaves, stock, sku }, { abortEarly: false });

    // update product detail
    const updatedFields = {
      prodName,
      leaves,
      stock,
      sku,
      prodimg: req.file ? req.file.filename : productDetail.prodimg // update file path if new file uploaded
    };
    const updatedProduct = await productDetail.update(updatedFields);

    res.json({ message: 'Product detail updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: `Error updating product with id ${id}`, error: error.message });
  }
});

// DELETE route to delete a product detail by id
router.delete('/product-detail/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const num = await ProductDetail.destroy({ where: { id: id } });
    if (num === 1) {
      res.json({ message: 'Product detail deleted successfully' });
    } else {
      res.status(400).json({ message: `Cannot delete product detail with id ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error deleting product with id ${id}`, error: error.message });
  }
});

module.exports = router;
