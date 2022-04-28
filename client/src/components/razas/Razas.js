import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRazas } from "../../redux/actions";
import classes from "./Raza.module.css";
import Raza from "./Raza";
import { Link } from "react-router-dom";

export default function Razas({ razas }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadRazas = async () => {
      dispatch(getRazas());
    };
    loadRazas();
  }, [dispatch]);

  if (razas.error) {
    return (
      <div className={classes.razas}>
        <h1>{razas.error}</h1>
      </div>
    );
  } else {
    return (
      <div className={classes.razas}>
        {razas &&
          razas.map((raza, index) => (
            <Link to={`/dogs/${raza.id}`}>
              <Raza
                key={index}
                id={raza.id}
                imagen={raza.imagen}
                nombre={raza.nombre}
                temperamento={raza.temperamento}
                peso={raza.peso}
              />
            </Link>
          ))}
      </div>
    );
  }
}
