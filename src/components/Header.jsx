// React
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Utils
import classNames from "classnames";
import gravatar from "../utils/gravatar";
// Actions
import { logoutRequest } from "../actions";
// Images
import logo from "../assets/static/logo-navbar.png";
import userIcon from "../assets/static/user-icon.png";
// Styles
import "../assets/styles/components/Header.scss";
import Register from "./Register";
import Message from '../containers/Administrador/modulesadmin/Message';

const Header = (props) => {
  // Clases para poder alterar el estilo del header
  const { user, isLogin, isRegister } = props;

  // Verifica que haya una session iniciada
  const hasUser = localStorage["session"];

  // Realiza los cambios en el cierre de la sesion
  const handleLogout = () => {
    props.logoutRequest({});
    localStorage.clear();
    props.history.push("/");
  };

  const [registro, setRegistro] =useState(false)
  
  const handleRegister = () => {
    setRegistro(!registro)
  }

  // Definimos las clases para definir los estados en los que estara la aplicacion
  const headerClass = classNames("header", {
    isLogin,
    isRegister,
  });

  const [statemessage ,setStatatemessage] = useState({
    header:'',
    message:'',
    state:false
  });

  const handleMessage = (obj) => {
    setStatatemessage(obj)
  }

  return (
    <>
    <Message statemessage={statemessage} handleMessage={handleMessage}/>
    <header className={headerClass}>
      <Link to="/">
        <img className="header__img" src={logo} alt="ParkLot" />
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
          {<img src={userIcon} alt="" />}
          {hasUser ? (
            <p>{JSON.parse(localStorage["session"]).nombre}</p>
          ) : (
            <p>Perfil</p>
          )}
        </div>
        <ul className="nav-conf">
          {hasUser ? (
            <li>
              <a href="/" onClick={handleLogout}>
                Cerrar Sesión
              </a>
            </li>
          ) : (
            <>
              <li>
                <Link to="/">Iniciar Sesion</Link>
              </li>
              <li>
                <a onClick={handleRegister}>Registrarse</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>

    <Register logo={userIcon} registro={registro} handleRegister={handleRegister} handleMessage={handleMessage}></Register>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
