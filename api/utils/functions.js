const formatAPI = (value) => {
  const temps = [];
  if (value.temperament) {
    value.temperament.split(", ").forEach((e) => {
      temps.push(e.toLowerCase());
    });
  }

  return {
    id: value.id,
    nombre: value.name,
    imagen: value.image
      ? value.image.url
      : `https://cdn2.thedogapi.com/images/${value.reference_image_id}.jpg`,
    temperamento: temps.join(", "),
    peso: formatPeso(value.weight.metric),
    altura: value.height.metric,
    vida: value.life_span,
  };
};

const formatAPIPrueba = (value) => {
  const temps = [];
  if (value.temperament) {
    value.temperament.split(", ").forEach((e) => {
      temps.push(e.toLowerCase());
    });
  }

  return {
    id: value.id,
    nombre: value.name,
    imagen: value.image
      ? value.image.url
      : `https://cdn2.thedogapi.com/images/${value.reference_image_id}.jpg`,
    temperamento: temps.join(", "),
    peso: formatPeso(value.weight.metric),
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
    imagen: value.dataValues.imagen
      ? value.dataValues.imagen
      : "https://dummyimage.com/600x400/000/fff.jpg&text=Esta+raza+no+tiene+imagen",
    temperamento: temps.join(", "),
    peso: value.dataValues.peso,
    altura: value.dataValues.altura,
    vida: value.dataValues.vida,
    creado: value.dataValues.creado,
  };

  return paraMandar;
};

const formatTemp = (value) => {
  return {
    id: value.dataValues.id,
    nombre: value.dataValues.nombre,
  };
};

const formatAll = (apiArray, dbArray) => {
  const formatearAPI = apiArray.map((raza) => {
    return formatAPI(raza);
  });

  const formatearDB = [];

  if (dbArray) {
    for (const dog of dbArray) {
      formatearDB.push(formatDB(dog));
    }
  }

  const all = [...formatearAPI, ...formatearDB];

  return all;
};

const validateUUID = (str) => {
  const regExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regExp.test(str);
};

const formatPeso = (str) => {
  var formated = "";
  if (str.length === 1) {
    formated = "0 - " + str;
  } else if (str.length === 2) {
    formated = "0 - " + str;
  } else if (str === "NaN") {
    formated = "27 - 36";
  } else if (str.split(" - ")[0] === "NaN") {
    formated = "0 - " + str.split(" - ")[1];
  } else {
    formated = str;
  }
  return formated;
};

module.exports = {
  formatAPI,
  formatDB,
  formatTemp,
  formatAll,
  validateUUID,
  formatAPIPrueba,
};
