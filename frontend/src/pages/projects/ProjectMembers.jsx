import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/projects.css";

function ProjectMembers() {

  const { id } = useParams();

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  // const handleRemoveMember = async (userId) => {

  //   try {

  //     const response = await api.delete(
  //       `/projects/${id}/members`,
  //       {
  //         data: {
  //           userId,
  //         },
  //       }
  //     );

  //     console.log(response.data);

  //     toast.success(
  //       response.data.message ||
  //       "Member removed successfully"
  //     );

  //     setMembers((currentMembers) =>
  //       currentMembers.filter(
  //         (member) => member._id !== userId
  //       )
  //     );

  //   }
  //   catch (error) {

  //     console.log(error);

  //     toast.error(
  //       error.response?.data?.message ||
  //       "Failed to remove member"
  //     );

  //   }

  // };

  const fetchMembers = async () => {

      try {

        const response = await api.get(`/projects/${id}/members`);

        setMembers(response.data.members);

      }
      catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message ||"Failed to load project members"
        );

      }
      finally {

        setLoading(false);

      }
    };

    useEffect(()=>{
      fetchMembers();
    },[id]);

//loding
  if (loading) {
    return (
      <div className="projects-page">
        <div className="empty-state">

          <h3>
            Loading members...
          </h3>

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
  //           Project
  //         </p>

  //         <h1>
  //           Project Members
  //         </h1>

  //         <p className="projects-subtitle">
  //           Manage members assigned to this project.
  //         </p>

  //       </div>
  //       <div className="project-header-actions">
  //         <Link
  //           to={`/projects/${id}`}
  //           className="cancel-project-btn"
  //         >
  //           Back to Project
  //         </Link>

  //         <Link
  //           to={`/projects/${id}/members/add`}
  //           className="create-project-btn"
  //         >
  //           + Add Member
  //         </Link>


  //       </div>


  //     </header>

  //     {/* Members Section */}
  //     <section className="projects-section">

  //       <div className="section-header">

  //         <div>

  //           <h2>
  //             Team Members
  //           </h2>

  //           <p>
  //             Users currently assigned to this project.
  //           </p>

  //         </div>

  //       </div>

  //       {members.length === 0 ? (

  //         <div className="empty-state">

  //           <div className="empty-icon">
  //             U
  //           </div>

  //           <h3>
  //             No members yet
  //           </h3>

  //           <p>
  //             No users have been added to this project.
  //           </p>

  //         </div>

  //       ) : (

  //         <div className="projects-grid">

  //           {members.map((member) => (

  //             <div
  //               className="project-card"
  //               key={member._id}
  //             >

  //               <div className="project-card-header">

  //                 <h3>
  //                   {member.name}
  //                 </h3>

  //               </div>

  //               <p className="project-description">
  //                 {member.email}
  //               </p>

  //               <button
  //                 type="button"
  //                 onClick={() => handleRemoveMember(member._id)}
  //               >
  //                 Remove
  //               </button>

  //             </div>

  //           ))}

  //         </div>

  //       )}

  //     </section>

  //   </div>
  // );
 return (
    <div className="projects-page">

      {/* ================================
          Header
      ================================= */}

      <header className="projects-header">

        <div>

          <p className="projects-label">
            Project Members
          </p>

          <h1>
            Team Members
          </h1>

          <p className="projects-subtitle">
            View and manage members of this project.
          </p>

        </div>


        <div className="project-header-actions">

          <Link
            to={`/projects/${id}`}
            className="cancel-project-btn"
          >
            Back to Project
          </Link>


          <Link
            to={`/projects/${id}/members/add`}
            className="create-project-btn"
          >
            + Add Member
          </Link>

        </div>

      </header>


      {/* ================================
          Members Section
      ================================= */}

      <section className="projects-section">

        <div className="section-header">

          <div>

            <h2>
              Project Members
            </h2>

            <p>
              Users currently working on this project.
            </p>

          </div>

        </div>


        {/* No Members */}

        {members.length === 0 ? (

          <div className="project-feature-empty">

            <div className="project-feature-icon">
              U
            </div>

            <h3>
              No members yet
            </h3>

            <p>
              Add team members to start collaborating
              on this project.
            </p>

            <Link
              to={`/projects/${id}/members/add`}
              className="empty-create-btn"
            >
              + Add Member
            </Link>

          </div>

        ) : (

          /* Members List */

          <div className="members-list">

            {members.map((member) => (

              <div
                className="member-card"
                key={member._id}
              >

                <div className="member-avatar">
                  {member.name?.charAt(0).toUpperCase()}
                </div>


                <div className="member-info">

                  <h3>
                    {member.name}
                  </h3>

                  <p>
                    {member.email}
                  </p>

                </div>


                <div className="member-role">

                  <span>
                    {member.role || "Member"}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default ProjectMembers;