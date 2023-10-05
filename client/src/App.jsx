import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePirate from "./components/CreatePirate";
import PirateList from "./components/PirateList";
import Details from "./components/Details";
import Register from "./components/Register";




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route element={<CreatePirate/>} path="/" default />
        <Route element={<PirateList/>} path="/pirate" />
        <Route element={<Details/>} path="/pirate/:id" />
        <Route element={<Register/>} path="/register" />
       
    
        
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
