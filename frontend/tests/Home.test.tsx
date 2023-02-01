import '@testing-library/jest-dom';
import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from './setup';
import { Home } from '../src/pages/Home';
import axios from 'axios';
import { vi } from 'vitest';

afterEach(cleanup);

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home page', () => {
  beforeEach(() => mockedAxios.post.mockReset());

  it('expects select options and input to be on screen', () => {
    const { getByRole } = render(<Home />);
    const homeSelect1 = getByRole('option', { name: 'Name' });
    const homeSelect2 = getByRole('option', { name: 'Email' });
    const homeSelect3 = getByRole('option', { name: 'Username' });
    const homeInput = getByRole('textbox');

    expect(homeSelect1).toBeInTheDocument();
    expect(homeSelect2).toBeInTheDocument();
    expect(homeSelect3).toBeInTheDocument();
    expect(homeInput).toBeInTheDocument();
  });

  it('expects all buttons to be on screen', () => {
    const { getByTestId } = render(<Home />);

    for (let i = 0; i < 12; i += 1) {
      expect(getByTestId(`pagination-button-${i}`)).toBeInTheDocument();
    }
  });

  it('expects api call to be made correctly on page render', async () => {
    mockedAxios.get.mockImplementation;
    render(<Home />);

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://randomuser.me/api/?page=1&results=9&seed=abc'
    );
  });

  it('expects api call to be made correctly on click of a page button', async () => {
    mockedAxios.post.mockImplementation;
    const { user, getByTestId } = render(<Home />);

    await user.click(getByTestId('pagination-button-4'));

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://randomuser.me/api/?page=5&results=9&seed=abc'
    );
  });
});
