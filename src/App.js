import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
import About from './components/About';
import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap';
import ShoppingCartProvider from './context/ShoppingCartContext';



function App() {
  return( 
   
   <ShoppingCartProvider>
      <Navbar />
      <div className='app'>
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/store' element={<Store />}/>
            <Route path='/about' element={<About />}/>

          </Routes>
        </Container>
      
      </div>
    </ShoppingCartProvider>
     
    
  
  );

}

export default App;
