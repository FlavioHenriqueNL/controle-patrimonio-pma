import React, {useState} from 'react';
import {} from 'react-router-dom';

const Login = () =>{

  const [login, setLogin] = useState('');

  const logar = (e) => {
    e.preventDefault();
    return(
      console.log(login)
    )
  }

  return(
    <>
      <h1>Página de Login</h1>
      <form onSubmit={logar}>
        <input type="text" onChange={(e)=>setLogin(e.target.value)}/>
        <input type="text" value={login}/>

        <input type="submit" value="Entrar"/>
      </form>
    </>
  )

}

export default Login;

