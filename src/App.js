import React, { useEffect, useState, useImperativeHandle } from 'react';
import './App.css';
import { ReactComponent as CartIcon } from './cart.svg';
import { ReactComponent as DeleteIcon } from './delete.svg';

const App = React.forwardRef((props, ref) => {
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    addItem,
  }));

  function addItem(newItem) {
    const currentItems = [...cart];

    if (
      newItem.name &&
      !currentItems.find((item) => item.name === newItem.name)
    ) {
      currentItems.push(newItem);
      setCart(currentItems);
    }
  }

  useEffect(() => {
    document.addEventListener('click', hideCart);

    return () => {
      document.removeEventListener('click', hideCart);
    };
  }, []);

  function hideCart(event) {
    if (event.target.className !== 'btn-cart') {
      setShow(false);
    }
  }

  function handleCartVisibility() {
    setShow(!show);
  }

  function removeFromCart(itemName) {
    console.log('props', props);
    props.storeRef.current.onItemRemoved(itemName);
    const currentItems = [...cart];

    const newItems = currentItems.filter((item) => item.name !== itemName);

    setCart(newItems);
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
            {formatNumber(item.price)}
          </strong>
        </div>
        <button
          className="btn-remove"
          onClick={() => removeFromCart(item.name)}
        >
          <DeleteIcon style={{ height: '25px', width: '25px' }} />
        </button>
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

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function preventClickThrough(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  return (
    <div className="shopping-cart">
      <button className="btn-cart" onClick={handleCartVisibility}>
        <CartIcon
          style={{ height: '30px', width: '30px', pointerEvents: 'none' }}
        />
        {cart.length > 0 ? <span>{cart.length}</span> : ''}
      </button>
      <div
        className={`cart-box ${show ? 'show' : ''}`}
        onClick={preventClickThrough}
      >
        {cart.length === 0 ? (
          <h2>The cart is empty. Click on Add to Cart to start buying!</h2>
        ) : null}
        {renderCartItems()}
        <strong>Total: ${formatNumber(getTotalAmount())}</strong>
      </div>
    </div>
  );
});

App.displayName = 'App';

export default App;
