require("dotenv").config();
const axios = require("axios");
const { Temperament } = require("../src/db.js");
const { API_KEY } = process.env;

const cargarTemperamentos = async () => {
  const response = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const dogs = response.data;

  dogs.forEach((e) => {
    if (e.temperament) {
      const listaDeTemps = e.temperament
        .split(", ")
        .map((temp) => temp.toLowerCase());

      if (listaDeTemps.length) {
        listaDeTemps.forEach((e) => {
          Temperament.findOrCreate({
            where: {
              nombre: e,
            },
          });
        });
      }
    }
  });
};

module.exports = { cargarTemperamentos };
