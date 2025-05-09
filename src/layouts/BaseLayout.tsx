import React, { type ReactNode } from 'react';
import { Header } from '../containers';

interface Props {
  children: ReactNode;
}

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      {children}
    </>
  );
};
