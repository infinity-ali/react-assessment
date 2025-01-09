import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import routes from "./routes/routes";

const App = () => {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Sidebar />
        <div style={{ flex: 1, padding: "16px" }}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.id} element={route.element} path={route.path} />
            ))}
          </Routes>
        </div>
      </Box>
    </Router>
  );
};

export default App;
