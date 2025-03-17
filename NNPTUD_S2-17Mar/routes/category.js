var express = require('express');
var router = express.Router();
let Category = require('../schemas/category');

// Get all categories
router.get('/', async (req, res) => {
    try {
        let categories = await Category.find({});
        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, data: category });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    try {
        let newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    try {
        let updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        let deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
