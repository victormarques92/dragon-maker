import { DeleteOutline } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from '../../components';
import type { ContactDTO } from '../../dtos';
import { useContactList } from '../../stores';

interface Props {
  contact: ContactDTO;
}

export const DeleteContact: React.FC<Props> = ({ contact }) => {
  const { removeContact } = useContactList();
  const [openModal, setOpenModal] = useState(false);

  const contactName = useMemo(
    () => contact.name || 'este contato',
    [contact.name],
  );
  const contactId = useMemo(
    () => contact.id ?? '',
    [contact.id],
  );

  const handleOpenModal = useCallback(
    () => setOpenModal(true),
    [],
  );
  const handleCloseModal = useCallback(
    () => setOpenModal(false),
    [],
  );

  const handleDelete = () => {
    if (!contactId) return;

    removeContact(contactId);
    handleCloseModal();

    toast({
      status: 'success',
      message: `O contato ${contactName} foi removido com sucesso.`,
    });
  };

  return (
    <>
      <Tooltip title="Remover" arrow>
        <IconButton color="error" onClick={handleOpenModal}>
          <DeleteOutline />
        </IconButton>
      </Tooltip>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Remover contato</DialogTitle>

        <DialogContent dividers>
          <DialogContentText mb={3}>
            Deseja remover o contato {contact.name}?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={handleCloseModal}>
            Cancelar
          </Button>

          <Button
            variant="text"
            color="error"
            onClick={handleDelete}
          >
            Remover contato
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
