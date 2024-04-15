import "./AboutMe.css";
import fotoStudent from "../../../../images/foto-student.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <img src={fotoStudent} alt="фото студента" className="about-me__foto" />
        <div className="about-me__info">
          <h3 className="about-me__name">Михаил</h3>
          <p className="about-me__job">Фронтенд-разработчик, 32 года</p>
          <p className="about-me__descraption">
            Я родился и живу в Перми, закончил механико-технологический
            факультет ПГТУ. У меня есть жена, дочь и сын. Я люблю слушать
            музыку, а ещё увлекаюсь фитнесом. Недавно начал кодить. С 2015 года
            работал в компании «СКБ Контур». После того, как прошёл курс по
            веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/Mikhail-Batakov"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
