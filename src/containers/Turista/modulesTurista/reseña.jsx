import React,{useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from './modules/DefaultAction';
import ListServicios from './modules/ListeUser';
import Message from './Message';

const hotels = () => {
  const [statemessage ,setStatatemessage] = useState({
    header:'',
    message:'',
    state:false
  });
  
  const handleMessage = (obj) => {
    setStatatemessage(obj)
  }

  return(
  <div className='containeroption'>
    <Message statemessage={statemessage} handleMessage={handleMessage}/>
    <Switch>
        <Route 
            exact path="/turista/reseña/add" 
            component={()=><ListServicios handleMessage={handleMessage} tipo = {6}/>} 
        />
        <Route 
            exact path="/turista/reseña/list" 
            component={()=><ListServicios handleMessage={handleMessage} tipo = {7}/>} 
        />
        <Route 
            render={(props) => <DefaultAction {...props} name={"📨 Reseñas"} />} />
    </Switch>
  </div>
);
}

export default hotels;