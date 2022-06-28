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
const List = ({
  registro,
  nombre,
  handleRegister,
  id_user,
  tipo,
  handleMessage,
}) => {
  const session_active = JSON.parse(localStorage["session"]);

  const [collapse, setCollapse] = useState(true);
  const [dataE, setDataE] = useState([]);
  const [dataCopia, setDataCopia] = useState([]);

  const [busqueActiva, setActiva] = useState(true);

  const [form, setForm] = useState({
    fecha: Date(),
    cantidad: "",
    idObjeto: "",
    idUsuario: session_active.id_Usuario,
    tipoUser: tipo,
    contrasenaCheck: "",
  });
  const [buscar, setBuscar] = useState({
    marca: "",
    modelo: "",
    capacidad: "",
    destino: "",
    fecha: "",
  });

  const [evento, setEvento] = useState();

  const [precioMin, setMin] = useState(0);
  const [precioMax, setMax] = useState(5000);

  useEffect(() => {
    const getlist = async (id_user) => {
      if (id_user === undefined) return;
      console.log(id_user);
      const url =
        tipo === 2
          ? "d1/getAllRooms"
          : tipo === 4
          ? "d2/getAuto"
          : "d3/listarVuelosAerolinea";
      const data = new FetchData();
      const datos = await data
        .request(url, "POST", {
          rol: id_user,
          id_usuario: id_user,
          id: 1,
          id_fk: id_user,
        })
        .then((datos) => {
          console.log(datos);
          if (tipo === 2) {
            setDataE(datos);
          } else if (tipo === 3) {
            setDataE(datos.listado[0]);
          } else {
            if (datos.msg === undefined) setDataE(datos.autos);
            else setDataE([]);
          }
          setCollapse(false);
        });
    };
    getlist(id_user);
  }, id_user);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e, id) => {
    if (collapse) {
      setCollapse(false);
      evento.target.style.color = "";
    } else {
      setCollapse(true);
      e.target.style.color = "yellow";
      setEvento(e);
      setForm({
        ...form,
        idObjeto: id,
      });
    }
  };

  const handleBusqueda = (e) => {
    setBuscar({
      ...buscar,
      [e.target.name]: e.target.value,
    });
  };

  const realizarBusqueda = () => {
    console.log(buscar);
    if (precioMin < precioMax) {
      var data_filter;
      if (tipo === 4) {
        data_filter = dataE.filter(
          (element) =>
            (buscar.marca === "" ? true : element.marca === buscar.marca) &&
            (buscar.modelo === "" ? true : element.modelo === buscar.modelo) &&
            element.precio >= precioMin &&
            element.precio <= precioMax
        );
      } else if (tipo === 2) {
        data_filter = dataE.filter(
          (element) =>
            (buscar.capacidad === ""
              ? true
              : element.capacidad == buscar.capacidad) &&
            element.precio >= precioMin &&
            element.precio <= precioMax
        );
      } else {
        data_filter = dataE.filter(
          (element) =>
            (buscar.destino === ""
              ? true
              : element.destino == buscar.destino) &&
            element.precio >= precioMin &&
            element.precio <= precioMax &&
            (buscar.fecha === ""
              ? true
              : moment(element.fecha).format("YYYY-MM-DD") == buscar.fecha)
        );
      }
      setDataCopia(dataE);
      setDataE(data_filter);
      setActiva(false);
    } else {
      handleMessage({
        header: "🔴 ",
        message: "Verificar precio minimo y maximo",
        state: true,
      });
    }
  };

  const handleCerrarBusqueda = () => {
    setActiva(true);
    setDataE(dataCopia);
    setBuscar({
      marca: "",
      modelo: "",
      capacidad: "",
      fecha: "",
      destino: "",
    });
  };

  const handleRegis = () => {
    handleRegister();
    setActiva(true);
    setBuscar({
      marca: "",
      modelo: "",
      capacidad: "",
      fecha: "",
      destino: "",
    });
  };

  const style = {
    table: {
      width: "100%",
      display: "table",
      borderSpacing: 0,
      borderCollapse: "separate",
    },
    th: {
      top: 0,
      left: 0,
      zIndex: 10,
      position: "sticky",
      backgroundColor: "#fff",
    },
  };

  const realizarPeticion = async () => {
    console.log(form);
    try {
      const url = "d2/reservar";
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
        isOpen={registro}
        size="lg"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <ModalHeader>
          {tipo == 2 && (
            <h2>
              Lista de Habitaciones de <i>{nombre}</i>
            </h2>
          )}
          {tipo == 3 && (
            <h2>
              Lista de vuelos de <i>{nombre}</i>
            </h2>
          )}
          {tipo == 4 && (
            <h2>
              Lista de vehiculos <i>{nombre}</i>
            </h2>
          )}
        </ModalHeader>
        {!busqueActiva && (
          <>
            <div style={{ display: "flex" }}>
              <Button
                style={{ marginLeft: "auto" }}
                color="danger"
                onClick={handleCerrarBusqueda}
              >
                Cerrar Busqueda
              </Button>
            </div>
          </>
        )}
        {dataE.length > 0 ? (
          <>
            <Collapse isOpen={collapse}>
              <div>
                <Card>
                  <center>
                    <h5>Confirmar solicitud</h5>
                  </center>
                  <CardBody>
                    <Label>Cantidad de Dias a rentar</Label>
                    <Input
                      name="cantidad"
                      type="number"
                      onChange={handleChange}
                    />
                    <Label>Confirmar Contraseña</Label>
                    <Input
                      name="contrasenaCheck"
                      type="password"
                      onChange={handleChange}
                    />
                    <div style={{ height: "0.5cm" }}></div>
                    <Button
                      style={{ width: "100%" }}
                      color="primary"
                      onClick={realizarPeticion}
                    >
                      Solicitar
                    </Button>
                    <div style={{ height: "0.2cm" }}></div>
                    <Button
                      style={{ width: "100%" }}
                      color="secondary"
                      onClick={handleSelect}
                    >
                      Cancelar
                    </Button>
                  </CardBody>
                </Card>
              </div>
              <div style={{ height: "1cm" }}></div>
            </Collapse>
            <ModalBody>
              {tipo === 4 && busqueActiva ? (
                <Form>
                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleCity">Marca</Label>
                        <Input
                          value={buscar.marca}
                          name="marca"
                          onChange={handleBusqueda}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleState">Modelo</Label>
                        <Input
                          value={buscar.modelo}
                          name="modelo"
                          onChange={handleBusqueda}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleZip">Precio minimo</Label>
                        <RangeSlider
                          value={precioMin}
                          onChange={(e) => setMin(e.target.value)}
                          min={0}
                          max={5000}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleZip">Precio maximo</Label>
                        <RangeSlider
                          value={precioMax}
                          onChange={(e) => setMax(e.target.value)}
                          min={0}
                          max={5000}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{ marginLeft: "auto" }}
                      color="success"
                      onClick={realizarBusqueda}
                    >
                      Buscar
                    </Button>
                  </div>
                </Form>
              ) : tipo === 2 && busqueActiva ? (
                <Form>
                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleCity">Capacidad</Label>
                        <Input
                          value={buscar.capacidad}
                          name="capacidad"
                          onChange={handleBusqueda}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleZip">Precio minimo</Label>
                        <RangeSlider
                          value={precioMin}
                          onChange={(e) => setMin(e.target.value)}
                          min={0}
                          max={5000}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleZip">Precio maximo</Label>
                        <RangeSlider
                          value={precioMax}
                          onChange={(e) => setMax(e.target.value)}
                          min={0}
                          max={5000}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{ marginLeft: "auto" }}
                      color="success"
                      onClick={realizarBusqueda}
                    >
                      Buscar
                    </Button>
                  </div>
                </Form>
              ) : (
                <Form>
                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleCity">Fecha</Label>
                        <Input
                          value={buscar.fecha}
                          name="fecha"
                          type="date"
                          onChange={handleBusqueda}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleCity">Destino</Label>
                        <Input
                          value={buscar.destino}
                          name="destino"
                          onChange={handleBusqueda}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleZip">Precio minimo</Label>
                        <RangeSlider
                          value={precioMin}
                          onChange={(e) => setMin(e.target.value)}
                          min={0}
                          max={5000}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="exampleZip">Precio maximo</Label>
                        <RangeSlider
                          value={precioMax}
                          onChange={(e) => setMax(e.target.value)}
                          min={0}
                          max={5000}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{ marginLeft: "auto" }}
                      color="success"
                      onClick={realizarBusqueda}
                    >
                      Buscar
                    </Button>
                  </div>
                </Form>
              )}
              <div>
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                  <div
                    style={{
                      maxHeight: "700px",
                      overflowY: "auto",
                    }}
                  >
                    <Table bordered height="250" style={style.table}>
                      <thead>
                        <tr>
                          {tipo === 2 ? (
                            <>
                              <th style={style.th}>#</th>
                              <th style={style.th}>Fecha</th>
                              <th style={style.th}>Cantidad de habitaciones</th>
                              <th style={style.th}>Precio</th>
                              <th style={style.th}>Capacidad de personas</th>
                            </>
                          ) : tipo === 4 ? (
                            <>
                              <th style={style.th}>#</th>
                              <th style={style.th}>Marca</th>
                              <th style={style.th}>Modelo</th>
                              <th style={style.th}>Precio</th>
                              <th style={style.th}>Placa</th>
                            </>
                          ) : (
                            <>
                              <th style={style.th}>#</th>
                              <th style={style.th}>Fecha</th>
                              <th style={style.th}>Destino</th>
                              <th style={style.th}>
                                Cantidad de asientos disponibles
                              </th>
                              <th style={style.th}>Precio</th>
                            </>
                          )}
                          <th style={style.th}>Accion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataE.map((registro, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            {tipo === 2 ? (
                              <>
                                <td>
                                  {moment(registro.fec_disponibilidad).format(
                                    "DD/MM/YYYY"
                                  )}
                                </td>
                                <td>{registro.cantidadHabitaciones}</td>
                                <td>{registro.precio}</td>
                                <td>{registro.capacidad}</td>
                              </>
                            ) : tipo === 4 ? (
                              <>
                                <td>{registro.marca}</td>
                                <td>{registro.modelo}</td>
                                <td>{registro.precio}</td>
                                <td>{registro.placa}</td>
                              </>
                            ) : (
                              <>
                                <td>
                                  {moment(registro.fecha).format("DD/MM/YYYY")}
                                </td>
                                <td>{registro.destino}</td>
                                <td>{registro.cantAsientos}</td>
                                <td>{registro.precio}</td>
                              </>
                            )}
                            <td>
                              <Button
                                color="secondary"
                                style={{ height: "35px", width: "100px" }}
                                onClick={(e) =>
                                  handleSelect(
                                    e,
                                    tipo === 4
                                      ? registro.id_regAutos
                                      : tipo === 2
                                      ? registro.id_regHabitacion
                                      : registro.id_vuelo
                                  )
                                }
                              >
                                Seleccionar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        ) : (
          <h3>... Sin Datos</h3>
        )}
        <ModalFooter>
          <Button className="btn-lg bg-primary" onClick={() => handleRegis()}>
            ⬅️
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default List;
