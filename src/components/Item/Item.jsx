import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ product }) => {
  const { id, title, shortDescription, price, category, stock, image } = product;

  return (
    <article className="itemCard">
      <div className="itemCard__media">
        {image ? (
          <img className="itemCard__image" src={image} alt={title} />
        ) : (
          <div className="itemCard__placeholder">
            <span className="itemCard__emoji">🍫</span>
          </div>
        )}
      </div>

      <div className="itemCard__body">
        <p className="itemCard__category">{category}</p>
        <h3 className="itemCard__title">{title}</h3>
        <p className="itemCard__description">{shortDescription}</p>

        <div className="itemCard__meta">
          <span className="itemCard__price">S/ {price.toFixed(2)}</span>
          <span className="itemCard__stock">Stock: {stock}</span>
        </div>

        <Link className="itemCard__link" to={`/item/${id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default Item;