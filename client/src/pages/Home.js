import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import './Home.css';
const Home = ({ isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState('groupProjects');
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Welcome To LearningByDoing Platform';
  
  useEffect(() => {
  
    const typeText = () => {
      for (let i = 0; i < fullText.length; i++) {
        setTimeout(() => {
          setDisplayedText(prevText => prevText + fullText.charAt(i));
        }, i * 150);
      }
    };
  
    typeText();
  
    return () => {};
  }, [fullText]); // Add displayedText to the dependency array
const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Build a full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
      roles: ['Frontend Developer', 'Backend Developer', 'UI/UX Designer'],
      duration: '8 weeks',
      teamSize: '4-6 members',
    },
    {
      title: 'Real-time Chat Application',
      description: 'Develop a real-time chat application with features like group chats, file sharing, and end-to-end encryption.gddsg',
      roles: ['Frontend Developer', 'Backend Developer', 'DevOps Engineer'],
      duration: '6 weeks',
      teamSize: '3-5 members',
    },
    {
      title: 'Task Management System',
      description: 'Create a collaborative task management system with real-time updates, user roles, and analytics dashboard.',
      roles: ['Frontend Developer', 'Backend Developer', 'Database Specialist'],
      duration: '7 weeks',
      teamSize: '4-5 members',
    },
  ];

  const courses = [
    {
      title: 'Collaborative Development Fundamentals',
      description: 'Learn the basics of version control, agile methodologies, and team communication tools.',
      duration: '4 weeks',
      prereq: 'Basic programming knowledge',
    },
    {
      title: 'Full-Stack Web Development',
      description: 'Master both frontend and backend technologies to become a versatile team member.',
      duration: '12 weeks',
      prereq: 'HTML, CSS, and JavaScript basics',
    },
    {
      title: 'DevOps and Continuous Integration',
      description: 'Learn to streamline development processes and improve team productivity.',
      duration: '8 weeks',
      prereq: 'Experience with web development',
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleJoinProject = (project) => {
    if (!isLoggedIn) {
      toast.error('You must be logged in to join a project!');
      return;
    }
    toast.error(`Go to the project Section`);
  };

  const handleEnroll = (course) => {
    if (!isLoggedIn) {
      toast.error('You must be logged in to enroll in a course!');
      return;
    }
    toast.success(`You have enrolled in the ${course.title}!`);
  };

  return (
    <main>
      <div className="bg-light text-center py-5 home">
        <div className="container">
          <h1 className="display-4 text-wrap" style={{ whiteSpace: 'pre' }}>
            {displayedText}
          </h1>
        
          <p className="lead">
            Join a team, choose your role, and gain practical skills by working on real-world projects. 
            Collaborate with peers, learn different aspects of development, and build a portfolio that stands out.
          </p>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Learn by Collaborating on Real Projects</h2>
        <ul className="nav nav-tabs justify-content-center mb-4">
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'groupProjects' ? 'active' : ''}`} 
              onClick={() => handleTabChange('groupProjects')}
              href="#groupProjects"
            >
              <i className="bi bi-people-fill"></i> Group Projects
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'skillCourses' ? 'active' : ''}`} 
              onClick={() => handleTabChange('skillCourses')}
              href="#skillCourses"
            >
              <i className="bi bi-journal-text"></i> Skill Courses
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className={`tab-pane fade ${activeTab === 'groupProjects' ? 'show active' : ''}`} id="groupProjects">
            <div className="row">
              {projects.map((project, index) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                  <div className="card ">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-file-earmark-text"></i> {project.title}
                      </h5>
                      <p className="card-text">{project.description}</p>
                      <p className="card-text">Team Size: {project.teamSize}</p>
                      <p className="card-text">Duration: {project.duration}</p>
                      <div>
                        {project.roles.map((role, roleIndex) => (
                          <span className="badge badge-secondary  text-bg-dark mx-2 my-2 p-2" key={roleIndex}>{role}</span>
                        ))}
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn1" onClick={() => handleJoinProject(project)}>
                        <i className="bi bi-check-circle-fill"></i> Join Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'skillCourses' ? 'show active' : ''}`} id="skillCourses">
            <div className="row">
              {courses.map((course, index) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-journal-bookmark"></i> {course.title}
                      </h5>
                      <p className="card-text">{course.description}</p>
                      <p className="card-text">Duration: {course.duration}</p>
                      <p className="card-text">Prerequisites: {course.prereq}</p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn1" onClick={() => handleEnroll(course)}>
                        <i className="bi bi-check-circle-fill"></i> Enroll
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light text-center py-5">
        <div className="container">
          <h2 className="mb-4">Start Collaborating Today</h2>
          <p className="lead">
            Join a community of learners and professionals. Work on real projects, learn from peers, 
            and build a portfolio that showcases your ability to work in a team.
          </p>
          <button className="btn btn1">
            <i className="bi bi-search"></i> Find Your Team
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Home;
