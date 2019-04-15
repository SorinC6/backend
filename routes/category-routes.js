const express = require("express");
const router = express.Router();
const restricted = require("../middleware/tokenRestricted");
const catHelpers = require("../database/dbHelpers/categoriesHelper");

/**
 * GET all categories from database
 */

router.get("/api/categories", restricted, async (req, res) => {
  try {
    const categories = await catHelpers.getAllCategories();
    res.status(200).json({
      categories,
      decodedToken: req.decodedToken
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "there was a error trying to get categories" });
  }
});

/**
 * Get category by id
 */

router.get("/api/categories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const category = await catHelpers.getCategoriesById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error trying to get a category by id" });
  }
});

/**
 * Add a category to database
 */
router.post("/api/categories", async (req, res) => {
  const body = req.body;

  if (body.name) {
    try {
      const result = await catHelpers.addCategory(body);
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: "error trying to add a new category in database" });
    }
  } else {
    res.status(401).json({ error: "please provide a name for the category" });
  }
});

module.exports = router;
