import React from "react";
import img from "./dog.png";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={classes.container}>
      <div className={classes.opciones}>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/rodrigo-reyes-hernandez/">
              About
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/rodrigo-reyes-hernandez/">
              Contacto
            </a>
          </li>
        </ul>
      </div>
      <img src={img} alt="Una imagen" />
      <div className={classes.nombre}>
        <span>Hanry Dogs</span>
      </div>
      <div className={classes.iniciar}>
        <Link to="/dogs">
          <button>EMPEZAR AHORA!</button>
        </Link>
      </div>
    </div>
  );
}
