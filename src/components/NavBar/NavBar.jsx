import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import { CartContext } from "../../context/CartContext";
import logoPrincipal from "../../assets/brand/logo-principal.png";
import "./NavBar.css";

const NavBar = () => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <header className="navBar">
      <div className="navBar__inner">
        <Link className="navBar__brand" to="/">
          <img
            className="navBar__logo"
            src={logoPrincipal}
            alt="Logo principal"
          />
          <span className="navBar__title">Las Trufas de Andrea</span>
        </Link>

        <nav className="navBar__nav" aria-label="Navegación principal">
          <ul className="navBar__list">
            <li className="navBar__item">
              <NavLink
                to="/category/clasicas"
                className={({ isActive }) =>
                  isActive
                    ? "navBar__link navBar__link--active"
                    : "navBar__link"
                }
              >
                Clásicas
              </NavLink>
            </li>

            <li className="navBar__item">
              <NavLink
                to="/category/especiales"
                className={({ isActive }) =>
                  isActive
                    ? "navBar__link navBar__link--active"
                    : "navBar__link"
                }
              >
                Especiales
              </NavLink>
            </li>

            <li className="navBar__item">
              <NavLink
                to="/category/promociones"
                className={({ isActive }) =>
                  isActive
                    ? "navBar__link navBar__link--active"
                    : "navBar__link"
                }
              >
                Promociones
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="navBar__actions">
          <CartWidget count={totalItems} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;