
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spinner, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './projectsPage.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import quiz from '../components/quiz.json';

export default function EnhancedProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  const auth = getAuth(); // Firebase auth instance

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
        setFilteredProjects(response.data);
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
    setSelectedRole(project.roles[0]);
    setShowModal(true);
  };

  const fetchQuizQuestions = (role) => {
    const quizForRole = quiz.find((quizItem) => quizItem.role === role);
    if (quizForRole) {
      setQuizQuestions(quizForRole.questions);
    } else {
      setQuizQuestions([]); 
    }
  };

  const handleConfirmRole = () => {
    fetchQuizQuestions(selectedRole); 
    setShowQuizModal(true); 
    setShowModal(false); 
    setCurrentQuestionIndex(0);
  };

  const handleQuizChange = (answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuizSubmit = () => {
    const correctAnswers = quizQuestions.filter((question, index) => {
      const expectedAnswer = question?.correctAnswer?.trim().toLowerCase() || ""; 
      const userAnswer = userAnswers[index]?.trim().toLowerCase() || "";    
      return expectedAnswer === userAnswer; 
    }).length;

    if (correctAnswers >= 10) {
      setJoinedProjects([...joinedProjects, selectedProject._id]);
      setShowQuizModal(false); 
      setQuizSubmitted(true); 
      
      toast.success('You have successfully joined the project!');
      sendConfirmationEmail();
      // Call the function to send email using EmailJS and Firebase `currentUser`
      // sendEmail(selectedProject.title, selectedRole);
    } else {
      toast.error('You did not pass the quiz. Please try again.');
      setShowQuizModal(false);
    }
  };

   const sendConfirmationEmail = () => {
  const currentUser = auth.currentUser; // Get the current user details from Firebase Auth

  if (!currentUser) return;

  const emailParams = {
    to_name: currentUser.displayName || currentUser.email, // Get the name or email of the user
    user_email: currentUser.email, // User's email
    project_name: selectedProject.title, // Selected project name
    role_name: selectedRole, // Selected role
    project_duration: selectedProject.duration, // Added duration of the project
  };

  emailjs.send("service_0zt6x89","template_g9qzamj", emailParams,"A6EiiOCmBIte0AE5m")
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      toast.success('Confirmation email sent!');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      toast.error('Failed to send confirmation email.');
    });
};


  const getStatusClass = (status) => {
    const lowercasedStatus = status.toLowerCase();
    switch (lowercasedStatus) {
      case 'upcoming':
        return 'btn-primary';
      case 'in-progress':
        return 'btn-warning';
      case 'completed':
        return 'btn-success';
      default:
        return 'btn-secondary';
    }
  };

  const handleReadMore = (project) => {
    setExpandedProject(expandedProject === project ? null : project);
  };

  const handleViewProject = (projectId) => {
    navigate(`/project-workspace/${projectId}`);
  };

  const DESCRIPTION_LIMIT = 20;
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  };

  if (loading) return <div><Spinner animation="border" /></div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="container mt-4">
        <div className="row mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search projects by title or description..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
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
                  {joinedProjects.includes(project._id) ? (
                    <button className="btn btn-success" onClick={() => handleViewProject(project._id)}>
                      <i className="bi bi-eye-fill"></i> View Project
                    </button>
                  ) : (
                    <button className="btn btn1" onClick={() => handleJoinProject(project)}>
                      <i className="bi bi-check-circle-fill"></i> Join Project
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for role selection */}
        <Modal className="custom-modal" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Select Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirmRole}>Confirm Role</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for quiz */}
        <Modal className="custom-modal" show={showQuizModal} onHide={() => setShowQuizModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Role Quiz</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {quizQuestions.length > 0 ? (
              <>
                <p><strong>Question {currentQuestionIndex + 1}:</strong> {quizQuestions[currentQuestionIndex]?.question}</p>
                {quizQuestions[currentQuestionIndex]?.options.map((option, index) => (
                  <Form.Check
                    type="radio"
                    key={index}
                    label={option}
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={userAnswers[currentQuestionIndex] === option}
                    onChange={() => handleQuizChange(option)}
                  />
                ))}
              </>
            ) : (
              <p>No quiz available for this role.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            {currentQuestionIndex > 0 && <Button variant="secondary" onClick={handlePreviousQuestion}>Previous</Button>}
            {currentQuestionIndex < quizQuestions.length - 1 && <Button variant="primary" onClick={handleNextQuestion}>Next</Button>}
            {currentQuestionIndex === quizQuestions.length - 1 && <Button variant="success" onClick={handleQuizSubmit}>Submit Quiz</Button>}
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
}

