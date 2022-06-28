import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
  Collapse,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Card,
  Row,
  Col,
} from "reactstrap";
import * as moment from "moment";
import RangeSlider from "react-bootstrap-range-slider";
import Date from "../../../../../utils/date";

import FetchData from "../api/Api";
const AddReseña = ({ resena, handleRegister, res, handleMessage, nombre }) => {
  const session_active = JSON.parse(localStorage["session"]);

  const [form, setForm] = useState({
    nombre: nombre,
    tipoServicio: res,
    descripcion: "",
    fk_id: session_active.id_Usuario,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const handleChange = (res, nombre) => {
        setForm({
            ...form,
            tipoServicio: res,
            nombre: nombre
        })
    }
    handleChange(res, nombre)
  }, res, nombre);


  const realizar = async () => {
    console.log(form);
    try {
      const url = "d3/crearResena";
      const data = new FetchData();
      const res = await data.request(url, "POST", form);
      handleMessage({
        header: "Estado del registro",
        message: res.msg === undefined ? "Registro Exitoso" : res.msg,
        state: true,
      });
      handleRegister();
    } catch (e) {
      handleMessage({
        header: "🔴 ",
        message: "Verificar Datos",
        state: true,
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={resena}
        size="lg"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <ModalHeader>Reseña a {res}</ModalHeader>
        <ModalBody></ModalBody>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <FormGroup>
            <Label> Comentario: </Label>
            <textarea
              onChange={handleChange}
              className="form-control"
              name="descripcion"
              placeholder="Escriba su reseña sobre el servicio"
            ></textarea>
          </FormGroup>
          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <Button onClick={realizar}>Enviar reseña</Button>
          </div>
        </Form>
        <ModalFooter>
          <Button
            className="btn-lg bg-primary"
            onClick={() => handleRegister()}
          >
            ⬅️
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default AddReseña;
