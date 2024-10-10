
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spinner, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './projectsPage.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question
  const [userAnswers, setUserAnswers] = useState({}); 
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

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
    setCurrentQuestionIndex(0); // Start at the first question
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
    // Log the entire quizQuestions array to check the structure
    console.log('Quiz Questions:', quizQuestions);

    // Count the number of correct answers
    const correctAnswers = quizQuestions.filter((question, index) => {
        // Update to use correctAnswer instead of answer
        const expectedAnswer = question?.correctAnswer?.trim().toLowerCase() || ""; 
        const userAnswer = userAnswers[index]?.trim().toLowerCase() || "";    

        // Enhanced logging for debugging
        // console.log(`Question ${index + 1}: ${question?.question}`);
        // console.log(`Expected answer: "${expectedAnswer}", User answer: "${userAnswer}"`);

        // Compare after making both lowercase and trimming
        return expectedAnswer === userAnswer; 
    }).length;

    // console.log(`Total correct answers: ${correctAnswers}`);

    // Check if the user passed the quiz
    if (correctAnswers >= 10) {
        // Update the user's joined projects
        setJoinedProjects([...joinedProjects, selectedProject._id]); 

        // Close the quiz modal
        setShowQuizModal(false); 

        // Set quiz submitted status
        setQuizSubmitted(true); 
        
        // Show success message
        toast.success('You have successfully joined the project!');
    } else {
        // Show error message if the user did not pass the quiz
        toast.error('You did not pass the quiz. Please try again.');

        // Close the quiz modal
        setShowQuizModal(false);
    }
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
      // Filter projects based on title or description
      const filtered = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects); // Reset if search query is empty
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
          <Button variant="primary" onClick={handleConfirmRole}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for quiz */}
      <Modal className="custom-modal" show={showQuizModal} onHide={() => setShowQuizModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz for {selectedRole}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {quizQuestions.length > 0 ? (
            <>
              <Form.Group>
                <Form.Label>{quizQuestions[currentQuestionIndex].question}</Form.Label>
                {quizQuestions[currentQuestionIndex].options.map((option, optionIndex) => (
                  <Form.Check
                    key={optionIndex}
                    type="radio"
                    label={option}
                    name={`question-${currentQuestionIndex}`}
                    onChange={() => handleQuizChange(option)}
                    checked={userAnswers[currentQuestionIndex] === option}
                  />
                ))}
              </Form.Group>

              <div className="quiz-navigation mt-4 mx-2">
                {currentQuestionIndex > 0 && (
                  <Button variant="secondary" onClick={handlePreviousQuestion}>
                    Previous
                  </Button>
                )}
                {currentQuestionIndex < quizQuestions.length - 1 ? (
                  <Button variant="primary" onClick={handleNextQuestion}>
                    Next
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleQuizSubmit}>
                    Submit Quiz
                  </Button>
                )}
              </div>
            </>
          ) : (
            <p>No quiz available for this role.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQuizModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {quizSubmitted && <div>Your quiz has been submitted!</div>}
    </div>
    </>
  );
}

