import { Link } from "react-router-dom";
import cartIcon from "../../assets/icons/cart.svg";
import "./CartWidget.css";

const CartWidget = ({ count = 0 }) => {
  return (
    <Link className="cartWidget" to="/cart" aria-label="Abrir carrito">
      <img className="cartWidget__icon" src={cartIcon} alt="Carrito" />

      {count > 0 && <span className="cartWidget__count">{count}</span>}
    </Link>
  );
};

export default CartWidget;