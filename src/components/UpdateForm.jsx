import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const UpdateForm = ({ project, onUpdate, onCancel }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required."),
    description: Yup.string().required("Description is required."),
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
      projectId: project.projectId || "",
      projectName: project.projectName || "",
      description: project.description || "",
      startDate: project.startDate || "",
      endDate: project.endDate || "",
      projectManager: project.projectManager || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onUpdate(values); // Pass valid data to parent
    },
  });

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        margin: "20px auto",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6">Update Project</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Project ID"
          name="projectId"
          value={formik.values.projectId}
          disabled
          fullWidth
          margin="normal"
        />
        <TextField
          label="Project Name"
          name="projectName"
          value={formik.values.projectName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.projectName && !!formik.errors.projectName}
          helperText={formik.touched.projectName && formik.errors.projectName}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.startDate && !!formik.errors.startDate}
          helperText={formik.touched.startDate && formik.errors.startDate}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.endDate && !!formik.errors.endDate}
          helperText={formik.touched.endDate && formik.errors.endDate}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Project Manager"
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
          fullWidth
          margin="normal"
        />
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
        >
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default UpdateForm;
