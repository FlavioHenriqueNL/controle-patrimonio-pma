import React, {useState} from 'react';
import { useEffect } from 'react';
import api from '../../services/api';

export const Context = React.createContext();

const getListaInicial = async () => await api.get('patrimonios');

const PatrimonioContext = ({children}) => {
  
  const [patrimonios, setPatrimonios] = useState([]);
  useEffect( async()=>{
    let listaInicial = await getListaInicial(); 
    setPatrimonios(listaInicial.data);
  }, [])


  return(
    <Context.Provider value={[patrimonios, setPatrimonios]}>{children}</Context.Provider>
)
}
export default PatrimonioContext;