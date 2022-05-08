import React, { useRef } from "react";
import BarraDeBusqueda from "./BarraDeBusqueda";
import CreateRaza from "./CreateRaza";
import Filtros from "./Filtros";
import "./Navbar.module.css";
import Ordenamientos from "./Ordenamientos";

export default function Navbar({ setPage }) {
  const orderByAzRef = useRef("");
  const orderByPesoRef = useRef("");

  const clearOrders = () => {
    orderByAzRef.current.value = "";
    orderByPesoRef.current.value = "";
  };

  return (
    <nav>
      <ul>
        <BarraDeBusqueda setPage={setPage} />
        <Filtros setPage={setPage} clearOrders={clearOrders} />
        <Ordenamientos
          setPage={setPage}
          orderByAzRef={orderByAzRef}
          orderByPesoRef={orderByPesoRef}
        />
        <CreateRaza />
      </ul>
    </nav>
  );
}
