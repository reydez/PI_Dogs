import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRazasByName } from "../../redux/actions";

export default function BarraDeBusqueda({ setPage }) {
  const [nombre, setNombre] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setNombre(e.target.value.replace(/[^a-zA-Z\s]/gi, ""));
  };

  const handleSearchByName = () => {
    dispatch(getRazasByName(nombre));
    setNombre("");
    setPage();
  };

  return (
    <li>
      Por Nombre:{" "}
      <input
        type="text"
        value={nombre}
        placeholder="Buscar Raza..."
        onChange={(e) => handleChange(e)}
      />
      <button type="button" onClick={handleSearchByName}>
        Buscar
      </button>
    </li>
  );
}
