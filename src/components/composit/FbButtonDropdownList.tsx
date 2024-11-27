import React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

type ActionItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
};

interface IconDropdownProps {
  icon?: React.ReactNode;
  actions: ActionItem[];
  onActionSelect: (key: string) => void;
}

export const FbButtonDropdownList: React.FC<IconDropdownProps> = ({ icon, actions, onActionSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (key: string) => {
    onActionSelect(key);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        {icon || <MoreVert />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {actions.map((action) => (
          <MenuItem key={action.key} onClick={() => handleActionClick(action.key)}>
            {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
