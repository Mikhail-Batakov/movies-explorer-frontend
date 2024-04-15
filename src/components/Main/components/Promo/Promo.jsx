import { HashLink } from "react-router-hash-link";
import "./Promo.css";
import promoImage from "../../../../images/promo-image.svg";

const Promo = () => {
  return (
    <section className="promo">
      <img src={promoImage} alt="планета веб" className="promo-image" />
      <div className="promo-container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <HashLink smooth to="#aboutProject" className="promo__link">
          Узнать больше
        </HashLink>
      </div>
    </section>
  );
};

export default Promo;
