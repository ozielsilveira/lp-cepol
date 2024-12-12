import {
    Email as EmailIcon,
    Lock as LockIcon,
    Login as LoginIcon,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
    },
});

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const apiUrl = process.env.API_URL || "http://localhost:8787";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/auth/signin`, {
                email,
                password,
            });

            if (response.data && response.status === 200) {
                const { result } = response.data;
                const { access_token } = result;
                if (access_token) {
                    localStorage.setItem("authToken", access_token);

                    window.location.href = "/manager";
                }
            } else {
                setError(response.data.message || "Invalid credentials.");
            }
        } catch (err) {
            setError(
                axios.isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : "An error occurred. Please try again."
            );
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={6}
                    sx={{
                        marginTop: 8,
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <LoginIcon sx={{ fontSize: 48, mb: 2, color: "primary.main" }} />
                    <Typography component="h1" variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: "100%" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {error && (
                            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
                                {error}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            startIcon={<LoginIcon />}
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};
