import React from "react";
import TableView from "../components/TableView";
import EditUser from "../components/EditUser";
import NotFound from "../components/NotFound";

const routes = [
  {
    path: "/",
    element: <TableView />,
  },
  {
    path: "/edit/:projectId",
    element: <EditUser />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
