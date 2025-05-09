import { Avatar, Menu, Stack, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useUser } from '../../stores';
import { HeaderDeleteAccount } from './HeaderDeleteAccount';
import { HeaderLogout } from './HeaderLogout';

export const HeaderAccount: React.FC = () => {
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const open = Boolean(anchorEl);

  const nameInitial = useMemo(() => {
    return user?.name?.charAt(0).toUpperCase();
  }, [user?.name]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Avatar
        sx={{
          bgcolor: theme => theme.palette.primary.main,
          cursor: 'pointer',
          fontWeight: 700,
        }}
        onClick={handleClick}
      >
        {nameInitial}
      </Avatar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          spacing={3}
          px={3}
          pt={3}
          pb={1}
          minWidth={272}
        >
          <Stack
            direction="column"
            alignItems="center"
            spacing={1}
          >
            <Avatar
              sx={{
                bgcolor: theme => theme.palette.primary.main,
                width: 88,
                height: 88,
                fontSize: 40,
                fontWeight: 700,
              }}
              alt={user?.name}
            >
              {nameInitial}
            </Avatar>

            <Stack direction="column" alignItems="center">
              <Typography variant="h6" fontWeight={600} mt={2}>
                {user?.name}
              </Typography>

              <Typography variant="body2">
                {user?.email}
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={1} width="100%">
            <HeaderDeleteAccount />

            <HeaderLogout />
          </Stack>
        </Stack>
      </Menu>
    </>
  );
};
