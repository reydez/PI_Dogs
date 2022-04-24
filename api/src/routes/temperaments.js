const axios = require("axios");
const { formatTemp } = require("../../utils/functions.js");
const router = require("express").Router();
const { Temperament } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    const db = await Temperament.findAll();
    const paraMandar = [];
    for (const temp of db) {
      paraMandar.push(formatTemp(temp));
    }
    res.json(paraMandar);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
