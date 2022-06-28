// Reacr
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Paginas y modulos 
import Layout from '../components/Layout';
import Login from '../containers/Login';
import ManageDashBoard from '../containers/Administrador/ManageDashBoard';
import DashboardConce from '../containers/Concesionario/ManageDash_Con';
import DashboardAereo from '../containers/Aereolinea/ManageDash_Aereo';
import DashboardHotel from '../containers/Hotel/ManageDash_Hotel';
import DashboardTurista from '../containers/Turista/ManageDashBoardTuris';
import NotFound from '../containers/NotFound';

// Middlewares para verificar los login
import { verifyRol,isLogged } from '../utils/auth.js';

const App = () => {
  return(
  <BrowserRouter>
    <Layout>
      <Switch>
        {/** Login, en caso de estar logueado renderiza el home */}
        <Route exact path="/" component={isLogged(Login)} />
        {/** Modulo del administrador */}
        <Route path="/admin" component={verifyRol(["5"],ManageDashBoard)} />
        <Route path="/concesionario" component={verifyRol(["4"], DashboardConce)} />
        <Route path="/aereolinea" component={verifyRol(["3"], DashboardAereo)} />
        <Route path="/hotel" component={verifyRol(["2"], DashboardHotel)} />
        <Route path="/turista" component={verifyRol(["1"], DashboardTurista)} />
        {/** Ruta inexistente */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
}
export default App;