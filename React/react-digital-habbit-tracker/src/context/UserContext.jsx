import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("user") || null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

