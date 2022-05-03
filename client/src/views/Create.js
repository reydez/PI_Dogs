import React, { Fragment, useState } from "react";
import classes from "./Create.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useInput from "../hooks/use-input";
import axios from "axios";

const isNotEmpty = (valor) => valor.trim() !== "";

const validatePAV = (valor) => valor.trim() !== "" && valor > 0 && valor <= 100;

export default function Create() {
  const temperamentos = useSelector((state) => state.temperamentos);
  const [temps, setTemps] = useState([]);

  const {
    valor: valorNombre,
    esValido: nombreEsValido,
    tieneError: nombreTieneError,
    valorChangeHandler: nombreChangeHandler,
    inputBlurHandler: nombreBlurHandler,
    reset: resetNombre,
  } = useInput(isNotEmpty);

  const {
    valor: valorAltura,
    esValido: alturaEsValido,
    tieneError: alturaTieneError,
    valorChangeHandler: alturaChangeHandler,
    inputBlurHandler: alturaBlurHandler,
    reset: resetAltura,
  } = useInput(validatePAV);

  const {
    valor: valorAlturaMax,
    esValido: alturaMaxEsValido,
    tieneError: alturaMaxTieneError,
    valorChangeHandler: alturaMaxChangeHandler,
    inputBlurHandler: alturaMaxBlurHandler,
    reset: resetAlturaMax,
  } = useInput(validatePAV);

  const {
    valor: valorPeso,
    esValido: pesoEsValido,
    tieneError: pesoTieneError,
    valorChangeHandler: pesoChangeHandler,
    inputBlurHandler: pesoBlurHandler,
    reset: resetPeso,
  } = useInput(validatePAV);

  const {
    valor: valorPesoMax,
    esValido: pesoMaxEsValido,
    tieneError: pesoMaxTieneError,
    valorChangeHandler: pesoMaxChangeHandler,
    inputBlurHandler: pesoMaxBlurHandler,
    reset: resetPesoMax,
  } = useInput(validatePAV);

  const {
    valor: valorVida,
    esValido: vidaEsValido,
    tieneError: vidaTieneError,
    valorChangeHandler: vidaChangeHandler,
    inputBlurHandler: vidaBlurHandler,
    reset: resetVida,
  } = useInput(validatePAV);

  const {
    valor: valorVidaMax,
    esValido: vidaMaxEsValido,
    tieneError: vidaMaxTieneError,
    valorChangeHandler: vidaMaxChangeHandler,
    inputBlurHandler: vidaMaxBlurHandler,
    reset: resetVidaMax,
  } = useInput(validatePAV);

  const {
    valor: valorImagen,
    esValido: imagenEsValido,
    tieneError: imagenTieneError,
    valorChangeHandler: imagenChangeHandler,
    inputBlurHandler: imagenBlurHandler,
    reset: resetImagen,
  } = useInput(isNotEmpty);

  let formEsValido = false;
  let sonValidos = false;

  if (
    nombreEsValido &&
    alturaEsValido &&
    alturaMaxEsValido &&
    pesoEsValido &&
    pesoMaxEsValido &&
    vidaEsValido &&
    vidaMaxEsValido &&
    imagenEsValido
  ) {
    formEsValido = true;
  }

  if (
    valorAlturaMax > valorAltura &&
    valorPesoMax > valorPeso &&
    valorVidaMax > valorVida
  ) {
    sonValidos = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formEsValido) {
      alert("Algunos campos estan vacios");
      return;
    }

    if (!sonValidos) {
      alert("Valores maximos tienen que ser mayores a los minimos");
      return;
    }

    const raza = {
      nombre: valorNombre,
      altura: valorAltura + " - " + valorAlturaMax,
      peso: valorPeso + " - " + valorPesoMax,
      vida: valorVida + " - " + valorVidaMax + " years",
      imagen: valorImagen,
      temperamentos: temps,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/dogs/create",
        raza
      );

      if (response.request.status === 200) {
        alert("Se ha registrado la raza correctamente");
      }

      resetNombre();
      resetAltura();
      resetAlturaMax();
      resetPeso();
      resetPesoMax();
      resetVida();
      resetVidaMax();
      resetImagen();
      setTemps([]);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.value.trim() !== "") {
      var found = temps.find((temp) => temp === e.target.value);
      if (!found) {
        setTemps((prevState) => [...prevState, e.target.value]);
      }
    }
  };

  const removeTemp = (value) => {
    setTemps((prevState) => prevState.filter((temp) => temp !== value));
  };

  const nombreClasses = nombreTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const alturaClasses = alturaTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const alturaMaxClasses = alturaMaxTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const pesoClasses = pesoTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const pesoMaxClasses = pesoMaxTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const vidaClasses = vidaTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const vidaMaxClasses = vidaMaxTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const imagenClasses = imagenTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  return (
    <Fragment>
      <div className={classes.btnRegresar}>
        <ul>
          <li>
            <Link to="/dogs">Regresar a la Pagina principal</Link>
          </li>
        </ul>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.titulo}>
          <h1>Registrar Raza</h1>
        </div>
        <div className={classes.controlGroup}>
          <div className={nombreClasses}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={valorNombre}
              onChange={nombreChangeHandler}
              onBlur={nombreBlurHandler}
            />
            {nombreTieneError && (
              <p className={classes.errorText}>favor de ingresar el nombre</p>
            )}
          </div>

          <div className={imagenClasses}>
            <label htmlFor="img">Link de Imagen</label>
            <input
              id="img"
              type="text"
              value={valorImagen}
              onChange={imagenChangeHandler}
              onBlur={imagenBlurHandler}
            />
            {imagenTieneError && (
              <p className={classes.errorText}>
                favor de ingresar link de imagen
              </p>
            )}
          </div>

          <div className={alturaClasses}>
            <label htmlFor="alturamin">Altura Min</label>
            <input
              id="alturamin"
              type="number"
              min="1"
              max="100"
              value={valorAltura}
              onChange={alturaChangeHandler}
              onBlur={alturaBlurHandler}
            />

            {alturaTieneError && (
              <p className={classes.errorText}>
                Ingrese altura minima (mayor a cero)
              </p>
            )}
          </div>

          <div className={alturaMaxClasses}>
            <label htmlFor="alturamax">Altura Max</label>
            <input
              id="alturamax"
              type="number"
              min="1"
              max="100"
              value={valorAlturaMax}
              onChange={alturaMaxChangeHandler}
              onBlur={alturaMaxBlurHandler}
            />
            {alturaMaxTieneError && (
              <p className={classes.errorText}>
                Ingrese altura maxima (menor a cien)
              </p>
            )}
          </div>

          <div className={pesoClasses}>
            <label htmlFor="pesomin">Peso</label>
            <input
              id="pesomin"
              type="number"
              min="1"
              max="100"
              value={valorPeso}
              onChange={pesoChangeHandler}
              onBlur={pesoBlurHandler}
            />
            {pesoTieneError && (
              <p className={classes.errorText}>
                Ingrese peso minimo (mayor a cero)
              </p>
            )}
          </div>

          <div className={pesoMaxClasses}>
            <label htmlFor="pesomax">Peso Max</label>
            <input
              id="pesomax"
              type="number"
              min="1"
              max="100"
              value={valorPesoMax}
              onChange={pesoMaxChangeHandler}
              onBlur={pesoMaxBlurHandler}
            />
            {pesoMaxTieneError && (
              <p className={classes.errorText}>
                Ingrese peso maximo (menor a cien)
              </p>
            )}
          </div>

          <div className={vidaClasses}>
            <label htmlFor="vidamin">Vida</label>
            <input
              id="vidamin"
              type="number"
              min="1"
              max="100"
              value={valorVida}
              onChange={vidaChangeHandler}
              onBlur={vidaBlurHandler}
            />
            {vidaTieneError && (
              <p className={classes.errorText}>
                Ingrese vida minima (mayor a cero)
              </p>
            )}
          </div>

          <div className={vidaMaxClasses}>
            <label htmlFor="vidamax">Vida Max</label>
            <input
              id="vidamax"
              type="number"
              min="1"
              max="100"
              value={valorVidaMax}
              onChange={vidaMaxChangeHandler}
              onBlur={vidaMaxBlurHandler}
            />
            {vidaMaxTieneError && (
              <p className={classes.errorText}>
                Ingrese vida maxima (menor a cien)
              </p>
            )}
          </div>

          <div className={classes.selectContainer}>
            <select id="temps" onChange={handleChange}>
              <option value="">Seleccione temperamentos</option>
              {temperamentos.map((temperamento, index) => (
                <option value={temperamento.id} key={index}>
                  {temperamento.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={classes.temps}>
          <div className={classes.tempsContainer}>
            <div className={classes.temp}>
              {temps.length === 0 ? (
                <ul>
                  <li>Esta raza no tiene temperamentos</li>
                </ul>
              ) : (
                <ul>
                  {temps.map((temp, index) => (
                    <li key={index} onClick={() => removeTemp(temp)}>
                      {temperamentos[temp - 1].nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={classes.formActions}>
          <button type="submit">Registrar</button>
        </div>
      </form>
    </Fragment>
  );
}
