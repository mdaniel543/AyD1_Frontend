// Reacr
import React ,{useState}from 'react';
import { Switch, Route } from 'react-router-dom';

import DefaultAction from './modules/DefaultAction';
import ListVehiculo from './modules/ListeUser';
import AddVehiculo from './modules/AddUser';
import Message from './Message';

const Vehiculo = () => {
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
            exact path="/admin/vehiculos/add" 
            component={()=><AddVehiculo handleMessage={handleMessage} tipo={4}/>} 
             />
        <Route 
            exact path="/admin/vehiculos/list" 
            component={()=><ListVehiculo handleMessage={handleMessage} tipo={4}/>}/>
        <Route 
            render={(props) => <DefaultAction {...props} name={"🚗 Concesionarias"} />} />
    </Switch>
  </div>
);
}

export default Vehiculo;