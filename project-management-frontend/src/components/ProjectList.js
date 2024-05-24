import React from 'react';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

function ProjectList({ projects }) {
  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project.id} disablePadding>
          <ListItemButton component={Link} to={`/projects/${project.id}`}>
            <ListItemText primary={project.name} secondary={project.description} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default ProjectList;