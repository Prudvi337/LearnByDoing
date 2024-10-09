import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spinner, Modal, Form } from 'react-bootstrap';
import './projectsPage.css';

export default function EnhancedProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleJoinProject = (project) => {
    setSelectedProject(project);
    setSelectedRole(project.roles[0]); // Default to the first role
    setShowModal(true); // Open the modal
  };

  const getStatusClass = (status) => {
    const lowercasedStatus = status.toLowerCase();
    switch (lowercasedStatus) {
      case 'upcoming':
        return 'btn-primary'; // Blue for upcoming
      case 'in-progress':
        return 'btn-warning'; // Orange for in-progress
      case 'completed':
        return 'btn-success'; // Green for completed
      default:
        return 'btn-secondary'; // Grey for unknown status
    }
  };

  const handleReadMore = (project) => {
    setExpandedProject(expandedProject === project ? null : project); // Toggle expand/collapse
  };

  const DESCRIPTION_LIMIT = 20;

  if (loading) return <div><Spinner animation="border" /></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {projects.map((project) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={project._id}>
            <div className="card mb-3">
              <div className="card-body">
                <p>
                  <span className={`btn ${getStatusClass(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </p>
                <h5 className="card-title">
                  <i className="bi bi-file-earmark-text"></i> {project.title}
                </h5>
                <p className="card-text">
                  {expandedProject === project 
                    ? project.description 
                    : `${project.description.substring(0, DESCRIPTION_LIMIT)}${project.description.length > DESCRIPTION_LIMIT ? '...' : ''}`
                  }
                  {project.description.length > DESCRIPTION_LIMIT && (
                    <a href="#" onClick={() => handleReadMore(project)}>
                      {expandedProject === project ? ' Show Less' : ' Read More'}
                    </a>
                  )}
                </p>
                <p className="card-text">Team Size: {project.teamSize} Members</p>
                <p className="card-text">Duration: {project.duration}</p>
                <span>
                  {project.roles.map((role, roleIndex) => (
                    <span className="badge bg-black mx-2 my-1" key={roleIndex}>
                      {role}
                    </span>
                  ))}
                </span>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <button className="btn btn1" onClick={() => handleJoinProject(project)}>
                  <i className="bi bi-check-circle-fill"></i> Join Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for role selection */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join {selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Select your role:</Form.Label>
            {selectedProject?.roles.map((role, index) => (
              <Form.Check
                type="radio"
                key={index}
                label={role}
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            console.log('Joined project', selectedProject.title, 'as', selectedRole);
            setShowModal(false);
          }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
