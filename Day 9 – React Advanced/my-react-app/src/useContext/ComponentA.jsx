import React, { createContext, useState } from "react";
import ComponentB from "./useContext/ComponentB";

export const UserContext = createContext();
function ComponentA() {
  const [user, setUser] = useState("Developer");
  return (
    <div className="box">
      <h1>ComponentA</h1>
      <h2>{`Hello ${user}`}</h2>
      <UserContext.Provider value={user}>
        <ComponentB user={user} />
      </UserContext.Provider>
    </div>
  );
}

export default ComponentA;
