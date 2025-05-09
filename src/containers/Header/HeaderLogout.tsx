import { LogoutOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../stores';

export const HeaderLogout: React.FC = () => {
  const { removeUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    removeUser();

    navigate('/login');
  }, [removeUser]);

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        fullWidth
        startIcon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
};
