import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function AddTask({ projectId, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('2'); // Default to Medium

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tasks/', {
        title,
        description,
        due_date: dueDate,
        priority,
        project: projectId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      onTaskAdded(response.data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('2');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h6" gutterBottom>Add New Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="1">Low</MenuItem>
            <MenuItem value="2">Medium</MenuItem>
            <MenuItem value="3">High</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Task
        </Button>
      </form>
    </Box>
  );
}

export default AddTask;