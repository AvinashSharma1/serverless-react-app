import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import './App.css';
import HeaderComponent from './Components/HeaderComponent';
import AddInventory from './Components/Inventory/AddInventory';
import ShowInventory from './Components/Inventory/ShowInventory';

function App() {
  return (
    <React.Fragment>
    
      
        <div className="container">
          <header>
            <HeaderComponent/>
          </header>
          <main>
            <Routes>             
                          
            <Route path='/' element={<ShowInventory/>} />
            <Route path='/add' element={<AddInventory/>} />             
               
            </Routes>
          </main>
      </div>
      </React.Fragment>
       
  );
}

export default App;
