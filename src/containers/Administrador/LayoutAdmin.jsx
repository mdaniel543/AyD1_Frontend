// React
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Hotel from './modulesadmin/hotel';
import Vuelo from './modulesadmin/aereo';
import Vehiculo from './modulesadmin/concesionaria';


// Modulo de error
import InvalidOperation from './modulesadmin/InvalidOperation';

// Estilos
import "../../assets/styles/components/GlobalAction.scss"

const LayoutAdmin = () => (
  <div className="LayoutAdmin">
    <Switch>
        <Route path="/admin/vuelo" component={Vuelo} />
        <Route path="/admin/hotel" component={Hotel} />
        <Route path="/admin/vehiculos" component={Vehiculo} />
        <Route component={InvalidOperation} />
    </Switch>
  </div>
);

export default LayoutAdmin;