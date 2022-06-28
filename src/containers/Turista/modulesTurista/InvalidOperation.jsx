import React from 'react';
import DefaultAction from './modules/DefaultAction';
const InvalidOperation = ({props}) => (
  <div className='containeroption'>
    <DefaultAction 
        {...props} 
        name={"📎 Seleccione Operacion"} />
  </div>
);

export default InvalidOperation;