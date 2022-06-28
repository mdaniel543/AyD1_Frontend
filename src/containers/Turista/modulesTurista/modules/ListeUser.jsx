import {
  Table,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useEffect, useState } from "react";
import FetchData from "./api/Api";

import List from "./modals/list";
import Message from "../../../Administrador/modulesadmin/Message";

import AddReseña from "./modals/addReseña";

const ListUsuario = ({ tipo }) => {
  const session_active = JSON.parse(localStorage["session"]);

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    rol: `${tipo}`,
  });

  const [resena, setResena] = useState(false);

  const [id_user, setId] = useState();
  const [nombre, setNombre] = useState();
  const [res, setRes] = useState();
  const [registro, setRegistro] = useState(false);

  const handleRegister = (id, nombre) => {
    console.log(id, nombre);
    setNombre(nombre);
    if (tipo == 6) {
      setRes(id);
      setResena(!resena);
    } else {
      setId(id);
      setRegistro(!registro);
    }
  };

  const [statemessage, setStatatemessage] = useState({
    header: "",
    message: "",
    state: false,
  });

  const handleMessage = (obj) => {
    setStatatemessage(obj);
  };

  useEffect(() => {
    const getResponse = async () => {
      if (form.rol == 6) {
        const url = "d3/listadoServiciosUsuario";
        const data = new FetchData();
        const datos = await data.request(url, "POST", {
          id_usu: session_active.id_Usuario,
        });
        setData(datos.msg);
      } else if (form.rol == 7) {
        const url = "d3/listarResenas";
        const data = new FetchData();
        const datos = await data.request(url, "POST", {
          fk_id: session_active.id_Usuario,
        });
        setData(datos.msg);
      } else {
        const url = "d2/getUsers";
        const data = new FetchData();
        const datos = await data.request(url, "POST", form);
        setData(datos.usuarios);
        console.log(datos);
      }
    };
    getResponse();
  }, []);

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

  const [buscar, setBuscar] = useState({
    ciudad: "",
    pais: "",
  });

  const [dataCopia, setDataCopia] = useState([]);

  const [busqueActiva, setActiva] = useState(true);

  const handleCerrarBusqueda = () => {
    setActiva(true);
    setData(dataCopia);
    setBuscar({
      ciudad: "",
      pais: "",
    });
  };

  const handleBusqueda = (e) => {
    setBuscar({
      ...buscar,
      [e.target.name]: e.target.value,
    });
  };

  const realizarBusqueda = () => {
    console.log(data.filter);
    var data_filter = data.filter(
      (element) =>
        (buscar.ciudad === "" ? true : element.ciudad == buscar.ciudad) &&
        (buscar.pais === "" ? true : element.pais === buscar.pais)
    );
    setDataCopia(data);
    setData(data_filter);
    setActiva(false);
  };

  return (
    <>
      <Message statemessage={statemessage} handleMessage={handleMessage} />
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
      {tipo === 2 && busqueActiva && (
        <>
          <div style={{ height: "0.5cm" }}></div>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Input
                    placeholder="Pais"
                    value={buscar.pais}
                    name="pais"
                    onChange={handleBusqueda}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input
                    placeholder="Ciudad"
                    value={buscar.ciudad}
                    name="ciudad"
                    onChange={handleBusqueda}
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
        </>
      )}

      {tipo == 3 && <h2>Lista Aereolineas</h2>}
      {tipo == 2 && <h2>Lista Hoteles</h2>}
      {tipo == 4 && <h2>Lista Concesionarias</h2>}
      {tipo == 6 && <h2>Lista de Servicios Contratados</h2>}
      {tipo == 7 && <h2>Lista de Reseñas realizadas</h2>}
      {data.length > 0 ? (
        <div className="containeroption__form">
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              <Table bordered height="200" style={style.table}>
                <thead>
                  <tr>
                    <th style={style.th}>#</th>
                    {tipo == 6 ? (
                      <>
                        <th style={style.th}>Servicio Contratado</th>
                        <th style={style.th}>Accion</th>
                      </>
                    ) : tipo == 7 ? (
                      <>
                        <th style={style.th}>Servicio</th>
                        <th style={style.th}>Descripcion</th>
                      </>
                    ) : (
                      <>
                        <th style={style.th}>Nombre</th>
                        <th style={style.th}>Correo</th>
                        <th style={style.th}>Ciudad</th>
                        <th style={style.th}>Pais</th>
                        <th style={style.th}>Ver</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((registro, index) => (
                    <tr key={registro.id_Usuario}>
                      <th scope="row">{index + 1}</th>
                      {tipo == 6 ? (
                        <>
                          <td>{registro.tipoServicio}</td>
                        </>
                      ) : tipo == 7 ? (
                        <>
                          <td>{registro.tipoServicio}</td>
                          <td>{registro.descripcionReseña}</td>
                        </>
                      ) : (
                        <>
                          <td>{registro.nombre}</td>
                          <td>{registro.correo}</td>
                          <td>{registro.ciudad}</td>
                          <td>{registro.pais}</td>
                        </>
                      )}
                      {tipo == 7 ? (
                        <></>
                      ) : (
                        <td>
                          <Button
                            color="info"
                            style={{ height: "35px", width: "120px" }}
                            onClick={() =>
                              handleRegister(
                                tipo == 6
                                  ? registro.tipoServicio
                                  : registro.id_Usuario,
                                registro.nombre
                              )
                            }
                          >
                            {tipo == 3 && <text>Vuelos</text>}
                            {tipo == 2 && <text>Habitaciones</text>}
                            {tipo == 4 && <text>Vehiculos</text>}
                            {tipo == 6 && <text>Reseña</text>}
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <h1>..Loading</h1>
      )}
      <List
        registro={registro}
        nombre={nombre}
        handleRegister={handleRegister}
        id_user={id_user}
        tipo={tipo}
        handleMessage={handleMessage}
      ></List>
      <AddReseña
        resena={resena}
        handleRegister={handleRegister}
        res={res}
        handleMessage={handleMessage}
        nombre={nombre}
      />
    </>
  );
};
export default ListUsuario;
