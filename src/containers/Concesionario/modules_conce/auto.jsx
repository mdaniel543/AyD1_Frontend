// Reacr
import React ,{useState}from 'react';
import { Switch, Route } from 'react-router-dom';

import DefaultAction from '../../Administrador/modulesadmin/modules/DefaultAction';
import ListVehiculo from './modules/listVehiculo';
import AddVehiculo from './modules/addVehiculo';
import Message from '../../Administrador/modulesadmin/Message';

const Vehiculo = () => {
  const session_active = JSON.parse(localStorage['session']);

  const [statemessage ,setStatatemessage] = useState({
    header:'',
    message:'',
    state:false
  })
  
  const handleMessage = (obj) => {
    setStatatemessage(obj)
  }

  return(
  <div className='containeroption'>
    <Message statemessage={statemessage} handleMessage={handleMessage}/>
    <Switch>
        <Route 
            exact path="/concesionario/auto/add" 
            component={()=><AddVehiculo handleMessage={handleMessage} id = {session_active.id_Usuario}/>} 
             />
        <Route 
            exact path="/concesionario/auto/list" 
            component={()=><ListVehiculo handleMessage={handleMessage} id = {session_active.id_Usuario}/>}/>
        <Route 
            render={(props) => <DefaultAction {...props} name={"🚗 Vehiculos de " + session_active.nombre} />} />
    </Switch>
  </div>
);
}

export default Vehiculo;