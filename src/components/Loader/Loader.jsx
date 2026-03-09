import "./Loader.css";

const Loader = () => {
  return (
    <div className="loaderBox" role="status" aria-label="Cargando contenido">
      <div className="loaderBox__spinner"></div>
      <p className="loaderBox__text">Cargando productos...</p>
    </div>
  );
};

export default Loader;