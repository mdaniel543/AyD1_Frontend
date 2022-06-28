import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FetchData from "./api/Api";

const AddAero = ({ handleMessage, id }) => {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    precio: "",
    idUsuario: id,
    placa: "", 
    estado: 1
  });

  const EntryRegister = async (e) => {
    console.log(form)
    try {
    const url = "d2/insertAuto";
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
        <h2>Registrar Automovil</h2>
      <div className="containeroption__form">
      <Form className="container-fluid" onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Marca</Label>
            <Input name="marca" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Modelo</Label>
            <Input name="modelo" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Precio</Label>
            <Input name="precio" type="number" onChange={handleChange}></Input>
          </FormGroup>

          <FormGroup>
            <Label>Placa</Label>
            <Input name="placa" onChange={handleChange}></Input>
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
