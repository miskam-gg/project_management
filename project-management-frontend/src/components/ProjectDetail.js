import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import AddTask from './AddTask';
import TaskList from './TaskList';

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          params: { project: projectId },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchProject();
    fetchTasks();
  }, [projectId]);

  const handleTaskAdded = (task) => {
    setTasks([...tasks, task]);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>{project.name}</Typography>
        <Typography variant="body1" gutterBottom>{project.description}</Typography>
        <Button variant="contained" color="primary" component={Link} to={`/projects/${projectId}/edit`}>
          Edit Project
        </Button>
        <AddTask projectId={projectId} onTaskAdded={handleTaskAdded} />
        <TaskList tasks={tasks} />
      </Box>
    </Container>
  );
}

export default ProjectDetail;