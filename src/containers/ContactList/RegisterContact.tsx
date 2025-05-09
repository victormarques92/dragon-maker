import { PersonAddAltOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  useContactList,
  useContactSelected,
  useDrawer,
} from '../../stores';
import { FormDialog } from '../FormDialog';

interface FormValues {
  address: string;
  cep: string;
  cpf: string;
  lat: number;
  lng: number;
  name: string;
  phone: string;
}

export const RegisterContact: React.FC = () => {
  const { setNewContact } = useContactList();
  const { setCurrentContact } = useContactSelected();
  const { setOpenDrawer } = useDrawer();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(
    () => setOpenModal(true),
    [],
  );
  const handleCloseModal = useCallback(
    () => setOpenModal(false),
    [],
  );

  const onSubmit: SubmitHandler<FormValues> = data => {
    const newContact = { ...data, id: uuidv4() };

    setNewContact(newContact);

    setCurrentContact(newContact);

    handleCloseModal();

    setOpenDrawer(false);
  };

  return (
    <>
      <Tooltip title="Adicionar usuário" arrow>
        <IconButton color="primary" onClick={handleOpenModal}>
          <PersonAddAltOutlined />
        </IconButton>
      </Tooltip>

      <FormDialog
        title="Adicionar contato"
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
      />
    </>
  );
};
