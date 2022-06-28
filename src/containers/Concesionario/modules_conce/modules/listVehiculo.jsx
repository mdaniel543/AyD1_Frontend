import { Table, Button } from "reactstrap";
import { useEffect, useState } from "react";
import FetchData from "./api/Api";

const ListUsuario = ({ id }) => {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    rol: `${id}`,
    id: 2,
  });

  useEffect(() => {
    const getResponse = async () => {
      const url = "d2/getAuto";
      const data = new FetchData();
      const datos = await data.request(url, "POST", form);
      {
        if (datos.msg === undefined) {
          setData(datos.autos);
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
      <h2>Lista de vehiculos en la concesionaria</h2>

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
                    <th style={style.th}>Marca</th>
                    <th style={style.th}>Modelo</th>
                    <th style={style.th}>Precio</th>
                    <th style={style.th}>Placa</th>
                  </tr>
                </thead>

                {data.map((registro, index) => (
                  <tbody
                    style={{
                      backgroundColor: registro.estado === 2 ? "#F44336" : "",
                    }}
                  >
                    <tr key={registro.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{registro.marca}</td>
                      <td>{registro.modelo}</td>
                      <td>{registro.precio}</td>
                      <td>{registro.placa}</td>
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
