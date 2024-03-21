const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  try {
    // Find all products and include associated Category, Tag, and ProductTag data
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find a single product by its `id` and include associated Category, Tag, and ProductTag data
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    if (!productData) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new product
router.post('/', async (req, res) => {
  try {
    // Create a new product
    const product = await Product.create(req.body);

    // If there are associated tags, create pairings in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// PUT update product data by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update product data
    const product = await Product.update(req.body, {
      where: { id: req.params.id }
    });

    // Update associated tags in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      await ProductTag.destroy({ where: { product_id: req.params.id } });

      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE delete a product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a product by its `id` value
    const productData = await Product.destroy({ where: { id: req.params.id } });
    if (!productData) {
      res.status(404).json({ message: 'Product not found. Cannot delete.' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
