// En tu Header.jsx
import logoHarry from "../../images/harry.png";
import escudoGryffindor from "../../images/houses/gryffindor.png";
import escudoSlytherin from "../../images/houses/slytherin.png";
import escudoRavenclaw from "../../images/houses/ravenclaw.png";
import escudoHufflepuff from "../../images/houses/hufflepuff.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__houses">
        <img src={escudoGryffindor} alt="Gryffindor" className="houses__left" />
        <img src={escudoSlytherin} alt="Slytherin" className="houses__left" />
      </div>

      <div className="header__logo">
        <img
          src={logoHarry}
          alt="Censo Mágico de Hogwarts"
          className="header__img"
        />
      </div>

      <div className="header__houses">
        <img src={escudoRavenclaw} alt="Ravenclaw" className="houses__right" />
        <img
          src={escudoHufflepuff}
          alt="Hufflepuff"
          className="houses__right"
        />
      </div>
    </header>
  );
};
export default Header;
