const initialState = {
  razas: [],
  tempRazas: [],
  temperamentos: [],
  raza: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RAZAS":
      return {
        ...state,
        razas: action.payload,
        tempRazas: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperamentos: action.payload,
      };

    case "GET_RAZAS_BY_NAME":
      return {
        ...state,
        razas: action.payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        raza: action.payload,
      };

    case "FILTER_BY_TEMPERAMENTO":
      const copyTemp = state.tempRazas.map((tr) => {
        return {
          ...tr,
          temperamento: tr.temperamento ? tr.temperamento.split(", ") : [],
        };
      });

      const filtered =
        action.payload === "All"
          ? copyTemp
          : copyTemp.filter(
              (tempRaza) => tempRaza.temperamento.indexOf(action.payload) >= 0
            );

      const filteredTemps = filtered.map((f) => {
        return {
          ...f,
          temperamento: f.temperamento.join(", "),
        };
      });

      return {
        ...state,
        razas: filteredTemps,
      };

    case "FILTER_BY_RAZA_EXISTENTE":
      var filteredExistencia;

      if (action.payload === "api") {
        filteredExistencia = state.tempRazas.filter((tempRaza) => {
          return !tempRaza.creado;
        });
      } else if (action.payload === "db") {
        filteredExistencia = state.tempRazas.filter((tempRaza) => {
          return tempRaza.creado;
        });
      } else {
        filteredExistencia = state.tempRazas;
      }

      return {
        ...state,
        razas: filteredExistencia,
      };

    case "SORT_AZ":
      var sortedByAZ = state.razas.slice();

      if (action.payload === "ASC") {
        sortedByAZ.sort((a, b) => {
          var textoA = a.nombre.toUpperCase();
          var textoB = b.nombre.toUpperCase();
          return textoA > textoB ? 1 : textoA < textoB ? -1 : 0;
        });
      } else if (action.payload === "DESC") {
        sortedByAZ.sort((a, b) => {
          var textoA = a.nombre.toUpperCase();
          var textoB = b.nombre.toUpperCase();
          return textoA > textoB ? -1 : textoA < textoB ? 1 : 0;
        });
      }

      return {
        ...state,
        razas: sortedByAZ,
      };

    case "SORT_PESO":
      var sortedByPeso = state.razas.slice();

      if (action.payload === "ASC") {
        sortedByPeso.sort((a, b) => {
          return a.peso.split(" - ")[1] - b.peso.split(" - ")[1];
        });
      } else if (action.payload === "DESC") {
        sortedByPeso.sort((a, b) => {
          return b.peso.split(" - ")[1] - a.peso.split(" - ")[1];
        });
      }

      return {
        ...state,
        razas: sortedByPeso,
      };
    default:
      return state;
  }
};

export default rootReducer;
