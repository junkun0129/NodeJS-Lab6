const router = require("express").Router();

const {
  getRecipesPage,
  postAddRecipe,
  getRecipeById,
  getAddRecipePage,
  getEditRecipe,
  putEditRecipe,
  deleteRecipe
} = require("../controller/recipes.controller");

router.get("/", getRecipesPage);
router.get("/create", getAddRecipePage);
router.post("/save", postAddRecipe);
router.get("/:id", getRecipeById);
router.get("/:id/edit", getEditRecipe);
router.put("/:id/edit", putEditRecipe);
router.delete("/delete/:id", deleteRecipe);

module.exports = router;
