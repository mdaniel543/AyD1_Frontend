// React
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Hotel from './modules_conce/hotel';



// Modulo de error
import InvalidOperation from '../Administrador/modulesadmin/InvalidOperation';

// Estilos
import "../../assets/styles/components/GlobalAction.scss"

const LayoutAdmin = () => (
  <div className="LayoutAdmin">
    <Switch>
        <Route path="/hotel/habitacion" component={Hotel} />
        <Route component={InvalidOperation} />
    </Switch>
  </div>
);

export default LayoutAdmin;