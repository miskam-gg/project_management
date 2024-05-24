import React from 'react';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

function TaskList({ tasks }) {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} disablePadding>
          <ListItemButton component={Link} to={`/tasks/${task.id}`}>
            <ListItemText
              primary={task.title}
              secondary={`Status: ${task.status} | Priority: ${task.priority}`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;