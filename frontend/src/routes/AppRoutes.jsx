import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />


                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />



                {/* <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>

                    }
                />

                <Route
                    path="/projects/create"
                    element={<CreateProject />}
                />

                <Route
                    path="/projects/:id"
                    element={<ProjectDetails />}
                />

                <Route
                    path="/projects/:id/edit"
                    element={<ProtectedRoute>
                        <EditProject />
                    </ProtectedRoute>}
                />

                <Route
                    path="/projects/:id/members"
                    element={<ProjectMembers />}
                />

                <Route
                    path="/projects/:id/members/add"
                    element={<AddMember />}
                />

                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <Tasks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks/create"
                    element={
                        <ProtectedRoute>
                            <CreateTask />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks/:id"
                    element={
                        <ProtectedRoute>
                            <TaskDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks/:id/edit"
                    element={
                        <ProtectedRoute>
                            <EditTask />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                /> */}

            </Routes>
        </BrowserRouter>
    );

}
export default AppRoutes;