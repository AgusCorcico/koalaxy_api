const axios = require("axios");
const { Product } = require("../db.js");


const apicompany = async () => {

  try {
    // Obtener todos los registros de Product
    const productos = await Product.findAll();

    // Extraer los géneros de cada registro y combinarlos en un solo array
    const compañias = productos.map(producto => producto.company).flat();

    // Eliminar cualquier género duplicado
    const compañiasUnicas = [...new Set(compañias)];

    return compañiasUnicas;
  } catch (error) {
    console.log(error);
  }
};

const apigenres = async () => {

  try {
    // Obtener todos los registros de Product
    const productos = await Product.findAll();

    // Extraer los géneros de cada registro y combinarlos en un solo array
    const generos = productos.map(producto => producto.genre).flat();

    // Eliminar cualquier género duplicado
    const generosUnicos = [...new Set(generos)];

    return generosUnicos;
  } catch (error) {
    console.log(error);
  }
  };

const getApiInfo = async () => {
  let result = []; //uno por uno con su respectiva info
  let gets = []; //5 paginas de 20c/u = 100 arreglos de videojuegos
  let page = [1, 2, 3, 4, 5];

  page.forEach((e) => {
    gets.push(
      axios.get(
        `https://api.rawg.io/api/games?key=4a654b64c98046ea932e3e617b6c47a6&page=${e}`
      )
    );
  });

  await Promise.all(gets)
    .then((e) => {
      //100
      e.forEach((e) => {
        let res = e.data;
        result.push(
          ...res.results.map((e) => {
            const objInfo = {
              id: e.id,
              img: e.background_image,
              name: e.name,
              genre: e.genres.map((e) => e.name),
              MinRequirements: "",
              RecommendRequirements: "",
              calification: e.rating,
              released: e.released,
              price: Math.round(Math.random() * (5000.99 - 500.99) + 500.99),
              stock: Math.floor(Math.random() * (500 - 0)),
              discount: Math.floor(Math.random() * (50 - 0)),
              description: "",
              company: "",
            };
            return objInfo;
          })
        );
      });
    })
    .then(() => result)
    .catch((error) => console.log(error));
  /*   await Product.bulkCreate(result) */
  return result;
};

const gameInfoFinal = async () => {
  const games = await getApiInfo();
  for (let i = 0; i < games.length; i++) {
    const id = games[i].id;
    const detailinfo = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=4a654b64c98046ea932e3e617b6c47a6&page&page`
    );

    //agrega la desc
    const detailDesc = detailinfo.data.description;
    games[i].description = detailDesc;

    //agrego req
    const minreqfiltro = detailinfo.data.platforms.filter(
      (e) => e.platform.id == 4
    );
    const minreq = minreqfiltro;
    games[i].MinRequirements = minreq[0]?.requirements?.minimum;

    const reqfiltro = detailinfo.data.platforms.filter(
      (e) => e.platform.id == 4
    );
    const req = reqfiltro;
    games[i].RecommendRequirements = req[0]?.requirements?.recommended;

    const companyDetail = detailinfo.data.developers[0].name;
    games[i].company = companyDetail;
  }

  return games;
};

module.exports = {  getApiInfo, gameInfoFinal, apicompany, apigenres };
