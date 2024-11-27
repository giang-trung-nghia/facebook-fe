import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {List, ListItem, ListItemButton, ListItemText, styled} from '@mui/material';

type NavItem = {
  link: string;
  label: string;
};

interface FbNavListProps {
  items: NavItem[];
}

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px',
  margin: '0.25rem 0',
  '&.active': {
    backgroundColor: '#e8effa',
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const FbNavList: React.FC<FbNavListProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <StyledListItemButton
            className={location.pathname === item.link ? 'active' : ''}
            onClick={() => handleNavigation(item.link)}
          >
            <ListItemText primary={item.label} />
          </StyledListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

