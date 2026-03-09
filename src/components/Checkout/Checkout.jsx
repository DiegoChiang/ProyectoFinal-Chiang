import { useContext, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../services/config";
import { CartContext } from "../../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cart, clearCart, getTotalPrice } = useContext(CartContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const manejarFormulario = async (event) => {
    event.preventDefault();
    setError("");

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (email !== emailConfirmacion) {
      setError("Los correos electrónicos no coinciden.");
      return;
    }

    if (cart.length === 0) {
      setError("No puedes generar una orden con el carrito vacío.");
      return;
    }

    const orden = {
      buyer: {
        nombre,
        apellido,
        telefono,
        email,
      },
      items: cart.map((producto) => {
        return {
          id: producto.id,
          title: producto.title,
          price: producto.price,
          quantity: producto.quantity,
        };
      }),
      total: getTotalPrice(),
      fecha: serverTimestamp(),
    };

    setLoading(true);

    try {
      const ordenesRef = collection(db, "ordenes");
      const respuesta = await addDoc(ordenesRef, orden);

      setOrderId(respuesta.id);
      clearCart();

      setNombre("");
      setApellido("");
      setTelefono("");
      setEmail("");
      setEmailConfirmacion("");
    } catch (err) {
      console.log(err);
      setError("Se produjo un error al generar la orden.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <main className="checkoutView">
        <div className="checkoutView__inner">
          <section className="checkoutView__success">
            <p className="checkoutView__eyebrow">Compra generada</p>
            <h2 className="checkoutView__successTitle">¡Gracias por tu compra!</h2>
            <p className="checkoutView__successText">
              Tu orden fue registrada correctamente.
            </p>
            <p className="checkoutView__orderId">
              Número de orden: <strong>{orderId}</strong>
            </p>

            <Link className="checkoutView__backLink" to="/">
              Volver al catálogo
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="checkoutView">
      <div className="checkoutView__inner">
        <h2 className="checkoutView__title">Checkout</h2>
        <p className="checkoutView__subtitle">
          Completa tus datos para generar la orden.
        </p>

        <div className="checkoutView__content">
          <section className="checkoutView__summary">
            <h3 className="checkoutView__summaryTitle">Resumen de compra</h3>

            {cart.length === 0 ? (
              <p className="checkoutView__empty">Tu carrito está vacío.</p>
            ) : (
              <>
                <div className="checkoutView__items">
                  {cart.map((producto) => (
                    <div className="checkoutView__item" key={producto.id}>
                      <div>
                        <p className="checkoutView__itemTitle">{producto.title}</p>
                        <p className="checkoutView__itemMeta">
                          Cantidad: {producto.quantity}
                        </p>
                      </div>

                      <p className="checkoutView__itemPrice">
                        S/ {(producto.price * producto.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="checkoutView__totalBox">
                  <p className="checkoutView__totalText">
                    Total: <strong>S/ {getTotalPrice().toFixed(2)}</strong>
                  </p>
                </div>
              </>
            )}
          </section>

          <section className="checkoutView__formBox">
            <h3 className="checkoutView__formTitle">Datos del comprador</h3>

            <form onSubmit={manejarFormulario} className="checkoutView__form">
              <div className="checkoutView__field">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                />
              </div>

              <div className="checkoutView__field">
                <label htmlFor="apellido">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  value={apellido}
                  onChange={(event) => setApellido(event.target.value)}
                />
              </div>

              <div className="checkoutView__field">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="text"
                  value={telefono}
                  onChange={(event) => setTelefono(event.target.value)}
                />
              </div>

              <div className="checkoutView__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="checkoutView__field">
                <label htmlFor="emailConfirmacion">Email de confirmación</label>
                <input
                  id="emailConfirmacion"
                  type="email"
                  value={emailConfirmacion}
                  onChange={(event) => setEmailConfirmacion(event.target.value)}
                />
              </div>

              {error && <p className="checkoutView__error">{error}</p>}

              <button
                type="submit"
                className="checkoutView__button"
                disabled={loading || cart.length === 0}
              >
                {loading ? "Generando orden..." : "Confirmar compra"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Checkout;