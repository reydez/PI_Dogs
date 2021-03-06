import axios from "axios";

export const getRazas = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/dogs");
    dispatch({ type: "GET_RAZAS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getTemperaments = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/temperaments");
    dispatch({ type: "GET_TEMPERAMENTS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getRazasByName = (nombre) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/dogs?name=${nombre}`
    );

    dispatch({ type: "GET_RAZAS_BY_NAME", payload: response.data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: "GET_RAZAS_BY_NAME", payload: error.response.data });
    }
  }
};

export const getDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/dogs/${id}`);
    dispatch({ type: "GET_DETAILS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const filterByTemperamento = (temperamento) => {
  return {
    type: "FILTER_BY_TEMPERAMENTO",
    payload: temperamento,
  };
};

export const filterByRazaExistente = (value) => {
  return {
    type: "FILTER_BY_RAZA_EXISTENTE",
    payload: value,
  };
};

export const sortAZ = (value) => {
  return {
    type: "SORT_AZ",
    payload: value,
  };
};

export const sortPeso = (value) => {
  return {
    type: "SORT_PESO",
    payload: value,
  };
};
