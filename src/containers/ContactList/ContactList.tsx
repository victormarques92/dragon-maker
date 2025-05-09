import {
  Box,
  List,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Contactitem } from '../../components';
import type { ContactDTO } from '../../dtos';
import {
  useContactList,
  useContactSelected,
  useDrawer,
} from '../../stores';
import { DeleteContact } from './DeleteContact';
import { EditContact } from './EditContact';
import { RegisterContact } from './RegisterContact';

export const ContactList: React.FC = () => {
  const { contactList } = useContactList();
  const { currentContact, setCurrentContact } =
    useContactSelected();
  const { setOpenDrawer } = useDrawer();
  const [search, setSearch] = useState('');

  const filteredContacts = useMemo(() => {
    const query = search.trim().toUpperCase();

    return contactList.filter(
      contact =>
        contact.name.toUpperCase().includes(query) ||
        contact.cpf.includes(search),
    );
  }, [search, contactList]);

  const handleSelect = useCallback((contact: ContactDTO) => {
    setOpenDrawer(false);
    setCurrentContact(contact);
  }, []);

  const renderEmptyMessage = () => {
    if (contactList.length === 0) {
      return (
        <Typography
          color="textSecondary"
          fontStyle="italic"
          textAlign="center"
        >
          Lista vazia
        </Typography>
      );
    }

    return (
      <Typography
        color="textSecondary"
        fontStyle="italic"
        textAlign="center"
      >
        Nenhum contato encontrado
      </Typography>
    );
  };

  return (
    <>
      <Box p={3} pt={0}>
        <Box
          bgcolor="white"
          pb={2}
          position="sticky"
          pt={3}
          top={0}
          zIndex={1}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h5" fontWeight={600}>
              Lista de contatos
            </Typography>

            <RegisterContact />
          </Stack>

          <TextField
            label="Filtrar por nome ou CPF"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </Box>

        {filteredContacts.length > 0 ? (
          <List component="nav" sx={{ display: 'grid', gap: 2 }}>
            {filteredContacts.map(contact => (
              <Contactitem
                key={contact.id}
                contact={contact}
                isSelected={currentContact?.id === contact.id}
                onSelect={handleSelect}
                actions={
                  <Stack direction="row" spacing={0.5}>
                    <EditContact initialValues={contact} />
                    <DeleteContact contact={contact} />
                  </Stack>
                }
              />
            ))}
          </List>
        ) : (
          renderEmptyMessage()
        )}
      </Box>
    </>
  );
};
