import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes/routes";

const AppRoutes = () => {
  return useRoutes(routes);
};

const App = () => {
  const [selectedProject, setSelectedProject] = useState("");

  const handleChildClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Sidebar onChildClick={handleChildClick} />
        <div style={{ flex: 1, padding: "16px" }}>
          {selectedProject}
          <AppRoutes />
        </div>
      </Box>
    </Router>
  );
};

export default App;
