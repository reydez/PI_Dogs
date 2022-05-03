import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/actions";
import classes from "./Details.module.css";

export default function Details() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const details = useSelector((state) => state.raza);

  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      await dispatch(getDetails(id));
      setIsLoading(false);
    };

    loadDetails();
  }, [dispatch, id]);

  return (
    <Fragment>
      <div className={classes.btnRegresar}>
        <ul>
          <li>
            <Link to="/dogs">Regresar a la pagina principal</Link>
          </li>
        </ul>
      </div>
      {isLoading && (
        <div className={classes.loadingText}>
          <h3>Loading...</h3>
        </div>
      )}
      {!isLoading && (
        <div>
          <div className={classes.container}>
            <div className={classes.detalles}>
              <div className={classes.imageContainer}>
                <a href={details.imagen}>Enlace de imagen</a>
                <img src={details.imagen} alt="Una imagen" />
              </div>
              <div className={classes.infoContainer}>
                <ul>
                  <li>
                    <span>Nombre: </span>
                    {details.nombre}
                  </li>
                  <li>
                    <span>Temperamentos: </span>
                    {details.temperamento}
                  </li>
                  <li>
                    <span>Altura: </span>
                    {details.altura}
                  </li>
                  <li>
                    <span>Peso: </span>
                    {details.peso}
                  </li>
                  <li>
                    <span>Años de vida: </span>
                    {details.vida}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
