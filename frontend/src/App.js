import './App.css';
import Nav from './components/Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/login';
import Otp from './components/otp';
import Product from './components/addproduct';
import Showproducts from './components/showproducts';
import {Privatecomponent,Signupprivate,Loginprivate} from './components/Privatecomponent';
import { Provider } from 'react-redux';
import {store} from './store';
function App() {

  
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/otp' element={<Otp/>}></Route>

        <Route element={<Privatecomponent/>}>
        <Route path='/' element={<Showproducts/>}></Route>

        <Route path='/addproduct' element={<Product/>}></Route>
        <Route path='/update' element={<h1>Update Product</h1>}></Route>
        <Route path='/logout' element={<h1>Logout</h1>}></Route>
        <Route path='/profile' element={<h1>Profile</h1>}></Route>

        </Route>
        <Route element={<Signupprivate/>}>
        <Route path='/signup' element={<SignUp/>}></Route>
        </Route>
        <Route element={<Loginprivate/>}>
        <Route path='/login' element={<Login/>}></Route>
        </Route>

        
      </Routes>
      </BrowserRouter>
      <h3>{SignUp.profile}</h3>
    </div>
    </Provider>
  );
}

export default App;
