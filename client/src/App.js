import React, { useState } from "react";

import Main from "./components/main";
import Book from "./components/book";
import ThankYou from "./components/thankYou";
import Navbar from "./components/navbar";
import Order from "./components/Order";
import Login from "./components/Login";
import Logout from "./components/Logout";

export default _ => {
  const [page, setPage] = useState(0);

  return (
    <div>
      <Navbar setPage={setPage} />
      {page === 0 ? <Main setPage={setPage} /> : null}
      {page === 1 ? <Book setPage={setPage} /> : null}
      {page === 3 ? <Order setPage={setPage} /> : null}
      {page === 4 ? <Login setPage={setPage} /> : null}
      {page === 5 ? <Logout setPage={setPage} /> : null}
      {page === 2 ? <ThankYou /> : null}
    </div>
  );
};
