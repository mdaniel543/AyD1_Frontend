import React,{useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from './modules/DefaultAction';
import ListVuelo from './modules/ListeUser';
import Message from './Message';

const Parqueos = () => {
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
            exact path="/turista/vuelo/list" 
            component={()=><ListVuelo handleMessage={handleMessage} tipo={3} />} 
        />
        <Route 
            render={(props) => <DefaultAction {...props} name={"🛫 Aerolinea"} />} />
    </Switch>
  </div>
);
}

export default Parqueos;