import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Paper, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProjects } from "../store/features/favoritesSlice";

function NewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Validation schema using Yup
  const validationSchema = Yup.object({
    projectId: Yup.string().required("Project id is required."),
    projectName: Yup.string().required("Project Name is required."),
    description: Yup.string()
      .required("Description is required.")
      .min(20)
      .max(450),
    startDate: Yup.date()
      .required("Start Date is required.")
      .typeError("Invalid date format."),
    endDate: Yup.date()
      .required("End Date is required.")
      .typeError("Invalid date format.")
      .min(Yup.ref("startDate"), "End Date cannot be earlier than Start Date."),
    projectManager: Yup.string().required("Project Manager is required."),
  });

  const formik = useFormik({
    initialValues: {
      projectId: "",
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
      projectManager: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addProjects(values));
      // Optionally call the onUpdate function passed as a prop to inform the parent
      navigate("/projects");
    },
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
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <InputLabel style={{ width: "200px", textAlign: "end" }}>
            Project ID
          </InputLabel>
          <TextField
            name="projectId"
            value={formik.values.projectId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.projectId && !!formik.errors.projectId}
            helperText={formik.touched.projectId && formik.errors.projectId}
            style={{ width: "400px" }}
            margin="normal"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <InputLabel style={{ width: "200px", textAlign: "end" }}>
            Project Name
          </InputLabel>
          <TextField
            name="projectName"
            value={formik.values.projectName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.projectName && !!formik.errors.projectName}
            helperText={formik.touched.projectName && formik.errors.projectName}
            style={{ width: "400px" }}
            margin="normal"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InputLabel style={{ width: "200px", textAlign: "end" }}>
            Description
          </InputLabel>
          <TextField
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
            style={{ width: "400px" }}
            margin="normal"
            multiline
            rows={4}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InputLabel style={{ width: "200px", textAlign: "end" }}>
            Start Date
          </InputLabel>
          <TextField
            name="startDate"
            type="date"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.startDate && !!formik.errors.startDate}
            helperText={formik.touched.startDate && formik.errors.startDate}
            style={{ width: "400px" }}
            margin="normal"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InputLabel style={{ width: "200px", textAlign: "end" }}>
            End Date
          </InputLabel>
          <TextField
            name="endDate"
            type="date"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.endDate && !!formik.errors.endDate}
            helperText={formik.touched.endDate && formik.errors.endDate}
            style={{ width: "400px" }}
            margin="normal"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InputLabel style={{ width: "200px", textAlign: "end" }}>
            Project Manager
          </InputLabel>
          <TextField
            name="projectManager"
            value={formik.values.projectManager}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.projectManager && !!formik.errors.projectManager
            }
            helperText={
              formik.touched.projectManager && formik.errors.projectManager
            }
            style={{ width: "400px" }}
            margin="normal"
          />
        </Box>

        <Box
          sx={{
            width: "48%",
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default NewUser;
