import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

// Layout global de toda la aplicacion
const Layout = ({ children }) => (
  <div className="App">
        {children}
  </div>
);

export default Layout;