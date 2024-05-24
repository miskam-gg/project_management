import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import AddProject from '../components/AddProject';
import ProjectList from '../components/ProjectList';

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/projects/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectAdded = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <AddProject onProjectAdded={handleProjectAdded} />
        <ProjectList projects={projects} />
      </Box>
    </Container>
  );
}

export default Dashboard;