
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import emailjs from "@emailjs/browser";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    description: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      description: !formData.description.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Configuração do EmailJS
      emailjs
        .send(
          "service_ljdjzd9", // substitua pelo seu Service ID
          "template_lojo0uc", // substitua pelo seu Template ID
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.description,
          },
          "fNRrdDZRvR9oaQX8B" // substitua pela sua Public Key
        )
        .then(
          (result) => {
            console.log("Email enviado:", result.text);
            setShowSuccess(true);
            setFormData({ name: "", email: "", description: "" }); // Limpa o formulário
          },
          (error) => {
            console.error("Erro ao enviar email:", error.text);
          }
        );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Contact
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please fill out the form below to contact us.
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
              helperText={formErrors.name ? "Name is required." : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="E-mail"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              helperText={
                formErrors.email
                  ? "Please enter a valid email address."
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              error={formErrors.description}
              helperText={
                formErrors.description ? "Description is mandatory." : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              sx={{ mt: 2 }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Email sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};