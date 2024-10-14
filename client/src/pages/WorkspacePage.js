// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const WorkspacePage = () => {
//     const { projectId } = useParams(); // Get the projectId from the URL
//     const [projectData, setProjectData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProjectData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setProjectData(data);
//             } catch (error) {
//                 console.error("Error fetching project data:", error);
//                 setError(error.message);
//             }
//         };

//         fetchProjectData();
//     }, [projectId]);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!projectData) {
//         return <div>Loading...</div>; // Loading state
//     }

//     return (
//         <div>
//             <h1>{projectData.title}</h1>
//             <p>{projectData.description}</p>
//             {/* Render other project details as needed */}
//         </div>
//     );
// };

// export default WorkspacePage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const WorkspacePage = () => {
    const { projectId } = useParams(); // Get the projectId from the URL
    const [projectData, setProjectData] = useState(null);
    const [error, setError] = useState(null);
    const [showIntroduction, setShowIntroduction] = useState(false); // State to toggle introduction content
    const [showProjectPlan, setShowProjectPlan] = useState(false); // State to toggle project plan PDF

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProjectData(data);
            } catch (error) {
                console.error("Error fetching project data:", error);
                setError(error.message);
            }
        };

        fetchProjectData();
    }, [projectId]);

    const handleShowIntroduction = () => {
        setShowIntroduction(!showIntroduction); // Toggle introduction section visibility
    };

    const handleShowProjectPlan = () => {
        setShowProjectPlan(!showProjectPlan); // Toggle project plan PDF visibility
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!projectData) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 bg-light p-3">
                    <h3>Project Details</h3>
                    <ul className="nav flex-column my-2">
                        <li className="nav-item">
                            {/* Show/Hide Introduction on click */}
                            <button className="nav-link btn btn-link" onClick={handleShowIntroduction}>
                                Introduction
                            </button>
                        </li>
                        <li className="nav-item my-2">
                            {/* Show/Hide Project Plan PDF on click */}
                            <button className="nav-link btn btn-link" onClick={handleShowProjectPlan}>
                                Project Plan
                            </button>
                        </li>
                        <li className="nav-item my-2">
                            {/* Team Meeting Button */}
                            {projectData.meetingLink ? ( // Check if the meeting link exists
                                <a
                                    href={projectData.meetingLink}
                                    className="nav-link btn btn-primary"
                                    target="_blank" // Open in a new tab
                                    rel="noopener noreferrer"
                                >
                                    Join Team Meeting
                                </a>
                            ) : (
                                <button className="nav-link btn btn-secondary" disabled>
                                    No Meeting Link Available
                                </button>
                            )}
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-9 p-4">
                    <h1 className='text-center'>{projectData.title}</h1>
                    <hr />

                    {/* Conditionally render Project Introduction */}
                    {showIntroduction && (
                        <div id="introduction" className="mb-5">
                            <h2>Project Introduction</h2>
                            <p>{projectData.description}</p> {/* Show project introduction when toggled */}
                        </div>
                    )}

                    {/* Conditionally render Project Plan PDF */}
                    {showProjectPlan && projectData.planPDF && (
                        <div id="plan" className="mb-5">
                            <h2>Project Plan</h2>
                            <iframe
                                src={projectData.projectPlanPDF} // Assuming the PDF link is stored in `projectData.planPDF`
                                width="100%"
                                height="500px"
                                title="Project Plan PDF"
                            ></iframe>
                        </div>
                    )}

                    {!projectData.planPDF && showProjectPlan && (
                        <p>No project plan PDF available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkspacePage;
