const Recipe = require("../model/Recipe.model");

exports.getRecipesPage = (req, res) => {
  //create our own callback process
  let iwatani;
  Recipe.fetchAll()
  .then(([rows])=>{
    res.render("recipes", {recipes:rows})
    iwatani = rows
  })
  .catch((err)=>console.error("eror"))
  console.log(iwatani)
};

exports.getRecipeById = (req, res) => {
  const id = parseInt(req.params.id);
  Recipe.fetchRecipeById(id)
  .then(([row])=>{
    console.log(row);
    res.json(row);
  })
  .catch((err)=>console.error("rorr"))
  
};

exports.getAddRecipePage = (req, res) => {
  res.render("create", { title: "Add Recipe" });
};

exports.postAddRecipe = (req, res) => {
  let { name, ingredients, quantity, instructions } = req.body;

  //check if ingredient is an array
  if (!Array.isArray(ingredients)) {
    ingredients = [ingredients];
  }

  //check if quantity is an array
  if (!Array.isArray(quantity)) {
    quantity = [quantity];
  }

  //remap ingredients and quantities to an array of objects
  const reMappedIngredients = ingredients.map((ingredient, index) => {
    return {
      name: ingredient,
      quantity: quantity[index]
    };
  });

  //check if instructions is an array
  if (!Array.isArray(instructions)) {
    instructions = [instructions];
  }

  const newRecipe = new Recipe(name, reMappedIngredients, instructions);
  newRecipe.save()
  .then(()=>{
    res.redirect("/recipes")
  })
  .catch((err)=> console.error(";alsdkj"))
};

exports.getEditRecipe = (req, res) => {
  const id = parseInt(req.params.id);
  Recipe.fetchRecipeById(id)
  .then(([row])=>{
    console.log(row)
    res.render("edit", {recipe: row[0] });
  })
  .catch((err)=>console.error("err"))


}

exports.putEditRecipe = (req, res) => {
  let { name, ingredients, quantity, instructions } = req.body;

  //check if ingredient is an array
  if (!Array.isArray(ingredients)) {
    ingredients = [ingredients];
  }

  //check if quantity is an array
  if (!Array.isArray(quantity)) {
    quantity = [quantity];
  }

  //remap ingredients and quantities to an array of objects
  const reMappedIngredients = ingredients.map((ingredient, index) => {
    return {
      name: ingredient,
      quantity: quantity[index]
    };
  });

  //check if instructions is an array
  if (!Array.isArray(instructions)) {
    instructions = [instructions];
  }

  const updatedRecipe = {
    id: +req.params.id,
    name,
    ingredients: reMappedIngredients,
    instructions
  }

  Recipe.updateRecipeById(updatedRecipe)
  .then(()=>{
    res.redirect("/recipes");
  }).catch((err)=>console.error("err"))
}

exports.deleteRecipe = (req,res) => {
  Recipe.deleteRecipeById(req.params.id, ({ message, status }) => {
    if (status === 200) {
      res.redirect("/recipes")
    } else {
      res.render("404", { title: "Recipe Not Found", message });
    }
  });

  Recipe.deleteRecipeById(parseInt(req.params.id))
  .then(()=>{
    res.redirect("/recipes")
  }).catch((err)=>console.error("error"))
  
}