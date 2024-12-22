import { Component, ErrorInfo } from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
