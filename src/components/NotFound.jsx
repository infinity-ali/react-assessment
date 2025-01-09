import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Route Does Not Exist</h1>
      <button onClick={() => navigate("/projects")}>Go Back</button>
    </div>
  );
};

export default NotFound;
