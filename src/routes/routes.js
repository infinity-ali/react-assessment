import React from "react";
import TableView from "../components/TableView";
import EditUser from "../components/EditUser";
import NotFound from "../components/NotFound";
import ViewUser from "../components/ViewUser";
import NewUser from "../components/NewUser";

const routes = [
  {
    id: 1,
    path: "/",
    element: <TableView />,
  },
  {
    id: 2,
    path: "/project/new",
    element: <NewUser />,
  },
  {
    id: 2,
    path: "/project/:id/edit",
    element: <EditUser />,
  },
  {
    id: 3,
    path: "/project/:id",
    element: <ViewUser />,
  },
  {
    id: 4,
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
