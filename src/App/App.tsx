import React, { FC, Fragment, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { AppActionFactory, FetchState } from './app-store/app.action'
import { AppState } from './app-store/app.reducer'
import Navbar from './components/Navbar/Navbar'
import Home from './screens/Home/Home'
import { RequestMethod } from './app.model'
import { FETCH_DATA } from './app-store/app.thunk'
import { store } from '..'
import {AppStateKeys} from "./app.constants";
import {environment} from "../environments/environment";
import Loading from "./components/Loading/Loading";


const App: FC<{}> = (props, context) => {

    const dispatch = useDispatch();

    const handleSetState = () => {
        dispatch(AppActionFactory.setState({ state: 'TEST', stateKeys: ['user', 'abc'] }));
    };

    const removeState = () => {
        dispatch(AppActionFactory.removeState(['user', 'abc']));
    };

    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <Navbar title='Navbar'></Navbar>
            <button onClick={handleSetState}>Test</button>
            <button onClick={removeState}>Test</button>
            <Routes>
                {/* <Route path={'/'} element={<Login />}></Route> */}
                <Route path={'/home'} element={<Home title={'Homepage'} />}></Route>
            </Routes>
            {/*<Loading></Loading>*/}
        </Fragment>

    )
}

const mapStateToProps = (store: AppState) => ({ store })
export default connect(mapStateToProps)(App);
