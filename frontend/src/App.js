import './App.css';
import Nav from './components/Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import {Privatecomponent,Signupprivate} from './components/Privatecomponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<Privatecomponent/>}>
        <Route path='/' element={<h1>Product Listing</h1>}></Route>
        <Route path='/add' element={<h1>Add Product</h1>}></Route>
        <Route path='/update' element={<h1>Update Product</h1>}></Route>
        <Route path='/logout' element={<h1>Logout</h1>}></Route>
        <Route path='/profile' element={<h1>Profile</h1>}></Route>
        </Route>
        <Route element={<Signupprivate/>}>
        <Route path='/signup' element={<SignUp/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      <h3>{SignUp.profile}</h3>
    </div>

  );
}

export default App;
