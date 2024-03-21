const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tagData = await Tag.findAll({
      include: { model: Product }
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: { model: Product }
    });
    if (!tagData) {
      res.status(404).json({ message: 'Tag not found.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id }, returning: true }
    );
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id found.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'Tag not found. Cannot delete.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
