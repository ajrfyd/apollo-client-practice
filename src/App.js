import React from "react";
import { Routes, Route } from 'react-router-dom';
import Movies from "./routes/Movies";
import Movie from "./routes/Movie";



const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Movies />}/>
      <Route path='/movie/:id' element={<Movie />}/>
    </Routes>
  )
}

export default App;