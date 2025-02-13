import React, { useEffect } from "react";
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
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router";
import { BookmarkAdd } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/features/favoritesSlice";
import {
  addBookmarkProjects,
  fetchBookmarkProjects,
  removeBookmarkProjects,
} from "../store/features/bookmarkSlice";

const TableView = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects, status, error, addProject, updateProject } = useSelector(
    (state) => state.favorites
  );

  const {
    bookmarkProjects,
    bookmarkStatus,
    addBookmarkProject,
    removeBookmarkProject,
  } = useSelector((state) => state.bookmark);

  const handleEdit = (data) => {
    navigate(`/projects/${data.id}/edit`, {
      state: {
        data: data,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchBookmarkProjects());
  }, [addProject, updateProject, addBookmarkProject, removeBookmarkProject]);

  const handleFavorite = (project) => {
    let isFavorited = false;
    let projectId = null;
    // let favoriteId = null;
    bookmarkProjects?.data?.filter((favorite) => {
      if (favorite.projectId === project.projectId) {
        projectId = favorite.id;
        // favoriteId = project.projectId;
        return (isFavorited = true);
      } else return;
    });
    if (isFavorited) {
      dispatch(removeBookmarkProjects(projectId));
    } else {
      dispatch(addBookmarkProjects(project));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "50px 20px",
      }}
    >
      <Box
        sx={{
          width: "97%",
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Button
          onClick={() => navigate("/projects/new")}
          variant="contained"
          color="primary"
          size="small"
        >
          Create New
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ width: "97%" }}>
        {isMobile ? (
          <>
            {status === "loading" || bookmarkStatus === "loading" ? (
              <CircularProgress />
            ) : (
              <div>
                {projects?.data?.map((row, index) => (
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
                      <strong>Project ID:</strong> project_{row.id}
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
                      onClick={() => handleEdit(row)}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Edit
                    </Button>
                  </Paper>
                ))}
              </div>
            )}
          </>
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
            {status === "loading" || bookmarkStatus === "loading" ? (
              <Box
                sx={{
                  width: "100px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px 0px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <TableBody>
                {projects?.data?.map((row, index) => (
                  <TableRow sx={{ backgroundColor: "#F5F5F5" }} key={index}>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/projects/${row.id}`, {
                          state: {
                            data: row,
                          },
                        })
                      }
                    >
                      Project_{row.id}
                    </TableCell>
                    <TableCell className="capitalize">
                      {row.projectName}
                    </TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>{row.projectManager}</TableCell>
                    <TableCell sx={{ display: "flex", gap: "5px" }}>
                      <IconButton
                        sx={{
                          width: "50px",
                          height: "50px",
                          color: bookmarkProjects?.data?.some(
                            (favorite) => favorite.projectId === row.projectId
                          )
                            ? "orange" // Color when the project is a favorite
                            : "gray", // Color when it's not a favorite
                        }}
                        onClick={() => handleFavorite(row)}
                      >
                        <BookmarkAdd />
                      </IconButton>

                      <Button
                        onClick={() => handleEdit(row)}
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default TableView;
