import {
  Alert,
  AlertTitle,
  type AlertColor,
} from '@mui/material';
import { toast as hotToast } from 'react-hot-toast';

interface ToastProps {
  status: AlertColor;
  title?: string;
  message: string;
}

export const ToastAlert: React.FC<ToastProps> = ({
  status,
  title,
  message,
}) => {
  return (
    <Alert onClose={() => hotToast.remove()} severity={status}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};
