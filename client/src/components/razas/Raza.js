import React from "react";
import classes from "./Raza.module.css";

export default function Raza({ imagen, nombre, temperamento, peso }) {
  return (
    <div className={classes.card}>
      <div className={classes.imageContainer}>
        <img src={imagen} alt="Una imagen" />
      </div>
      <div className={classes.infoContainer}>
        <h5>
          <strong>Nombre:</strong> {nombre}
        </h5>
        <h5>
          <strong>Peso:</strong> {peso}
        </h5>
      </div>
      <div className={classes.temps}>
        <h6>
          {temperamento ? temperamento : "Esta raza no tiene temperamentos"}
        </h6>
      </div>
    </div>
  );
}
