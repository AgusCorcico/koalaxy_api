require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/e_videogame`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Product, Genre, Role, User,Cart,Productcart, Wishlist, Productwish,Library, Productlibrary, Review,Order } = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

/* Product.belongsToMany(Genre, { through: "product_genres" });
Genre.belongsToMany(Product, { through: "product_genres" }); */
Cart.hasOne(User);
User.belongsTo(Cart);

Cart.belongsToMany(Product, { through: "cart_product" });
Product.belongsToMany(Cart, { through: "cart_product" });


Cart.hasMany(Productcart);
Productcart.belongsTo(Cart);


Product.hasMany(Productcart);
Productcart.belongsTo(Product);

Wishlist.hasOne(User);
User.belongsTo(Wishlist);

Wishlist.belongsToMany(Product, { through: "wishlist_product" });
Product.belongsToMany(Wishlist, { through: "wishlist_product" });

Wishlist.hasMany(Productwish);
Productwish.belongsTo(Wishlist);

Product.hasMany(Productwish);
Productwish.belongsTo(Product);

Library.hasOne(User);
User.belongsTo(Library);

Library.belongsToMany(Product, { through: "library_product" })
Product.belongsToMany(Library, { through: "library_product" })

Library.hasMany(Productlibrary);
Productlibrary.belongsTo(Product);

Product.hasMany(Productlibrary);
Productwish.belongsTo(Product)

Order.belongsTo(User);
User.hasMany(Order)

Order.belongsToMany(Product,{through:"product_order"});
Product.belongsToMany(Order,{through:"product_order"})

Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
