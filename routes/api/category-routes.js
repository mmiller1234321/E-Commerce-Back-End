const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Product data
    const categoryData = await Category.findAll({
      include: { model: Product }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find a single category by its `id` and include associated Product data
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id found.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found. Cannot delete.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
