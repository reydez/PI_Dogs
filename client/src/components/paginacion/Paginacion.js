import React from "react";
import classes from "./Paginacion.module.css";

export default function Paginacion({ numerosDePagina, handlePage }) {
  return (
    <div className={classes.pageNumbers}>
      {numerosDePagina &&
        numerosDePagina.map((numero) => (
          <button key={numero} onClick={() => handlePage(numero)}>
            {numero}
          </button>
        ))}
    </div>
  );
}
