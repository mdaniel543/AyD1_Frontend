
const BASE_URL = process.env.VITE_BACKEND_ADDR;


// Funcion para llamada a la api
async function callApi(endpoint, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  const url = BASE_URL + endpoint;
  console.log(BASE_URL)
  const response = await fetch(url, options);
  var data = await response.json();
  console.log(data)
  return data;
}


// Configuraciones para las llamadas a la api
const authentication ={
   users:{
       login(user){
        return callApi('d2/login', {
          method: 'POST',
          body: JSON.stringify(user),
        });
       }
   } 
}

  
export default authentication;