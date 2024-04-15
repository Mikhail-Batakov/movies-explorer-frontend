import "./Main.css";
import AboutMe from "./components/AboutMe/AboutMe.jsx";
import AboutProject from "./components/AboutProject/AboutProject.jsx";
import Portfolio from "./components/Portfolio/Portfolio.jsx";
import Promo from "./components/Promo/Promo.jsx";
import Techs from "./components/Techs/Techs.jsx";

function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
