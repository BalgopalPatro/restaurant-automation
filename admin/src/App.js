import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Main from './components/main'
import Order from "./components/Order";
import Logout from "./components/Logout";

function App() {
  const [page, setPage] = useState(0);
  return (
    <div className="App">
      <Navbar setPage={setPage} />
      {page == 0 ? <Main setPage={setPage} /> : ""}
      {page == 1 ? <Order setPage={setPage} /> : ""}
      {page == 2 ? <Logout setPage={setPage} /> : ""}
    </div>
  );
}

export default App;
