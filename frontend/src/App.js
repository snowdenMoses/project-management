import SignIn from './components/Authentication/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import AddProduct from './components/AddProduct';
import Vendors from './components/Vendors';
import AuthorizationComponent from './components/Authorization/AuthorizationRoute';
import VendorDashboard from './components/VendorDashboard';
import './App.css';
import Store from './components/contextApi/store';
import AllProducts from './components/AllProducts';
import AddCategory from './components/AddCategory';


function App() {
  return (
<Container>
    <Store>
      <Router>
        <Switch>
          <Route exact path='/'>
            <AllProducts />
          </Route>
          <Route path='/sign-in'>
            <SignIn />
          </Route>
          <AuthorizationComponent>
            <Route path='/vendor-dashboard'>
              <VendorDashboard />
            </Route>
            <Route path='/add-product'>
              <AddProduct />
            </Route>
            <Route path='/add-category'>
              <AddCategory />
            </Route>
          </AuthorizationComponent>
        </Switch>
      </Router>
    </Store>
  </Container>
  );
}

export default App;
