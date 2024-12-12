import {
    Email as EmailIcon,
    Lock as LockIcon,
    Login as LoginIcon,
    Visibility,
    VisibilityOff
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/auth/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            console.log("result", result);
            if (!response.ok) {
                setError(result.message || "An error occurred. Please try again.");
            } else if (result.access_token) {
                localStorage.setItem("authToken", result.access_token);
                console.log("access_token", result.access_token);
                window.location.href = "/manager";
            }
        } catch {
            setError("An error occurred. Please try again.");
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

