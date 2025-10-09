import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Model_1 from './pages/model_1.jsx';

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='/model_1' element={<Model_1 />}></Route>
      <Route path='/model_3'></Route>
      <Route path='/model_4'></Route>
     </Routes>
    </>
  );
}


export default App;
