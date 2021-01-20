import React from 'react';
import 'react-day-picker/lib/style.css';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';
import firebaseConfig from './config/firebaseConfig';
import GlobalStyle from './global-style';
import * as serviceWorker from './serviceWorkerRegistration';

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <React.StrictMode>
            <GlobalStyle />
            <App />
        </React.StrictMode>
    </FirebaseAppProvider>,
    document.getElementById('root'),
);

serviceWorker.register();
