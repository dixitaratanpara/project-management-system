import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/projects.css";

function ProjectDetails() {

  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);


  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);

      // console.log(response.data);

      setProject(response.data.project);
    }
    catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load project"
      );
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchProject();

  }, [id]);

  //delete projects
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await api.delete(`/projects/${id}`);

      toast.success("Project deleted successfully");

      navigate("/projects");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message ||"Failed to delete project");
    }

  };
  if (loading) {

    return (
      <div className="projects-page">

        <div className="empty-state">

          <h3>
            Loading project...
          </h3>

          <p>
            Please wait while project details are loading.
          </p>

        </div>

      </div>
    );
  }


  // return (
  //   <div className="projects-page">

  //     {/* Header */}
  //     <header className="projects-header">

  //       <div>

  //         <p className="projects-label">
  //           Project Details
  //         </p>

  //         <h1>{project.name}</h1>

  //         <p className="projects-subtitle">
  //           View project information and details.
  //         </p>

  //       </div>

  //       <div className="project-header-actions">

  //         <Link
  //           to="/projects"
  //           className="cancel-project-btn"
  //         >
  //           Back to Projects
  //         </Link>

  //         <Link
  //           to={`/projects/${project._id}/members`}
  //           className="cancel-project-btn"
  //         >
  //           View Members
  //         </Link>


  //         <Link
  //           to={`/projects/edit/${project._id}`}
  //           className="create-project-btn"
  //         >
  //           Edit Project
  //         </Link>

  //       </div>

  //     </header>

  //     {/* Project Information */}
  //     <section className="projects-section">

  //       <div className="project-form-card">

  //         <div className="section-header">

  //           <div>

  //             <h2>Project Information</h2>

  //             <p>
  //               Details about this project.
  //             </p>

  //           </div>

  //         </div>

  //         <div className="project-details">

  //           {/* Project Name */}
  //           <div className="project-detail-item">

  //             <span>
  //               Project Name
  //             </span>

  //             <strong>
  //               {project.name}
  //             </strong>

  //           </div>

  //           {/* Description */}
  //           <div className="project-detail-item">

  //             <span>
  //               Description
  //             </span>

  //             <p>
  //               {project.description}
  //             </p>

  //           </div>

  //           {/* Status */}
  //           <div className="project-detail-item">

  //             <span>
  //               Status
  //             </span>

  //             <strong>
  //               {project.status}
  //             </strong>

  //           </div>

  //           {/* Created By */}
  //           <div className="project-detail-item">

  //             <span>
  //               Created By
  //             </span>

  //             <strong>
  //               {project.createdBy?.name || "Unknown"}
  //             </strong>

  //           </div>

  //           {/* Creator Email */}
  //           <div className="project-detail-item">

  //             <span>
  //               Creator Email
  //             </span>

  //             <strong>
  //               {project.createdBy?.email || "Not available"}
  //             </strong>

  //           </div>

  //         </div>

  //       </div>

  //     </section>

  //   </div>
  // );


  // Project not found
  if (!project) {
    return (
      <div className="projects-page">

        <div className="project-not-found">

          <div className="project-not-found-icon">
            !
          </div>

          <h3>Project not found</h3>

          <p>
            The project you are looking for does not exist
            or may have been removed.
          </p>

          <Link
            to="/projects"
            className="create-project-btn"
          >
            Back to Projects
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="projects-page">

      {/* ================================
          Header
      ================================= */}

      <header className="projects-header">

        <div>

          <p className="projects-label">
            Project Details
          </p>

          <h1>
            {project.name}
          </h1>

          <p className="projects-subtitle">
            View project information and details.
          </p>

        </div>


        <div className="project-header-actions">

          <Link
            to="/projects"
            className="cancel-project-btn"
          >
            Back to Projects
          </Link>


          <Link
            to={`/projects/${project._id}/members`}
            className="cancel-project-btn"
          >
            View Members
          </Link>


          <Link
            to={`/projects/edit/${project._id}`}
            className="create-project-btn"
          >
            Edit Project
          </Link>

          <button
            type="button"
            className="create-project-btn"
            onClick={handleDelete}
          >
            Delete Project
          </button>


        </div>

      </header>


      {/* ================================
          Project Information
      ================================= */}

      <section className="projects-section">

        <div className="project-form-card">

          <div className="section-header">

            <div>

              <h2>
                Project Information
              </h2>

              <p>
                Details about this project.
              </p>

            </div>

          </div>


          <div className="project-details">

            {/* Project Name */}

            <div className="project-detail-item">

              <span>
                Project Name
              </span>

              <strong>
                {project.name}
              </strong>

            </div>


            {/* Description */}

            <div className="project-detail-item">

              <span>
                Description
              </span>

              <p>
                {project.description || "No description available"}
              </p>

            </div>


            {/* Status */}

            <div className="project-detail-item">

              <span>
                Status
              </span>

              <strong className="project-detail-status">
                {project.status}
              </strong>

            </div>


            {/* Created By */}

            <div className="project-detail-item">

              <span>
                Created By
              </span>

              <strong>
                {project.createdBy?.name || "Unknown"}
              </strong>

            </div>


            {/* Creator Email */}

            <div className="project-detail-item">

              <span>
                Creator Email
              </span>

              <strong>
                {project.createdBy?.email || "Not available"}
              </strong>

            </div>

          </div>

        </div>

      </section>

      <br></br>
      {/* ================================
          Project Members
      ================================= */}

      <section className="projects-section">

        <div className="section-header">

          <div>

            <h2>
              Project Members
            </h2>

            <p>
              Manage users working on this project.
            </p>

          </div>
          <br></br>

          <Link
            to={`/projects/${project._id}/members`}
            className="create-project-btn"
          >
            View Members
          </Link>

        </div>


        <div className="project-feature-empty">

          <div className="project-feature-icon">
            U
          </div>

          <h3>
            Manage Project Members
          </h3>

          <p>
            View existing members or add new members
            to this project.
          </p>

          <Link
            to={`/projects/${project._id}/members`}
            className="empty-create-btn"
          >
            Manage Members
          </Link>

        </div>

      </section>

      <br></br>
      {/* ================================
          Project Tasks
      ================================= */}

      <section className="projects-section">

        <div className="section-header">

          <div>

            <h2>
              Project Tasks
            </h2>

            <p>
              Track tasks associated with this project.
            </p>

          </div>

          <br></br>
          <Link
            to={`/tasks/create?project=${project._id}`}
            className="create-project-btn"
          >
            + Create Task
          </Link>

        </div>


        <div className="project-feature-empty">

          <div className="project-feature-icon">
            ✓
          </div>

          <h3>
            Manage Project Tasks
          </h3>

          <p>
            Create and manage tasks associated
            with this project.
          </p>

          <Link
            to={`/tasks/create?project=${project._id}`}
            className="empty-create-btn"
          >
            Create Task
          </Link>

        </div>

      </section>

    </div>
  );
}

export default ProjectDetails;