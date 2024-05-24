import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) return <div>Loading...</div>;

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>{task.title}</Typography>
        <Typography variant="body1" gutterBottom>{task.description}</Typography>
        <Typography variant="body2" gutterBottom>Status: {task.status}</Typography>
        <Typography variant="body2" gutterBottom>Priority: {task.priority}</Typography>
        <Typography variant="body2" gutterBottom>Due Date: {task.due_date}</Typography>
        <Button variant="contained" color="primary" component={Link} to={`/tasks/${taskId}/edit`}>
          Edit Task
        </Button>
      </Box>
    </Container>
  );
}

export default TaskDetail;