import React from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";



const routes = [
    // Public Route
    { path: "/", element: <Home /> },
    { path: "/login", element: <Home /> },
    { path: "/sign-in", element: <Home /> },

    // Protected Routes
    {
        path: "/*", // Wildcard path for nested layout routes
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            { path: "dashboard", element: <Home /> },
            
        ],
    },

    { path: "*", element: <Navigate to="/" /> },
];

export default routes;