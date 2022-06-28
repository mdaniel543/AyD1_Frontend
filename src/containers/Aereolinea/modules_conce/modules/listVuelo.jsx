import { Table, Button } from "reactstrap";
import { useEffect, useState } from "react";
import FetchData from "./api/Api";
import * as moment from 'moment'


const ListUsuario = ({ id }) => {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    id_fk: `${id}`,
  });

  useEffect(() => {
    const getResponse = async () => {
      const url = "d3/listarVuelosAerolinea";
      const data = new FetchData();
      const datos = await data.request(url, "POST", form);
      {
        if (datos.msg === undefined) {
          setData(datos.listado[0]);
          console.log(datos.listado[0])
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
      <h2>Lista de vuelos</h2>
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
                    <th style={style.th}>Destino</th>
                    <th style={style.th}>Cantidad de asientos disponibles</th>
                    <th style={style.th}>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((registro, index) => (
                    <tr >
                      <th scope="row">{index + 1}</th>
                      <td>{moment(registro.fecha).format('DD/MM/YYYY')}</td>
                      <td>{registro.destino}</td>
                      <td>{registro.cantAsientos}</td>
                      <td>{registro.precio}</td>
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
    </>
  );
};
export default ListUsuario;
