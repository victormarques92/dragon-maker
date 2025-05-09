import { EditOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import type { ContactDTO } from '../../dtos';
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

interface Props {
  initialValues: ContactDTO;
}

export const EditContact: React.FC<Props> = ({
  initialValues,
}) => {
  const { editContact } = useContactList();
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
    editContact(data);

    setCurrentContact(data);

    handleCloseModal();

    setOpenDrawer(false);
  };

  return (
    <>
      <Tooltip title="Editar" arrow>
        <IconButton color="primary" onClick={handleOpenModal}>
          <EditOutlined />
        </IconButton>
      </Tooltip>

      <FormDialog
        title="Editar contato"
        initialValues={initialValues}
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
      />
    </>
  );
};
