import { Table, Button } from "reactstrap";
import { useEffect, useState } from "react";
import FetchData from "./api/Api";

const ListUsuario = ({tipo}) => {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    rol: `${tipo}`
  });

  useEffect(() => {
    const getResponse = async () => {
      const url = "d2/getUsers";
      const data = new FetchData();
      const datos = await data.request(url, "POST", form);
      setData(datos.usuarios);
      {console.log(datos)}
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
    {tipo == 3 && <h2>Lista Aereolineas</h2>}
      {tipo == 2 && <h2>Lista Hoteles</h2>}
      {tipo == 4 && <h2>Lista Concesionarias</h2>}
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
                    <th style={style.th}>Nombre</th>
                    <th style={style.th}>Correo</th>
                    <th style={style.th}>Ciudad</th>
                    <th style={style.th}>Pais</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((registro, index) => (
                    <tr key={registro.id_Usuario}>
                      <th scope="row">{index+1}</th>
                      <td>{registro.nombre}</td>
                      <td>{registro.correo}</td>
                      <td>{registro.ciudad}</td>
                      <td>{registro.pais}</td>
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
