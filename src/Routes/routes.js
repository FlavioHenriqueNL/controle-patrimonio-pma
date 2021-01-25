import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import isAuthenticated from '../services/auth';
import Login from '../Pages/Login';
import Patrimonios from '../Pages/Patrimonios';
import PatrimoniosEditar from '../Pages/Patrimonios/Editar';
import Dashboard from '../Pages/Dashboard';
import Movimentacoes from '../Pages/Movimentacoes';
import UsuariosContext from '../Contexts/Usuario.context';
import api from '../services/api';


const Routes = () => { 

  const [userData, setUserData] = useState({
    token: undefined,
    usuario: undefined
  });
  const [isLogged, setIsLogged] = useState(false);

  
 
  

  useEffect(()=>{
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      console.log(`O token é: ${token}`);
      console.log(`Ele é nulo? ${token === null}`);
      if(token === null){
        localStorage.setItem("auth-token","");
        token = "";
        console.log(`Está logado - authtoken? ${isLogged}`);
        return false;
      }
      
      const tokenResult = await api.post("/tokenIsValid", null, {headers: {"x-auth-token": token}});
      if(tokenResult.data){
        const usuarioResult = await api.get("/usuarios", {headers: {"x-auth-token": token}});
        setUserData({
          token,
          usuario: usuarioResult.data
        });
        
        console.log(`Está logado? ${isLogged}`);
        return true;
      }else{
        console.log(`Está logado - data? ${isLogged}`);
        return false;
      }
      console.log(tokenResult);
    }
    setIsLogged(checkLoggedIn());
    console.log(isLogged);

  }, [])

  


  const PrivateRoute =  ({component: Component, ...rest}) => (
    <Route {...rest} 
      render={ 
        props => (
          isLogged ? 
            <Component {...props}/>
          : 
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )}
    />
  ); 

  return(
    <BrowserRouter basename={window.location.pathname}>
    <UsuariosContext.Provider value={{userData, setUserData}}>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/patrimonios" component={Patrimonios} />
          <PrivateRoute exact path="/patrimonios/editar" component={PatrimoniosEditar} />
          <PrivateRoute exact path="/movimentacoes" component={Movimentacoes} />
          <Route exact path="/login" component={Login} />
        </Switch>
    </UsuariosContext.Provider>
      </BrowserRouter>
  )
}

export default Routes;
