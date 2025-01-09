import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UpdateForm from "./UpdateForm";

function EditUser() {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);

  if (!state.data) {
    return (
      <div>
        <h1>Route Does Not Exist</h1>
        <button onClick={() => navigate("/projects")}>Go Back</button>
      </div>
    );
  }

  return (
    <UpdateForm project={state.data} onCancel={() => navigate("/projects")} />
  );
}

export default EditUser;
