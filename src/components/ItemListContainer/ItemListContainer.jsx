import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/config";
import Loader from "../Loader/Loader";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";

const categoryNames = {
  clasicas: "Clásicas",
  especiales: "Especiales",
  promociones: "Promociones",
};

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError("");

    const productsRef = categoryId
      ? query(collection(db, "productos"), where("category", "==", categoryId))
      : collection(db, "productos");

    getDocs(productsRef)
      .then((response) => {
        const newProducts = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setProducts(newProducts);
      })
      .catch((error) => {
        console.log(error);
        setError("No se pudieron cargar los productos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  const categoryName = categoryNames[categoryId] || categoryId;
  const title = categoryId ? `Categoría: ${categoryName}` : greeting;

  const subtitle = categoryId
    ? `Explora nuestra selección de ${categoryName}.`
    : "Descubre nuestras trufas y cajas más especiales.";

  return (
    <main className="itemList">
      <div className="itemList__inner">
        <h2 className="itemList__title">{title}</h2>
        <p className="itemList__subtitle">{subtitle}</p>

        <section className="itemList__grid" aria-label="Listado de productos">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="itemList__messageBox">
              <p className="itemList__messageTitle">Ocurrió un problema</p>
              <p className="itemList__messageText">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="itemList__messageBox">
              <p className="itemList__messageTitle">Sin resultados</p>
              <p className="itemList__messageText">
                No encontramos productos para esta categoría.
              </p>
            </div>
          ) : (
            <ItemList products={products} />
          )}
        </section>
      </div>
    </main>
  );
};

export default ItemListContainer;