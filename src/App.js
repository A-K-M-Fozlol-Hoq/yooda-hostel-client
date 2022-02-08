import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import Login from './components/Login/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn}></Dashboard>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn}></Login>
      )}
    </div>
  );
}

export default App;
