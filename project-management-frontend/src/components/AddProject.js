import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

function AddProject({ onProjectAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/projects/', {
        name,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      onProjectAdded(response.data);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h6" gutterBottom>Add New Project</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Project
        </Button>
      </form>
    </Box>
  );
}

export default AddProject;