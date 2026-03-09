import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
  const { cart, removeItem, clearCart, getTotalItems, getTotalPrice } =
    useContext(CartContext);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <main className="cartView">
      <div className="cartView__inner">
        <h2 className="cartView__title">Carrito</h2>
        <p className="cartView__subtitle">
          Aquí ya estamos consumiendo el estado global con Context API.
        </p>

        {cart.length === 0 ? (
          <section className="cartView__empty">
            <p className="cartView__emptyTitle">Tu carrito está vacío</p>
            <p className="cartView__emptyText">
              Aún no agregaste productos. Explora el catálogo y elige tus
              favoritas.
            </p>

            <Link className="cartView__link" to="/">
              Ir al catálogo
            </Link>
          </section>
        ) : (
          <section className="cartView__content">
            <div className="cartView__list">
              {cart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                  />
                );
              })}
            </div>

            <aside className="cartView__summary">
              <h3 className="cartView__summaryTitle">Resumen</h3>

              <div className="cartView__summaryBox">
                <p className="cartView__summaryRow">
                  <span>Total de productos:</span>
                  <strong>{totalItems}</strong>
                </p>

                <p className="cartView__summaryRow">
                  <span>Total a pagar:</span>
                  <strong>S/ {totalPrice.toFixed(2)}</strong>
                </p>
              </div>

              <div className="cartView__actions">
                <button
                  className="cartView__clearButton"
                  type="button"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>

                <Link className="cartView__checkoutLink" to="/checkout">
                  Continuar compra
                </Link>
              </div>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
};

export default Cart;