import React, { useState } from "react";
import Razas from "../components/razas/Razas";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
import Paginacion from "../components/paginacion/Paginacion";

export default function Home() {
  const [actualPage, setActualPage] = useState(1);
  const razas = useSelector((state) => state.razas);
  const razasPerPage = 8;
  const numerosDePagina = [];

  for (let i = 1; i <= Math.ceil(razas.length / razasPerPage); i++) {
    numerosDePagina.push(i);
  }

  var ultimoIdx = actualPage * razasPerPage;
  var primerIdx = ultimoIdx - razasPerPage;
  var actualRazas = razas.error ? razas : razas.slice(primerIdx, ultimoIdx);

  const handlePage = (num) => {
    setActualPage(num);
  };

  const setPage = () => {
    setActualPage(1);
  };

  return (
    <div>
      <Navbar setPage={setPage} />
      <Paginacion numerosDePagina={numerosDePagina} handlePage={handlePage} />
      <Razas razas={actualRazas} />
    </div>
  );
}
