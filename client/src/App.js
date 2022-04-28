import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Details from "./views/Details";
import Create from "./views/Create";

function App() {
  return (
    <div className="App">
      <div className="pititle">
        <h2>Henry Dogs</h2>
      </div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/dogs" element={<Home />} />
        <Route path="/dogs/:id" element={<Details />} />
        <Route path="/dogs/create" element={<Create />} />
        <Route path="/*" element={<h1>No existe esta pagina</h1>} />
      </Routes>
    </div>
  );
}

export default App;
