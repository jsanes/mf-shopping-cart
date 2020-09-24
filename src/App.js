import React, { useEffect, useState } from 'react';
import './App.css';

function App(props) {
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const currentItems = [...cart];
    if (props.newItem.name) {
      currentItems.push(props.newItem);
      setCart(currentItems);
    }
  }, [props.newItem, cart]);

  function handleCartVisibility() {
    setShow(!show);
  }

  function renderCartItems() {
    return cart.map((item, index) => (
      <div className="cart-item" key={`cart-item-${index}`}>
        <img src={item.img} alt="" />
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <strong>
            {item.price ? '$' : ''}
            {item.price}
          </strong>
        </div>
      </div>
    ));
  }

  function getTotalAmount() {
    return cart.reduce(
      (a, b) => ({
        price: a.price + b.price,
      }),
      { price: 0 }
    ).price;
  }

  return (
    <div className="shopping-cart">
      <button onClick={handleCartVisibility}>{`Show cart ${
        cart.length > 0 ? `(${cart.length})` : ''
      }`}</button>
      <div className={`cart-box ${show ? 'show' : ''}`}>
        {cart.length === 0 ? (
          <h2>The cart is empty. Click on Add to Cart to start buying!</h2>
        ) : null}
        {renderCartItems()}
        <strong>Total: ${getTotalAmount()}</strong>
      </div>
    </div>
  );
}

export default App;
