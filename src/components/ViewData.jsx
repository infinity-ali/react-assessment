import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  InputLabel,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { BookmarkAdd, BookmarkBorder } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmarkProjects,
  fetchBookmarkProjects,
  removeBookmarkProjects,
} from "../store/features/bookmarkSlice";

const ViewData = ({ project }) => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    bookmarkProjects,
    bookmarkStatus,
    addBookmarkProject,
    removeBookmarkProject,
  } = useSelector((state) => state.bookmark);

  useEffect(() => {
    if (!bookmarkProjects?.data?.length) {
      dispatch(fetchBookmarkProjects());
    }
  }, [addBookmarkProject, removeBookmarkProject]);

  // Handle toggling favorite state
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
      dispatch(removeBookmarkProjects(projectId)); // Dispatch removeFavorite action
    } else {
      dispatch(addBookmarkProjects(project)); // Dispatch addFavorite action
    }
  };

  console.log(param.id);

  // Check if project is in favorites
  let isFavorite = null;
  bookmarkProjects?.data?.filter((favorite) => {
    if (favorite.projectId === project.projectId) {
      return (isFavorite = true);
    } else return;
  });

  return (
    <Paper
      elevation={3}
      sx={{
        border: "none",
        boxShadow: "none",
        padding: 4,
        margin: "20px auto",
        width: "100%",
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{ display: "flex", justifyItems: "space-between", width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <InputLabel style={{ width: "200px", textAlign: "end" }}>
            Project Name
          </InputLabel>
          <Typography variant="body1">{project.projectName}</Typography>
        </Box>
        {bookmarkStatus === "loading" ? (
          <CircularProgress />
        ) : (
          <IconButton
            sx={{
              width: "50px",
              height: "50px",
              color: isFavorite ? "gold" : "gray",
            }}
            onClick={() => handleFavorite(project)} // Toggle favorite state
          >
            {isFavorite ? <BookmarkAdd /> : <BookmarkBorder />}
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: "20px" }}>
        <InputLabel style={{ width: "200px", textAlign: "end" }}>
          Description
        </InputLabel>
        <Typography width="400px" variant="body1">
          {project.description}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <InputLabel style={{ width: "200px", textAlign: "end" }}>
          Start Date
        </InputLabel>
        <Typography variant="body1">{project.startDate}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <InputLabel style={{ width: "200px", textAlign: "end" }}>
          End Date
        </InputLabel>
        <Typography variant="body1">{project.endDate}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <InputLabel style={{ width: "200px", textAlign: "end" }}>
          Project Manager
        </InputLabel>
        <Typography variant="body1">{project.projectManager}</Typography>
      </Box>

      <Box
        sx={{
          width: "48%",
          display: "flex",
          gap: 2,
          justifyContent: "flex-start",
          mt: 2,
          ml: "210px",
        }}
      >
        <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() =>
            navigate(`/projects/${project.id}/edit`, {
              state: { data: project },
            })
          }
        >
          Edit
        </Button>
      </Box>
    </Paper>
  );
};

export default ViewData;
