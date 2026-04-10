// Estilos
import "../styles/App.scss";

// Hooks de React
import { useState, useEffect } from "react";

// Componentes
import { Route, Routes } from "react-router";
import Header from "./layaut/header";
import CharacterList from "./listing/CharacterList";
import PlaceholderImage from "../images/placeholder.png";
import CharacterDetails from "./pages/DetailsPage";
import FilterName from "./filters/FilterName";
import FilterHouse from "./filters/FilterHouse";
import TopImg from "../images/image.png";
import ImgFooter from "../images/gorro.png";

function App() {
  // Lista personajes.
  const [allCharacters, setAllCharacters] = useState([]);

  // Filtros.
  const [filterName, setfilterName] = useState("");
  const handleFilterName = (ev) => {
    setfilterName(ev.target.value);
  };
  const [filterHouse, setFilterHouse] = useState("Gryffindor");
  const handleFilterHouse = (ev) => {
    setFilterHouse(ev.target.value);
  };

  //Código que se lanza al cargar.
  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters/")
      .then((res) => res.json())
      .then((responseData) => {
        const allCleanCharacter = responseData.map((eachCharacter) => ({
          id: eachCharacter.id,
          image: eachCharacter.image || PlaceholderImage,
          name: eachCharacter.name,
          species: eachCharacter.species,
          gender: eachCharacter.gender,
          house: eachCharacter.house,
          actor: eachCharacter.actor,
        }));

        setAllCharacters(allCleanCharacter);
      })
      .catch((err) => console.error(err));
  }, []);

  //Variables para pintar la página.

  const filteredCharacters = allCharacters
    .filter((eachCharacter) =>
      (eachCharacter.name || "")
        .toLocaleLowerCase()
        .includes(filterName.toLocaleLowerCase()),
    )
    .filter((eachCharacter) =>
      (eachCharacter.house || "")
        .toLocaleLowerCase()
        .includes(filterHouse.toLocaleLowerCase()),
    );
  const findCharacter = (idToFind) => {
    return allCharacters.find((char) => char.id === idToFind);
  };
  //Boton top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header />

      {/* -----------------------------main --------------------------------------*/}
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                {/* --------------------------- Filtro personaje  ---------------------------*/}
                <FilterName
                  handleFilterName={handleFilterName} //función para el filtro
                  filterName={filterName} //valor del filtro
                />
                {/* --------------------------- filtro casa ---------------------------*/}
                <FilterHouse
                  handleFilterHouse={handleFilterHouse} //función para el filtro
                  filterHouse={filterHouse} //valor del filtro
                />
                {/* --------------------------- lista ---------------------------*/}
                <h2 className="list-title"> Comunidad de Brujas y Magos </h2>
                <CharacterList characters={filteredCharacters} />
                {/* ---------------------------  ---------------------------*/}
                <button className="top" onClick={scrollToTop}>
                  <img src={TopImg} alt="Volver arriba" className="top-img" />
                </button>
              </div>
            }
          />
          <Route
            path="/details/:id"
            element={<CharacterDetails findCharacter={findCharacter} />}
          />
        </Routes>
      </main>
      <footer className="footer">
        <img src={ImgFooter} alt="Gorro de bruja" className="footer-img" />
        <div className="footer-content">
          <p className="footer-text">"Draco Dormiens Nunquam Titillandus"</p>
          <p className="footer-copy">&copy; C.Colet. Hecho con 💜 y mucho ☕</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
