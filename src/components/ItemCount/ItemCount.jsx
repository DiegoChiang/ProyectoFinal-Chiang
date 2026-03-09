import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const decrement = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1));
  };

  const increment = () => {
    setCount((prevCount) => Math.min(stock, prevCount + 1));
  };

  if (stock === 0) {
    return (
      <div className="itemCount itemCount--disabled">
        <p className="itemCount__stock">Sin stock disponible</p>
      </div>
    );
  }

  return (
    <div className="itemCount">
      <div className="itemCount__controls">
        <button
          className="itemCount__button"
          type="button"
          onClick={decrement}
        >
          -
        </button>

        <span className="itemCount__value">{count}</span>

        <button
          className="itemCount__button"
          type="button"
          onClick={increment}
        >
          +
        </button>
      </div>

      <p className="itemCount__stock">Stock disponible: {stock}</p>

      <button
        className="itemCount__addButton"
        type="button"
        onClick={() => onAdd(count)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;