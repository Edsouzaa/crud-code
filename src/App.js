import React, {useState} from 'react';
import './App.css';

// Importar os componentes
import Login from './components/Login/Login.js';

function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === '123'){
      setIsLoggedIn(true);
    } else {
      alert('Usuario ou Senha INVALIDOS!!!')
    }
  };

  if (!isLoggedIn){
    return(
    <Login onLogin={handleLogin}/>
    )
  }

};
export default App;