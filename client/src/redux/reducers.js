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
      return {};

    case "FILTER_BY_RAZA_EXISTENTE":
      return {};

    case "SORT":
      return {};

    default:
      return state;
  }
};

export default rootReducer;
