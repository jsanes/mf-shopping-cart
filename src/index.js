import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.renderShoppingCart = (containerId, props, ref) => {
  ReactDOM.render(
    <App {...props} ref={ref} />,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

window.unmountShoppingCart = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById('ShoppingCart-container')) {
  ReactDOM.render(<App />, document.getElementById('root'));
  serviceWorker.unregister();
}
