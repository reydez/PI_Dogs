const formatAPI = (value) => {
  return {
    id: value.id,
    nombre: value.name,
    imagen: value.image
      ? value.image.url
      : `https://cdn2.thedogapi.com/images/${value.reference_image_id}.jpg`,
    temperamento: value.temperament,
    peso: value.weight.metric,
    altura: value.height.metric,
    vida: value.life_span,
  };
};

const formatDB = (value) => {
  const temps = [];
  if (value.temperaments) {
    value.temperaments.forEach((e) => {
      temps.push(e.nombre);
    });
  }

  const paraMandar = {
    id: value.dataValues.id,
    nombre: value.dataValues.nombre,
    temperamento: temps.join(", "),
    peso: value.dataValues.peso,
  };

  if (value.vida) paraMandar.vida = value.vida;
  if (value.altura) paraMandar.altura = value.altura;

  return paraMandar;
};

const formatTemp = (value) => {
  return {
    id: value.dataValues.id,
    nombre: value.dataValues.nombre,
  };
};

module.exports = { formatAPI, formatDB, formatTemp };
