const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "containers-us-west-112.railway.app",
    user: "root",
    password: "9XvuEtuDWTLHYPWI6pxJ",
    database: "railway",
    port: 6545
})

const sql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='Recipes'`;

pool.query(sql, (err, data)=>{
    if(err){
        return console.error(err.message);
    }

    if(data.length === 0){
        console.log("Table 'Recipes' does not exist");
        seedDB();
    }else{
        console.log("Table 'Recipes' exists");
    }
});

const seedDB=()=>{
    pool.query("DROP TABLE IF EXISTS Recipes");

    pool.query(
        `CREATE TABLE Recipes(
            Id INT PRIMARY KEY AUTO_INCREMENT, 
            Name VARCHAR(100) NOT NULL,
            Ingredients JSON NOT NULL, 
            Instructions JSON NOT NULL
        )`,
        (err)=>{
            if(err){
                return console.error(err)
            }
            console.log("Recipe table was successfully created")

        }
    );


    const sql = `INSERT INTO Recipes(Id, Name, Ingredients, Instructions) VALUES (?, ?, ?, ?)`;
    const params = [1, "jumpei", JSON.stringify(ingredients), JSON.stringify(instructions)];
    pool.query(sql, params, 
        (err)=>{
            if(err){
                return console.error("error yho");
            }
            console.log("Successful creation of 3 books");
        }    
    )

    // pool.query(
    //     `
    //         INSERT INTO Recipes()
    //     `,
    //     (err)=>{
    //         if(err){
    //             return console.error(err)
    //         }
    //         console.log("Successful creation of 5 recipes")
    //     }

    // );
};

const ingredients = [
    {
      "name": "spicy sausage",
      "quantity": "12 oz"
    },
    {
      "name": "onion",
      "quantity": "1 large"
    },
    {
      "name": "bell pepper",
      "quantity": "1"
    },
    {
      "name": "garlic",
      "quantity": "3 cloves"
    },
    {
      "name": "crushed red pepper flakes",
      "quantity": "1 tsp"
    },
    {
      "name": "dried oregano",
      "quantity": "1 tsp"
    },
    {
      "name": "dried basil",
      "quantity": "1 tsp"
    },
    {
      "name": "salt",
      "quantity": "1 tsp"
    },
    {
      "name": "black pepper",
      "quantity": "1 tsp"
    },
    {
      "name": "crushed tomatoes",
      "quantity": "28 oz can"
    },
    {
      "name": "penne pasta",
      "quantity": "1 lb"
    },
    {
      "name": "grated parmesan cheese",
      "quantity": "1 cup"
    }
  ]

const instructions = [
    "1. Cook the pasta according to package instructionss until al dente. Drain and set aside.",
    "2. In a large skillet, cook the sausage over medium heat until browned. Drain any excess fat.",
    "3. Add the onion, bell pepper, and garlic to the skillet and cook until softened, about 5 minutes.",
    "4. Stir in the red pepper flakes, oregano, basil, salt, and black pepper.",
    "5. Pour in the crushed tomatoes and bring the mixture to a simmer.",
    "6. Add the cooked pasta to the skillet and toss to coat with the sauce.",
    "7. Serve the pasta in bowls and top with grated Parmesan cheese."
  ]
module.exports = pool.promise();


