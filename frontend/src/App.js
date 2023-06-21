import SignIn from './components/Authentication/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Addproject from './components/Addproject';
import clients from './components/clients';
import AuthorizationComponent from './components/Authorization/AuthorizationRoute';
import clientDashboard from './components/clientDashboard';
import './App.css';
import Store from './components/contextApi/store';
import Allprojects from './components/Allprojects';
import AddCategory from './components/AddCategory';


function App() {
  return (
    <Container>
      <Store>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Allprojects />
            </Route>
            <Route path='/sign-in'>
              <SignIn />
            </Route>
            <AuthorizationComponent>
              <Route path='/client-dashboard'>
                <clientDashboard />
              </Route>
              <Route path='/add-project'>
                <Addproject />
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
