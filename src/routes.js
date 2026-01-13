import React from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import Layout from "./Layout/Layout";
import { Home, Login, SignupStepper, Dashboard } from "./Pages";


const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignupStepper /> },
    { path: "/sign-in", element: <Navigate to="/login" /> },
    { path: "/dashboard", element: <Dashboard /> },  
    {
        path: "/*",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [  
        ],
    },

    { path: "*", element: <Navigate to="/" /> },
];

export default routes;