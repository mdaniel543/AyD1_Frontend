// React
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Hotel from './modulesTurista/hotel';
import Vuelo from './modulesTurista/aereo';
import Vehiculo from './modulesTurista/concesionaria';
import Reseña from './modulesTurista/reseña'

// Modulo de error
import InvalidOperation from './modulesTurista/InvalidOperation';

// Estilos
import "../../assets/styles/components/GlobalAction.scss"

const LayoutAdmin = () => (
  <div className="LayoutAdmin">
    <Switch>
        <Route path="/turista/vuelo" component={Vuelo} />
        <Route path="/turista/hotel" component={Hotel} />
        <Route path="/turista/vehiculos" component={Vehiculo} />
        <Route path="/turista/reseña" component={Reseña} />
        <Route component={InvalidOperation} />
    </Switch>
  </div>
);

export default LayoutAdmin;