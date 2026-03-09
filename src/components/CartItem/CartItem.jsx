import "./CartItem.css";

const CartItem = ({ item, onRemove }) => {
  const { id, title, category, price, quantity, image } = item;

  return (
    <article className="cartItem">
      <div className="cartItem__media">
        {image ? (
          <img className="cartItem__image" src={image} alt={title} />
        ) : (
          <div className="cartItem__placeholder">
            <span className="cartItem__emoji">🍫</span>
          </div>
        )}
      </div>

      <div className="cartItem__body">
        <p className="cartItem__category">{category}</p>
        <h3 className="cartItem__title">{title}</h3>

        <div className="cartItem__meta">
          <p className="cartItem__text">Precio unitario: S/ {price.toFixed(2)}</p>
          <p className="cartItem__text">Cantidad: {quantity}</p>
          <p className="cartItem__subtotal">
            Subtotal: S/ {(price * quantity).toFixed(2)}
          </p>
        </div>

        <button
          className="cartItem__remove"
          type="button"
          onClick={() => onRemove(id)}
        >
          Eliminar producto
        </button>
      </div>
    </article>
  );
};

export default CartItem;