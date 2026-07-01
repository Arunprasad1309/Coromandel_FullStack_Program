import { useState, useContext, useReducer } from "react";
import { UserContext } from "./context/UserContext";
import { habitReducer } from "./reducer/habitReducer";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState("dashboard");

  const [habits, dispatch] = useReducer(
    habitReducer,
    JSON.parse(localStorage.getItem("habits")) || []
  );

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <Navbar
        setPage={setPage}
        logout={() => setUser(null)}
      />

      {page === "dashboard" && (
        <Dashboard
          habits={habits}
          dispatch={dispatch}
        />
      )}

      {page === "profile" && (
        <Profile habits={habits} />
      )}
    </div>
  );
}

export default App;