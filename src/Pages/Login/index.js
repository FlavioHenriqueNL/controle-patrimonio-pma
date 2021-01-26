import React, {useState, useContext, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {CssBaseline, TextField, Button} from '@material-ui/core';
import logo from '../../Assets/img/logo-pref.svg';
import UsuariosContext from '../../Contexts/Usuario.context';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';

export default function Login(){

  const [cpf, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const {userData, setUserData} = useContext(UsuariosContext);

  useEffect(()=>{

    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token","");
        token = "";
        console.log(`Está logado - authtoken? Não`);
        return false;
      }
      const tokenResult = await api.post("/tokenIsValid", null, {headers: {"x-auth-token": token}});
      if(tokenResult.data){
        const usuarioResult = await api.post("/usuarios", {headers: {"x-auth-token": token}});
        setUserData({
          token,
          usuario: usuarioResult.data
        });
        
        console.log("Você já está logado... vamos te redirecionar.")
        return true;
      }else{
        console.log("Você não está logado. Por favor, faça seu login.")
        return false;
      }
    }

    checkLoggedIn();
  }, [] )

  const logar = async (e) => {
    e.preventDefault();
    try{
      const loginUsuario = {cpf, password};
      const loginResultado = await api.post("/login", loginUsuario);
      setUserData({
        token: loginResultado.data.token,
        usuario: loginResultado.data.usuario
      });
      localStorage.setItem("auth-token", loginResultado.data.token);
      history.push("/");
    }catch(err){
      alert(err)
    }
  }

  return(
    <>
      <main id="login">
        <Container>
        <CssBaseline />
        <div className="box">
          
          <figure className="figure">
            <img width="100%" height="auto" src={logo} alt="Prefeitura Municipal de Arapiraca"/>
          </figure>

          <form noValidate onSubmit={logar}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="CPF / Login"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {e => setLogin(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {e => setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
                          >
              Entrar
            </Button>

          </form>
        </div>
      </Container>
    </main>
    </>
  )

}