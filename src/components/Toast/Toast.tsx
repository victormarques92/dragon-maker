import type { AlertColor } from '@mui/material';
import { toast as hotToast } from 'react-hot-toast';
import { ToastAlert } from './ToastAlert';

interface ToastProps {
  status: AlertColor;
  title?: string;
  message: string;
  duration?: number;
}

export const toast = ({
  status,
  title,
  message,
  duration,
}: ToastProps) => {
  return hotToast.custom(
    <ToastAlert
      status={status}
      title={title}
      message={message}
    />,
    {
      duration,
    },
  );
};
