import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  const { addItem } = useContext(CartContext);
  const [quantityAdded, setQuantityAdded] = useState(0);

  useEffect(() => {
    setQuantityAdded(0);
  }, [product.id]);

  const handleAdd = (quantity) => {
    setQuantityAdded(quantity);
    addItem(product, quantity);
  };

  const { title, description, price, stock, category, image } = product;

  return (
    <article className="itemDetailCard">
      <div className="itemDetailCard__media">
        {image ? (
          <img className="itemDetailCard__image" src={image} alt={title} />
        ) : (
          <div className="itemDetailCard__placeholder">
            <span className="itemDetailCard__emoji">🍫</span>
          </div>
        )}
      </div>

      <div className="itemDetailCard__body">
        <p className="itemDetailCard__category">{category}</p>
        <h3 className="itemDetailCard__title">{title}</h3>
        <p className="itemDetailCard__description">{description}</p>

        <div className="itemDetailCard__info">
          <p className="itemDetailCard__price">S/ {price.toFixed(2)}</p>
          <p className="itemDetailCard__stock">Stock disponible: {stock}</p>
        </div>

        {quantityAdded > 0 ? (
          <div className="itemDetailCard__successBox">
            <p className="itemDetailCard__successText">
              Agregaste {quantityAdded} unidad(es) al carrito.
            </p>

            <div className="itemDetailCard__actions">
              <Link className="itemDetailCard__buttonLink" to="/cart">
                Terminar compra
              </Link>

              <Link className="itemDetailCard__secondaryLink" to="/">
                Seguir comprando
              </Link>
            </div>
          </div>
        ) : (
          <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
        )}
      </div>
    </article>
  );
};

export default ItemDetail;