import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '../src/hooks/auth';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

const customRender = (ui: JSX.Element, options = {}) => {
  const Wrapper = ({ children }: any) => (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        {children}
      </AuthProvider>
    </BrowserRouter>
  );

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: Wrapper,
    }),
  };
};

export * from '@testing-library/react';
export { customRender as render };
