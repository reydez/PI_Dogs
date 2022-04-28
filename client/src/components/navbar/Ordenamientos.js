import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { sortAZ, sortPeso } from "../../redux/actions";

export default function Ordenamientos({
  setPage,
  orderByAzRef,
  orderByPesoRef,
}) {
  const dispatch = useDispatch();

  const handleSortAZ = (e) => {
    dispatch(sortAZ(e.target.value));
    setPage();
  };

  const handleSortPeso = (e) => {
    dispatch(sortPeso(e.target.value));
    setPage();
  };

  return (
    <Fragment>
      <li>
        Orden alfabetico:{" "}
        <select ref={orderByAzRef} onChange={(e) => handleSortAZ(e)}>
          <option value="">Seleccione orden</option>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </li>
      <li>
        Orden Por Peso:{" "}
        <select ref={orderByPesoRef} onChange={(e) => handleSortPeso(e)}>
          <option value="">Seleccione orden</option>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </li>
    </Fragment>
  );
}
