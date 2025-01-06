import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateForm from "./UpdateForm";

const data = [
  {
    projectId: "project_a",
    projectName: "Project A",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    projectId: "project_b",
    projectName: "Project B",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
];

function EditUser() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = data.find((p) => p.projectId === projectId);

  if (!project) {
    return (
      <div>
        <h1>Route Does Not Exist</h1>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <UpdateForm
      project={project}
      onUpdate={(updatedProject) => {
        console.log("Updated Project:", updatedProject);
        navigate("/");
      }}
      onCancel={() => navigate("/")}
    />
  );
}

export default EditUser;
