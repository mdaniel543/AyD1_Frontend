import { Table, Button } from "reactstrap";
import { useEffect, useState } from "react";
import FetchData from "./api/Api";
import * as moment from 'moment'

const ListUsuario = ({ id }) => {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    id_usuario: `${id}`,
    id: 2
  });

  useEffect(() => {
    const getResponse = async () => {
      const url = "d1/getAllRooms";
      const data = new FetchData();
      const datos = await data.request(url, "POST", form);
      {
        console.log(datos)
        if (datos.msg === undefined) {
          setData(datos);
        }
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

  return (
    <>
      <h2>Lista de Habitaciones</h2>

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
                    <th style={style.th}>Fecha</th>
                    <th style={style.th}>Cantidad</th>
                    <th style={style.th}>Precio</th>
                    <th style={style.th}>Capacidad</th>
                  </tr>
                </thead>
                
                  {data.map((registro, index) => (
                    <tbody style = {{backgroundColor : registro.estado === 2 ? "#F44336": ""}}>
                    <tr >
                      <th scope="row">{index + 1}</th>
                      <td>{moment(registro.fec_disponibilidad).format('DD/MM/YYYY')}</td>
                      <td>{registro.cantidadHabitaciones}</td>
                      <td>{registro.precio}</td>
                      <td>{registro.capacidad}</td>
                    </tr>
                    </tbody>
                  ))}
               
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <h1>..Loading</h1>
      )}
    </>
  );
};
export default ListUsuario;
