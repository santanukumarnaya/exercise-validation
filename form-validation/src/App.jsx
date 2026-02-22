import Validation from "./pages/Validation";
import HomePage from "./pages/HomePage";
import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
function App(){
   return ( 
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/validation" element={<Validation/>}/>
        </Routes>
    </BrowserRouter>
    )
}
export default App;