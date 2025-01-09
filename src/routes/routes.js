import React from "react";
import TableView from "../components/TableView";
import EditUser from "../components/EditUser";
import NotFound from "../components/NotFound";
import ViewUser from "../components/ViewUser";
import NewUser from "../components/NewUser";

const routes = [
  {
    id: 1,
    path: "/projects",
    element: <TableView />,
  },
  {
    id: 2,
    path: "/projects/new",
    element: <NewUser />,
  },
  {
    id: 2,
    path: "/projects/:id/edit",
    element: <EditUser />,
  },
  {
    id: 3,
    path: "/projects/:id",
    element: <ViewUser />,
  },
  {
    id: 4,
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
