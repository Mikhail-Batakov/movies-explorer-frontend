import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section id={"aboutProject"} className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__items">
        <li className="about-project__item">
          <h3 className="about-project__item-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__item-description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__item">
          <h3 className="about-project__item-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__item-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className="about-project__time-bar">
        <p className="about-project__line-time about-project__line-time_type_backend">
          1 неделя
        </p>
        <p className="about-project__line-time about-project__line-time_type_frontend">
          4 недели
        </p>
        <span className="about-project-caption">Back-end</span>
        <span className="about-project-caption">Front-end</span>
      </div>
    </section>
  );
};

export default AboutProject;
