import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="notFoundView">
      <div className="notFoundView__inner">
        <section className="notFoundView__card">
          <p className="notFoundView__code">404</p>
          <h2 className="notFoundView__title">Página no encontrada</h2>
          <p className="notFoundView__text">
            La ruta que intentaste abrir no existe o todavía no fue creada.
          </p>

          <Link className="notFoundView__link" to="/">
            Volver al inicio
          </Link>
        </section>
      </div>
    </main>
  );
};

export default NotFound;