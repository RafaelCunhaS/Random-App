import '@testing-library/jest-dom';
import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from './setup';
import { Login } from '../src/pages/Login';
import axios from 'axios';
import { vi } from 'vitest';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<any>('react-router-dom')),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(cleanup);

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Login page', () => {
  beforeEach(() => mockedAxios.post.mockReset());

  it('expects to "Login" title and "Login" button to appear on screen', () => {
    const { getByRole } = render(<Login />);

    expect(
      getByRole('heading', { level: 1, name: 'Login' })
    ).toBeInTheDocument();
    expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('expects inputs to be on screen', () => {
    const { getByTestId } = render(<Login />);

    const usernameInput = getByTestId('usernameInput');
    const passwordInput = getByTestId('passwordInput');

    expect(passwordInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
  });

  it('expects incorrect credentials to show error when trying to signin', async () => {
    mockedAxios.post.mockResolvedValue({ data: { error: 'Forbidden' } });
    const { user, getByTestId, getByRole, findByText } = render(<Login />);

    const usernameInput = getByTestId('usernameInput');
    const passwordInput = getByTestId('passwordInput');

    await user.type(usernameInput, 'incorrectUsername');
    await user.type(passwordInput, 'incorrectPassword');
    await user.click(getByRole('button', { name: 'Login' }));

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(
      await findByText('Incorrect username or password')
    ).toBeInTheDocument();
  });

  it('expects correct credentials to go to Home page when trying to signin', async () => {
    mockedUsedNavigate.mockImplementation;
    mockedAxios.post.mockResolvedValue({ data: { token: 'userToken' } });
    const { user, getByTestId, getByRole } = render(<Login />);

    const usernameInput = getByTestId('usernameInput');
    const passwordInput = getByTestId('passwordInput');

    await user.type(usernameInput, 'desafiosharenergy');
    await user.type(passwordInput, 'sh@r3n3rgy');
    await user.click(getByRole('button', { name: 'Login' }));

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');
  });
});
