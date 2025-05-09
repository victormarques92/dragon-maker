import { ContactsOutlined } from '@mui/icons-material';
import {
  Box,
  Drawer,
  Fab,
  Grid,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useCallback } from 'react';
import { ContactList, Map } from '../../containers';
import { BaseLayout } from '../../layouts';
import { useContactSelected, useDrawer } from '../../stores';

export const Contacts: React.FC = () => {
  const { breakpoints } = useTheme();
  const { currentContact } = useContactSelected();
  const { openDrawer, setOpenDrawer } = useDrawer();

  const breakpointUpMd = useMediaQuery(breakpoints.up('md'));

  const handleOpenDrawer = useCallback(
    () => setOpenDrawer(true),
    [],
  );

  const handleCloseDrawer = useCallback(
    () => setOpenDrawer(true),
    [],
  );

  return (
    <BaseLayout>
      <Grid container sx={{ height: 'calc(100vh - 76px)' }}>
        {breakpointUpMd && (
          <Grid
            size={{ xs: 12, md: 5, lg: 4 }}
            sx={{ overflow: 'hidden' }}
          >
            <Box sx={{ overflowY: 'auto' }}>
              <ContactList />
            </Box>
          </Grid>
        )}

        <Grid size={{ xs: 'grow' }}>
          <Map
            lat={currentContact?.lat}
            lng={currentContact?.lng}
          />

          {!breakpointUpMd && (
            <>
              <Tooltip title="Lista de contatos" arrow>
                <Box position="fixed" right={10} bottom={180}>
                  <Fab
                    color="primary"
                    size="small"
                    onClick={handleOpenDrawer}
                  >
                    <ContactsOutlined fontSize="small" />
                  </Fab>
                </Box>
              </Tooltip>

              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={handleCloseDrawer}
              >
                <Box minWidth={375}>
                  <ContactList />
                </Box>
              </Drawer>
            </>
          )}
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
