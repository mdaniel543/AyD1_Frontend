import React, { useState } from "react";
import { 
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Input, Label } from "reactstrap";

import FetchData from "../containers/Administrador/modulesadmin/modules/api/Api"
import { Link } from "react-router-dom";
const Register = ({ registro, handleRegister,logo, handleMessage }) => {


  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    fechaNac: "",
    correo: "",
    contrasena: "" ,
    checkContrasena: "",
    tipoUsuario: 1,

  });

  const EntryRegister = async (e) => {
    try {
    const url = "d2/registro";
    const data = new FetchData();
    const res = await data.request(url, "POST", form);
      handleRegister()
      handleMessage({
        header: "Estado del registro",
        message: res.msg,
        state: true,
      });
    } catch (e) {
      handleMessage({
        header: "🔴 Estado del registro",
        message: "Verifica los campos del registro",
        state: true,
      });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };



  return (
    <>
    <Modal isOpen={registro}   >
      <ModalHeader>
       Registrar Turista
      </ModalHeader> 
      <Form style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"1rem"}} onSubmit={EntryRegister}>
          <Link to="/">
              <div style={{width:"50px",height:"50px",borderRadius:"30px", backgroundColor:"black",display:"flex",flexDirection:"column",padding:"1rem",alignItems:"center", justifyContent:"center"}}>
                <img src={logo} alt="ParkLot" />
              </div> 
          </Link>
          <FormGroup>
            <Label>Nombre</Label>
            <Input className="form-control" name="nombre" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Usuario</Label>
            <Input className="form-control" name="usuario" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Fecha Nacimiento</Label>
            <Input className="form-control" type="date" name="fechaNac" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Correo</Label>
            <Input className="form-control" name="correo" type="email" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Contraseña</Label>
            <Input
            className="form-control"
              name="contrasena"
              type="password"
              onChange={handleChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Confirmar Contraseña</Label>
            <Input
            className="form-control"
              name="checkContrasena"
              type="password"
              onChange={handleChange}
            ></Input>
          </FormGroup>
          <div style={{alignItems:"center",justifyContent:"center"}}>
            <Button className="btn-lg" onClick={EntryRegister}>
                Registrar
            </Button>
          </div>
        </Form>
        
        <ModalFooter>
        <Button className="btn-lg bg-primary" onClick={()=>handleRegister()}>⬅️</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default Register;
