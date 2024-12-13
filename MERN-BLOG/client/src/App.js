import './App.css';
import Header from './components/header/index';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/index';
import AddNewBlog from './pages/add-blog/index';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route exact path='/' element={ <Home/> }></Route>
        <Route exact path='/add-blog' element={ <AddNewBlog/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
