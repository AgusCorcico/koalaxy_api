const app = require("./src/app.js");
const { conn, Product, Company, Genre } = require("./src/db.js");
const {
  /* gameInfoFinal */ apicompany,
  apigenres,
} = require("./src/controllers/apidatos");
const { jsonGames } = require("./src/JSON/JsonOfVideogame");

conn.sync({ force: false }).then(() => {
  // si tenes en true, renueva la base de datos

  app.listen(3000, async () => {
    const dbgame = await Product.findAll();
    const dbcompany = await Company.findAll();
    const dbGenres = await Genre.findAll();

    if (dbgame.length < 1) {
      await Product.bulkCreate(jsonGames);
      console.log("creados");
    }

    if (!dbcompany.length) {
      const compañias = await apicompany();

      const compañiasParaInsertar = compañias.map((compañia) => {
        return { name: compañia };
      });

      // Insertar los registros en la tabla Genre
      await Company.bulkCreate(compañiasParaInsertar);
    }

    if (!dbGenres.length) {
      const genre = await apigenres();

      const generosParaInsertar = genre.map((genero) => {
        return { name: genero };
      });

      // Insertar los registros en la tabla Genre
      await Genre.bulkCreate(generosParaInsertar);
    }

    console.log("%s listening at 3000"); // eslint-disable-line no-console
  });
});
