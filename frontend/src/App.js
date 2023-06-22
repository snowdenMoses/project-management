import SignIn from './components/Authentication/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Addproject from './components/AddProject';
import clients from './components/Clients';
import AuthorizationComponent from './components/Authorization/AuthorizationRoute';
import ClientDashboard from './components/ClientDashboard';
import './App.css';
import Store from './components/contextApi/store';
import AddCategory from './components/AddCategory';
import HomePage from './components/HomePage';


function App() {
  return (
    <Container>
      <Store>
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/sign-in'>
              <SignIn />
            </Route>
            <Route path='/client-dashboard'>
              <ClientDashboard />
            </Route>
            <AuthorizationComponent>
              
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
