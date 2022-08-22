import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
  const storedUserLoggedInInformation = localStorage.getItem('isLogged')
 
  if(storedUserLoggedInInformation==='1'){
    setIsLoggedIn(true);
   }
   },[]);
  
  
   const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
   localStorage.setItem('isLogged','1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLogged')
    setIsLoggedIn(false);
  };

  return (
    
      <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        onLogOut:logoutHandler
        }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
    
  );
}

export default App;
