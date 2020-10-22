import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './store/base';
import './App.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
// import ProductsContextProvider from './contexts/ProductsContext';
// import CartContextProvider from './contexts/CartContext';
// import LanguageContextProvider from './contexts/LanguageContext';
import LoadingOverlay from './components/LoadingOverlay';

// import { Provider } from 'react-redux';
// import store from './store';


// const store = createStore(rootReducer);

ReactDOM.render(
  <HelmetProvider>
    <Suspense fallback={ <LoadingOverlay /> }>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} name="naturalkey">
        <App />
      </FirebaseAppProvider>
    </Suspense>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
