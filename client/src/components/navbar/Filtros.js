import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByRazaExistente,
  filterByTemperamento,
  getTemperaments,
} from "../../redux/actions";

export default function Filtros({ setPage, clearOrders }) {
  const temps = useSelector((state) => state.temperamentos);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTemps = () => {
      dispatch(getTemperaments());
    };
    loadTemps();
  }, [dispatch]);

  const handleFilterByTemps = (e) => {
    dispatch(filterByTemperamento(e.target.value));
    setPage();
    clearOrders();
  };

  const handleFilterByExistencia = (e) => {
    dispatch(filterByRazaExistente(e.target.value));
    setPage();
    clearOrders();
  };

  return (
    <Fragment>
      <li>
        Por Temperamento:{" "}
        <select onChange={(e) => handleFilterByTemps(e)}>
          <option value="All">All</option>
          {temps.map((temp, index) => (
            <option value={temp.nombre} key={index}>
              {temp.nombre}
            </option>
          ))}
        </select>
      </li>
      <li>
        Raza Existente:{" "}
        <select onChange={(e) => handleFilterByExistencia(e)}>
          <option value="All">All</option>
          <option value="api">api</option>
          <option value="db">db</option>
        </select>
      </li>
    </Fragment>
  );
}
