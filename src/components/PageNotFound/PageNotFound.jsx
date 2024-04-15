import { useNavigate } from 'react-router-dom';
import "./PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="pagenotfound">
      <div className="pagenotfound-container">
        <h1 className="pagenotfound__title">404</h1>
        <p className="pagenotfound__subtitle">Страница не найдена</p>
        <button className="pagenotfound__back-btn" onClick={() => navigate(-1)}>Назад</button>
      </div>
      
    </section>
  );
};
  
  export default PageNotFound;