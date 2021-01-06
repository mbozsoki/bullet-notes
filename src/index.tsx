import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import 'react-day-picker/lib/style.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';
import firebaseConfig from './config/firebaseConfig';
import GlobalStyle from './global-style';
import rootReducer from './store/reducers';
import * as serviceWorker from './serviceWorkerRegistration';

const store = configureStore({
    reducer: rootReducer,
});

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <React.StrictMode>
            <Provider store={store}>
                <GlobalStyle />
                <App />
            </Provider>
        </React.StrictMode>
    </FirebaseAppProvider>,
    document.getElementById('root'),
);

serviceWorker.register();
