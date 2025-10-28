import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Model_1 from './pages/model_1.jsx';
import Model_2 from './pages/model_2.jsx';

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='/model_1' element={<Model_1 />}></Route>
      <Route path='/model_2' element={<Model_2 />}></Route>
     </Routes>
    </>
  );
}


export default App;
