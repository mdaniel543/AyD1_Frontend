// React
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Aereo from './modules_conce/aereo';



// Modulo de error
import InvalidOperation from '../Administrador/modulesadmin/InvalidOperation';

// Estilos
import "../../assets/styles/components/GlobalAction.scss"

const LayoutAdmin = () => (
  <div className="LayoutAdmin">
    <Switch>
        <Route path="/aereolinea/vuelo" component={Aereo} />
        <Route component={InvalidOperation} />
    </Switch>
  </div>
);

export default LayoutAdmin;