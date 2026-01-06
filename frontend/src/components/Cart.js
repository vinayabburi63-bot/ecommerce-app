import React from "react";
import "./Cart.css";

function Cart({ cartItems, setCartItems, setPage }) {
  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(prev =>
      prev.filter(item => item._id !== id)
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <button
        className="back-btn"
        onClick={() => setPage("products")}
      >
        ← Back to Products
      </button>

      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p className="price">₹{item.price}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Subtotal ({cartItems.length} items): ₹{subtotal}</h3>
            <button
              className="checkout-btn"
              onClick={() => setPage("checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;



