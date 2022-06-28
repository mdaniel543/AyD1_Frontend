import React,{useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from './modules/DefaultAction';
import ListHotel from './modules/ListeUser';
import AddHotel from './modules/AddUser';
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
            exact path="/admin/hotel/add" 
            component={()=><AddHotel handleMessage={handleMessage} tipo ={2}/>} 
        />
        <Route 
            exact path="/admin/hotel/list" 
            component={()=><ListHotel handleMessage={handleMessage} tipo = {2}/>} 
        />
        <Route 
            render={(props) => <DefaultAction {...props} name={"🏬 Hotel"} />} />
    </Switch>
  </div>
);
}

export default hotels;