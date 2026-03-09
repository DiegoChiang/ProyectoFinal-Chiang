import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/config";
import Loader from "../Loader/Loader";
import ItemDetail from "../ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError("");
    setProduct(null);

    const productRef = doc(db, "productos", itemId);

    getDoc(productRef)
      .then((response) => {
        if (!response.exists()) {
          throw new Error("Producto no encontrado");
        }

        const newProduct = {
          id: response.id,
          ...response.data(),
        };

        setProduct(newProduct);
      })
      .catch((error) => {
        console.log(error);
        setError("No encontramos el producto solicitado.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  return (
    <main className="detailView">
      <div className="detailView__inner">
        <h2 className="detailView__title">Detalle del producto</h2>
        <p className="detailView__subtitle">
          Aquí ya estamos consumiendo datos desde Firebase.
        </p>

        <section className="detailView__content">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="detailView__messageBox">
              <p className="detailView__messageTitle">Producto no disponible</p>
              <p className="detailView__messageText">{error}</p>

              <Link className="detailView__link" to="/">
                Volver al inicio
              </Link>
            </div>
          ) : (
            <ItemDetail product={product} />
          )}
        </section>
      </div>
    </main>
  );
};

export default ItemDetailContainer;