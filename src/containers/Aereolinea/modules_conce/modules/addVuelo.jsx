import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FetchData from "./api/Api";

const AddAero = ({ handleMessage, id }) => {
  const [form, setForm] = useState({
    fecha: "",
    destino: "",
    cantAsientos: "",
    precio: "",
    estado: 1,
    id_usu: id,
  });
  //const {fechas_, destinos_, cantAsiento_, precios_, estados_, id_usu} = req.body;
  
  const EntryRegister = async (e) => {
    console.log(form);
    try {
      const url = "d3/registrarVuelos";
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
      <h2>Registrar Vuelo</h2>
      <div className="containeroption__form">
        <Form className="container-fluid" onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Fecha vuelo</Label>
            <Input name="fecha" type="date" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Destino</Label>
            <Input name="destino" type="text" onChange={handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Cantidad de asientos disponibles</Label>
            <Input
              name="cantAsientos"
              type="number"
              onChange={handleChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Precio</Label>
            <Input name="precio" type="number" onChange={handleChange}></Input>
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
