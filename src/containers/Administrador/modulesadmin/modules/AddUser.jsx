import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FetchData from "./api/Api";

const AddAero = ({ handleMessage, tipo }) => {
  const [form, setForm] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    correo: "",
    tipoUsuario: `${tipo}`,
    contrasena: "",
    checkContrasena: "",
  });

  const EntryRegister = async (e) => {
    try {
    const url = "d2/registro";
    const data = new FetchData();
    const res = await data.request(url, "POST", form);
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
      {tipo == 3 && <h2>Agregar Aereolinea</h2>}
      {tipo == 2 && <h2>Agregar Hotel</h2>}
      {tipo == 4 && <h2>Agregar Concesionaria</h2>}
      <div className="containeroption__form">
      <Form className="container-fluid" onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Nombre</Label>
            <Input name="nombre" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Correo</Label>
            <Input name="correo" type="email" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              name="contrasena"
              type="password"
              onChange={handleChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Confirmar Contraseña</Label>
            <Input
              name="checkContrasena"
              type="password"
              onChange={handleChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Pais</Label>
            <Input name="pais" onChange={handleChange}></Input>
          </FormGroup>

          <FormGroup>
            <Label>Ciudad</Label>
            <Input name="ciudad" onChange={handleChange}></Input>
          </FormGroup>

          <Button className="btn-lg" onClick={EntryRegister}>
            Registrar
          </Button>
        </Form>
      </div>
    </>
  );
};
export default AddAero;
