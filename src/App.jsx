import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

const App = () => {
  return (
    <div className="appShell">
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<ItemListContainer greeting="Bienvenido/a a la tienda" />}
        />
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Explora nuestras categorías" />}
        />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;