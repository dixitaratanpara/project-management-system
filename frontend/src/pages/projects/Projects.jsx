import { useEffect, useState } from "react";
import "../../style/projects.css";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function Projects() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // const handleDelete = async (id) => {

    //     const confirmDelete = window.confirm(
    //         "Are you sure you want to delete this project?"
    //     );

    //     if (!confirmDelete) {
    //         return;
    //     }

    //     try {
    //         const response = await api.delete(`/projects/${id}`);

    //         console.log(response.data);

    //         toast.success(
    //             response.data.message ||
    //             "Project deleted successfully"
    //         );

    //         setProjects((currentProjects) =>
    //             currentProjects.filter(
    //                 (project) => project._id !== id
    //             )
    //         );
    //     }
    //     catch (error) {
    //         console.log(error);

    //         toast.error(
    //             error.response?.data?.message ||
    //             "Failed to delete project"
    //         );
    //     }
    // };

    //get all projects
    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects");

            console.log(response.data);

            setProjects(response.data.projects || []);
        } catch (error) {
            // console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to load projects"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);



    return (
        <div className="projects-page">

            {/* Header */}
            <header className="projects-header">

                <div>
                    <p className="projects-label">
                        Workspace
                    </p>

                    <h1>Projects</h1>

                    <p className="projects-subtitle">
                        Manage and track all your projects in one place.
                    </p>
                </div>
                <div>
                    {(user?.role === "admin" || user?.role === "manager") && (
                        <Link
                            to="/projects/create"
                            className="create-project-btn"
                        >
                            + Create Project
                        </Link>
                    )}

                    &nbsp;&nbsp;&nbsp;
                    <button
                        type="button"
                        className="cancel-task-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>


                </div>



            </header>

            {/* Projects Section */}
            <section className="projects-section">

                <div className="section-header">

                    <div>
                        <h2>All Projects</h2>

                        <p>
                            View and manage your active projects.
                        </p>
                    </div>

                </div>

                {/* //loding state */}
                {loading ? (

                    <div className="projects-empty">

                        <div className="projects-empty-icon">
                            ...
                        </div>

                        <h3>Loading projects...</h3>

                        <p>
                            Please wait while we load your projects.
                        </p>

                    </div>

                ) : projects.length === 0 ? (
                    //empty state
                    <div className="projects-empty">

                        <div className="projects-empty-icon">
                            P
                        </div>

                        <h3>No projects yet</h3>

                        <p>
                            Create your first project to start managing your work and team.
                        </p>
                        {(user?.role === "admin" || user?.role === "manager") && (
                            <Link
                                to="/projects/create"
                                className="empty-create-btn"
                            >
                                Create Your First Project
                            </Link>
                        )}
                    </div>

                ) : (
                    //project list
                    <div className="projects-grid">

                        {projects.map((project) => (

                            <div
                                className="project-card"
                                key={project._id}
                            >

                                <div className="project-card-top">

                                    <div>
                                        <h3>{project.name}</h3>

                                        <p>
                                            {project.description}
                                        </p>
                                    </div>

                                    <span className="project-status">
                                        {project.status}
                                    </span>

                                </div>

                                <div className="project-card-footer">

                                    <span>
                                        Created by {project.createdBy?.name || "User"}
                                    </span>

                                    <Link
                                        to={`/projects/${project._id}`}
                                    >
                                        View Project →
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default Projects;