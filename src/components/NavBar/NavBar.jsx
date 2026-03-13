import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import { CartContext } from "../../context/CartContext";
import logoPrincipal from "../../assets/brand/logo-principal.png";
import "./NavBar.css";

const NavBar = () => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navBar">
      <div className="navBar__inner">
        <Link className="navBar__brand" to="/" onClick={closeMenu}>
          <img
            className="navBar__logo"
            src={logoPrincipal}
            alt="Logo principal"
          />
          <span className="navBar__title">Las Trufas de Andrea</span>
        </Link>

        <div className="navBar__actions">
          <button
            className={`navBar__toggle ${menuOpen ? "navBar__toggle--open" : ""}`}
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="navBar__bar"></span>
            <span className="navBar__bar"></span>
            <span className="navBar__bar"></span>
          </button>

          <CartWidget count={totalItems} />
        </div>

        <nav
          className={`navBar__nav ${menuOpen ? "navBar__nav--open" : ""}`}
          aria-label="Navegación principal"
        >
          <ul className="navBar__list">
            <li className="navBar__item">
              <NavLink
                to="/category/clasicas"
                className={({ isActive }) =>
                  isActive
                    ? "navBar__link navBar__link--active"
                    : "navBar__link"
                }
                onClick={closeMenu}
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
                onClick={closeMenu}
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
                onClick={closeMenu}
              >
                Promociones
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;