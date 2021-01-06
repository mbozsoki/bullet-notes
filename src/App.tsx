import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

function App() {
    const firebase = useFirebaseApp();
    console.log(firebase);
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <PrivateRoute path="/">
                    <Home />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;
