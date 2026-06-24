import {useContext} from 'react';
import { UserContext } from './context/UserContext.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ?  <Login /> :<Dashboard />}
    </div>
  );
}

export default App;