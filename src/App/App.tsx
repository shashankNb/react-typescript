import React, { Component } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Auth/Login/Login'
import Home from './Screens/Home/Home'

class App extends Component {

   constructor(props: { [key: string]: any }) {
      super(props)
   }

   render() {
      return (
         <Routes>
            <Route path={'/'} element={<Login />}></Route>
            <Route path={'/home'} element={<Home />}></Route>
         </Routes>
      )
   }
}

export default App
