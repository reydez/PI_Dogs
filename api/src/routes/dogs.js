require("dotenv").config();
const axios = require("axios");
const {
  formatAPI,
  formatDB,
  formatAll,
  validateUUID,
} = require("../../utils/functions.js");
const { Dog, Temperament } = require("../db.js");
const router = require("express").Router();
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const db = await Dog.findAll({ include: [{ model: Temperament }] });

    const all = formatAll(response.data, db);

    /* if query */
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
        : res.status(404).json({ error: "No existe esa raza de perro" });
    }

    res.json(all);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (validateUUID(id)) {
      const db = await Dog.findByPk(id, { include: [{ model: Temperament }] });
      if (db) return res.json(formatDB(db));
    } else if (!isNaN(id)) {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`
      );

      return res.json(formatAPI(response.data));
    } else {
      return res.status(404).json({ error: "El Id ingresado no es valido " });
    }
  } catch (error) {
    res.status(404).json({ error: "Algo salio mal =(" });
  }
});

router.post("/create", async (req, res) => {
  const { nombre, altura, peso, vida, imagen, temperamentos } = req.body;

  const response = await axios.get(
    `https://api.thedogapi.com/v1/breeds/search?q=${nombre}`
  );

  const db = await Dog.findAll({ include: [{ model: Temperament }] });

  const all = formatAll(response.data, db);

  if (!nombre || !altura || !peso)
    return res.status(404).send({ error: "Faltan datos por ingresar" });

  try {
    const obj = {
      nombre,
      altura,
      peso,
      vida,
      imagen,
    };

    var flag = false;

    if (all.length) {
      all.forEach(async (raza) => {
        if (raza.nombre.toLowerCase() === nombre.toLowerCase()) {
          flag = true;
        }
      });
    }

    if (flag) {
      return res.json({ msg: "Ya existe ese registro" });
    }

    const nuevaRaza = await Dog.create(obj);
    await nuevaRaza.addTemperaments(temperamentos);

    const justaAddedRaza = await Dog.findOne({
      where: {
        id: nuevaRaza.id,
      },
      include: [{ model: Temperament }],
    });

    return res.json({
      msg: "Registro fue exitoso",
      AddedRaza: formatDB(justaAddedRaza),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
