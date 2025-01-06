import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router";

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
  {
    projectId: "project_c",
    projectName: "Project C",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    projectId: "project_d",
    projectName: "Project D",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    projectId: "project_e",
    projectName: "Project E",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    projectId: "project_f",
    projectName: "Project F",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    projectId: "project_g",
    projectName: "Project G",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
];

const TableView = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const handleEdit = (projectId) => {
    navigate(`/edit/${projectId}`);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ margin: "50px 20px", width: "97%" }}
    >
      {isMobile ? (
        <div>
          {data?.map((row, index) => (
            <Paper
              key={index}
              sx={{
                padding: 2,
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <div>
                <strong>Project ID:</strong> {row.projectId}
              </div>
              <div>
                <strong>Project Name:</strong> {row.projectName}
              </div>
              <div>
                <strong>Start Date:</strong> {row.startDate}
              </div>
              <div>
                <strong>End Date:</strong> {row.endDate}
              </div>
              <div>
                <strong>Project Manager:</strong> {row.projectManager}
              </div>
              <Button
                onClick={() => handleEdit(row.projectId)}
                variant="contained"
                color="primary"
                size="small"
              >
                Edit
              </Button>
            </Paper>
          ))}
        </div>
      ) : (
        <Table>
          <TableHead sx={{ backgroundColor: "#D3D3D3" }}>
            <TableRow>
              <TableCell>Project ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Project Manager</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow sx={{ backgroundColor: "#F5F5F5" }} key={index}>
                <TableCell>{row.projectId}</TableCell>
                <TableCell>{row.projectName}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.projectManager}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(row.projectId)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default TableView;
