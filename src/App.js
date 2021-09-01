import React from 'react';

const App = () => {
    return (
        <>
            <h1>Hello World</h1>
            <p>lorem ipsum dot color</p>

            <button onClick={() => {
                electron.notificationApi.sendNotification('Hello')
            }}>
                Notify
            </button>
        </>
    )
}

export default App