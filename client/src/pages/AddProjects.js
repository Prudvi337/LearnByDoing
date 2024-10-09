import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [duration, setDuration] = useState('');
  const [roles, setRoles] = useState(['']); // Initial role as an empty string
  const [status, setStatus] = useState('upcoming');
  const [projects, setProjects] = useState([]); // To store existing projects
  const [editMode, setEditMode] = useState(false); // To track if in edit mode
  const [currentProjectId, setCurrentProjectId] = useState(null); // To track current editing project
  const [visibleCount, setVisibleCount] = useState(1); // Initial count of visible projects

  useEffect(() => {
    fetchProjects(); // Fetch projects on component mount
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch projects. Please try again.');
    }
  };

  const handleAddRole = () => {
    setRoles([...roles, '']); // Add an empty role input
  };

  const handleRoleChange = (index, value) => {
    const newRoles = [...roles];
    newRoles[index] = value;
    setRoles(newRoles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        title,
        description,
        teamSize: parseInt(teamSize), // Convert to integer
        duration,
        roles: roles.filter(role => role !== ''), // Filter out empty roles
        status,
      };

      if (editMode) {
        // Update project
        await axios.put(`http://localhost:5000/api/projects/${currentProjectId}`, projectData);
        toast.success('Project updated successfully!');
      } else {
        // Add new project
        await axios.post('http://localhost:5000/api/projects', projectData);
        toast.success('Project added successfully!');
      }

      // Clear the form after successful submission
      resetForm();
      fetchProjects(); // Fetch updated projects list
    } catch (error) {
      toast.error('Failed to save project. Please try again.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTeamSize('');
    setDuration('');
    setRoles(['']);
    setStatus('upcoming');
    setEditMode(false);
    setCurrentProjectId(null);
  };

  const handleEdit = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setTeamSize(project.teamSize.toString()); // Convert number to string
    setDuration(project.duration);
    setRoles(project.roles);
    setStatus(project.status);
    setEditMode(true);
    setCurrentProjectId(project._id); // Set the project ID for editing
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
        toast.success('Project deleted successfully!');
        fetchProjects(); // Refresh the project list
      } catch (error) {
        toast.error('Failed to delete project. Please try again.');
      }
    }
  };

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5); // Increase the count of visible projects
  };

  return (
    <div className="container mt-4">
      <h2>{editMode ? 'Update Project' : 'Add New Project'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTeamSize">
          <Form.Label>Team Size</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter team size"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDuration">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formRoles">
          <Form.Label>Roles</Form.Label>
          {roles.map((role, index) => (
            <Form.Control
              key={index}
              type="text"
              placeholder={`Enter role #${index + 1}`}
              value={role}
              onChange={(e) => handleRoleChange(index, e.target.value)}
              required
            />
          ))}
          <Button variant="secondary" onClick={handleAddRole} className="mt-2">
            Add Role
          </Button>
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="upcoming">Upcoming</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 w-25">
          {editMode ? 'Update Project' : 'Add Project'}
        </Button>
      </Form>

      <h3 className="mt-4">Existing Projects</h3>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Team Size</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, visibleCount).map((project) => (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.teamSize}</td>
                  <td>{project.duration}</td>
                  <td>{project.status}</td>
                  <td>
                    <Button 
                      variant="dark" 
                      onClick={() => handleEdit(project)} 
                      className="mr-2"
                      style={{ padding: '5px 10px', marginRight: '5px' }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger"
                      className="my-2"
                      onClick={() => handleDelete(project._id)}
                      style={{ padding: '5px 10px' }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visibleCount < projects.length && (
            <Button variant="dark" onClick={handleShowMore} className="mt-3 w-25">
              Show More
            </Button>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default AddProject;
