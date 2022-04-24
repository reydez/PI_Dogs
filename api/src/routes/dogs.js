require("dotenv").config();
const axios = require("axios");
const { formatAPI, formatDB } = require("../../utils/functions.js");
const { Dog, Temperament } = require("../db.js");
const router = require("express").Router();
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const db = await Dog.findAll({ include: [{ model: Temperament }] });

    const formatearAPI = response.data.map(formatAPI);

    const formatearDB = [];

    if (db) {
      for (const dog of db) {
        formatearDB.push(formatDB(dog));
      }
    }

    const all = [...formatearAPI, ...formatearDB];

    /* query */
    const paraMandar = [];
    const { name } = req.query;

    if (name) {
      all.forEach((e) => {
        if (e.nombre.toLowerCase().includes(name.toLowerCase())) {
          paraMandar.push(e);
        }
      });

      return paraMandar.length
        ? res.json(paraMandar)
        : res.status(404).json({ error: "No existe ese perro" });
    }

    res.json(all);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id.includes("-")) {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`
      );

      return res.json({
        id: response.data.id,
        imagen: `https://cdn2.thedogapi.com/images/${response.data.reference_image_id}.jpg`,
        nombre: response.data.name,
        temperamento: response.data.temperament,
        altura: response.data.height.metric,
        peso: response.data.weight.metric,
        vida: response.data.life_span,
      });
    } else {
      const db = await Dog.findByPk(id, { include: [{ model: Temperament }] });
      if (db) return res.json(formatDB(db));
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  const { nombre, altura, peso, vida, temperamentos } = req.body;

  if (!nombre || !altura || !peso)
    return res.status(404).send({ error: "Faltan datos por ingresar" });

  try {
    const obj = {
      nombre,
      altura,
      peso,
      vida,
    };

    const nuevaRaza = await Dog.create(obj);
    nuevaRaza.addTemperaments(temperamentos);

    return res.json({ msg: "Registro fue exitoso" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
