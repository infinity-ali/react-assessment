import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  InputLabel,
  IconButton,
  Button,
} from "@mui/material";
import { BookmarkAdd, BookmarkBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmarkProjects,
  fetchBookmarkProjects,
  removeBookmarkProject,
} from "../store/features/bookmarkSlice";

const ViewData = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites); // Access favorites from Redux

  const { bookmarkProjects } = useSelector((state) => state.bookmark);

  useEffect(() => {
    if (!bookmarkProjects?.data?.length) {
      dispatch(fetchBookmarkProjects());
    }
  }, []);

  // Handle toggling favorite state
  const handleFavorite = (project) => {
    const isFavorited = bookmarkProjects?.data?.some(
      (favorite) => favorite.id === project.id
    );

    if (isFavorited) {
      dispatch(removeBookmarkProject(project.id)); // Dispatch removeFavorite action
    } else {
      dispatch(addBookmarkProjects(project)); // Dispatch addFavorite action
    }
  };

  // Check if project is in favorites
  const isFavorite = bookmarkProjects?.data?.some(
    (favorite) => favorite.id === project.id
  );

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
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
