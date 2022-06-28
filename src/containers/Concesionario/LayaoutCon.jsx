// React
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auto from './modules_conce/auto';



// Modulo de error
import InvalidOperation from '../Administrador/modulesadmin/InvalidOperation';

// Estilos
import "../../assets/styles/components/GlobalAction.scss"

const LayoutAdmin = () => (
  <div className="LayoutAdmin">
    <Switch>
        <Route path="/concesionario/auto" component={Auto} />
        <Route component={InvalidOperation} />
    </Switch>
  </div>
);

export default LayoutAdmin;