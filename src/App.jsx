import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routes from "./routes/routes";

const App = () => {
  const router = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (router.pathname === "/") {
      navigate("/projects");
    }
  }, []);

  return (
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
  );
};

export default App;
