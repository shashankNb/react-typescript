import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App/App'
import { rootReducers } from './App/app-store/app.reducer'
import './App/interceptors/request.interceptor'
import './styles.scss'
import { thunk } from 'redux-thunk'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                <HashRouter>
                    <App />
                </HashRouter>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
)
