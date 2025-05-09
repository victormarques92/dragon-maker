import {
  AssignmentIndOutlined,
  LocalPhoneOutlined,
  PersonOutline,
} from '@mui/icons-material';
import {
  Avatar,
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import React, { type ReactNode } from 'react';
import type { ContactDTO } from '../../dtos';
import { formatCPF } from '../../helpers';

interface Props {
  contact: ContactDTO;
  isSelected: boolean;
  actions?: ReactNode;
  onSelect: (contact: ContactDTO) => void;
}

export const Contactitem: React.FC<Props> = ({
  contact,
  isSelected,
  actions,
  onSelect,
}) => {
  return (
    <ListItem disablePadding secondaryAction={actions}>
      <ListItemButton
        sx={{
          borderRadius: 1,
          border: theme =>
            `1px solid ${theme.palette.grey[200]}`,
        }}
        selected={isSelected}
        alignItems="flex-start"
        onClick={() => onSelect(contact)}
      >
        <ListItemIcon>
          <Avatar>
            <PersonOutline />
          </Avatar>
        </ListItemIcon>

        <ListItemText
          primary={contact.name}
          secondary={
            <>
              <Stack alignItems="flex-start" spacing={0.5}>
                <Chip
                  size="small"
                  icon={<AssignmentIndOutlined />}
                  label={formatCPF(contact.cpf)}
                />

                <Chip
                  size="small"
                  icon={<LocalPhoneOutlined />}
                  label={contact.phone}
                />
              </Stack>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
