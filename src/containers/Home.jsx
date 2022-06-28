
import React from 'react';

import Header from '../components/Header';
import { Button } from 'reactstrap';

const Home = ({history}) => {
  // Verifica que haya una sesion activa  
  const session_active = JSON.parse(localStorage['session']);
  
  // Redirecciona al dashboard del usuario logueado
  const redirectDashboard = () =>{
      if(session_active.fk_id_tipoUsuario=="5"){
        history.push("/admin")
      }else if(session_active.fk_id_tipoUsuario == "4"){
        history.push("/concesionario")
      }
      else if(session_active.fk_id_tipoUsuario == "2"){
        history.push("/hotel")
      }
      else if(session_active.fk_id_tipoUsuario == "3"){
        history.push("/aereolinea")
      }
      else if(session_active.fk_id_tipoUsuario == "1"){
        history.push("/turista")
      }
  }

  return(
  <>
  <Header></Header>
  <div className='containeroption'>
    <h1>🛃 Bienvenido {session_active.nombre} </h1>
    <Button onClick={redirectDashboard}>Ir al Dashboard</Button>
  </div>
  </>
);
}
export default Home;