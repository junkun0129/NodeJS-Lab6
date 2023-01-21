const fs = require("fs");
const path = require("path");
const db = require("../util/mysql");

const recipes = require("../data/recipes.json");
const rootDirectory = require.main.path;
const dataPath = path.join(rootDirectory, "data", "recipes.json");



module.exports = class Recipe {
  constructor(name, ingredients, instructions) {
    this.id = recipes.length + 1;
    this.name = name;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }

  save() {
   const sql = "INSERT INTO Recipes (Name, Ingredients, Instructions) VALUES (?,?,?)"
   const params = [this.name, JSON.stringify(this.ingredients), JSON.stringify(this.instructions)]
   return db.execute(sql, params);
  }

  //static - call the method directly and not have to be instantiated
  static fetchAll() {
    const sql = "SELECT * FROM Recipes ORDER BY Id DESC";
    return db.query(sql);
  }

  static fetchAllSync() {
    return JSON.parse(fs.readFileSync(dataPath));
  }

  static fetchRecipeById(id) {
    const sql = "SELECT * FROM Recipes WHERE Id = ?";

    return db.query(sql, [id]);
  }

  static updateRecipeById(data) {
    const sql = `UPDATE Recipes SET Name = ?, Ingredients = ?, Instructions = ? WHERE (Id = ?)`;
    const params = [data.name, JSON.stringify(data.ingredients), JSON.stringify(data.instructions), data.id];
    return db.execute(sql, params);
  }

  static deleteRecipeById(id) {
    const sql = "DELETE FROM Recipes WHERE Id = ?";
    return db.execute(sql, [id])
  }
};
