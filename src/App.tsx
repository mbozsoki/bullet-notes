import React, { Suspense, useState } from 'react';
import { AuthCheck, SuspenseWithPerf } from 'reactfire';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

function Authentication() {
    const [newUser, setNewUser] = useState(false);
    return (
        <>{newUser ? <Register setNewUser={setNewUser} /> : <Login setNewUser={setNewUser} />}</>
    );
}

function App() {
    return (
        <Suspense fallback={'Loading...'}>
            <AuthCheck fallback={<Authentication />}>
                <SuspenseWithPerf fallback={'Loading items...'} traceId={'load-items-status'}>
                    <Home />
                </SuspenseWithPerf>
            </AuthCheck>
        </Suspense>
    );
}

export default App;
