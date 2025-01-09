import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ViewData from "./ViewData";

function ViewUser() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state.data) {
    return (
      <div>
        <h1>Route Does Not Exist</h1>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <ViewData
      project={state.data}
      onUpdate={(updatedProject) => {
        console.log("Updated Project:", updatedProject);
        navigate("/");
      }}
      onCancel={() => navigate("/")}
    />
  );
}

export default ViewUser;
