
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from "react-bootstrap"
import { Card, Tabs, ProgressBar } from 'react-bootstrap'

export default function ProjectWorkspace() {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { projectId } = useParams()

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`)
        setProject(response.data)
      } catch (error) {
        setError('Failed to fetch project details')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>
  if (error) return <div className="text-danger text-center">{error}</div>

  return (
    <div className="container mt-5">
      <Card className="mb-4">
        <Card.Header>
          <Card.Title as="h2">{project.title}</Card.Title>
          <Card.Text>{project.description}</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6 mb-2">
              <span className="me-2">Duration:</span>{project.duration}
            </div>
            <div className="col-md-6 mb-2">
              <span className="me-2">Team Size:</span>{project.teamSize} Members
            </div>
            <div className="col-md-6 mb-2">
              <span className="me-2">Status:</span>{project.status}
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="w-100">
            <div className="d-flex justify-content-between mb-2">
              <span>Progress</span>
              <span>75%</span>
            </div>
            <ProgressBar now={75} />
          </div>
        </Card.Footer>
      </Card>

      <Tabs defaultActiveKey="overview" className="mb-3">
        <Tabs.Tab eventKey="overview" title="Overview">
          <Card>
            <Card.Header>
              <Card.Title>Project Overview</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>{project.description}</p>
              
            </Card.Body>
          </Card>
        </Tabs.Tab>
        <Tabs.Tab eventKey="tasks" title="Tasks">
          <Card>
            <Card.Header>
              <Card.Title>Tasks</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul className="list-group">
                {['Research', 'Design', 'Development', 'Testing'].map((task, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {task}
                    <Button variant="outline-primary" size="sm">View</Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Tabs.Tab>
        <Tabs.Tab eventKey="files" title="Files">
          <Card>
            <Card.Header>
              <Card.Title>Project Files</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul className="list-group">
                {['Project Plan.pdf', 'Design Mockups.zip', 'Requirements.docx'].map((file, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {file}
                    <Button variant="outline-primary" size="sm">Download</Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Tabs.Tab>
        <Tabs.Tab eventKey="discussions" title="Discussions">
          <Card>
            <Card.Header>
              <Card.Title>Discussions</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul className="list-group">
                {['Kickoff Meeting Notes', 'Design Review Feedback', 'Sprint Planning'].map((topic, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {topic}
                    <Button variant="outline-secondary" size="sm">View Thread</Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className="w-100">Start New Discussion</Button>
            </Card.Footer>
          </Card>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}
