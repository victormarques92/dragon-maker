import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../stores';

interface Props {
  children: ReactNode | ReactNode[];
}

export const PrivateRoute = ({ children }: Props) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
