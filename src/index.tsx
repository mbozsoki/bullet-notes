import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';
import firebaseConfig from './firebaseConfig';
import GlobalStyle from './globalStyle';
import rootReducer from './reducers';
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
