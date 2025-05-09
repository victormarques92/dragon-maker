import { Box, List, Stack, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Contactitem } from '../../components';
import type { ContactDTO, OrderByTypesDTO } from '../../dtos';
import { sortByName } from '../../helpers';
import {
  useContactList,
  useContactSelected,
  useDrawer,
  useUser,
} from '../../stores';
import { DeleteContact } from './DeleteContact';
import { EditContact } from './EditContact';
import { FilterList } from './FilterList';
import { RegisterContact } from './RegisterContact';

export const ContactList: React.FC = () => {
  const { user } = useUser();
  const { contactList } = useContactList();
  const { currentContact, setCurrentContact } =
    useContactSelected();
  const { setOpenDrawer } = useDrawer();
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<OrderByTypesDTO>('asc');

  const filteredContacts = useMemo(() => {
    const query = search.trim().toUpperCase();

    const contacts = contactList.filter(
      contact => contact.createdBy === user?.id,
    );

    const filtered = contacts.filter(
      contact =>
        contact.name.toUpperCase().includes(query) ||
        contact.cpf.includes(search),
    );

    return sortByName(filtered, orderBy);
  }, [search, contactList, orderBy]);

  const handleSelect = useCallback(
    (contact: ContactDTO) => {
      setOpenDrawer(false);
      setCurrentContact(contact);
    },
    [setCurrentContact, setOpenDrawer],
  );

  const renderEmptyMessage = useCallback(
    () => (
      <Typography
        color="textSecondary"
        fontStyle="italic"
        textAlign="center"
      >
        {contactList.length === 0
          ? 'Lista vazia'
          : 'Nenhum contato encontrado'}
      </Typography>
    ),
    [contactList.length],
  );

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

          <FilterList
            search={search}
            onChangeSearch={setSearch}
            orderBy={orderBy}
            onChangeOrderBy={setOrderBy}
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
