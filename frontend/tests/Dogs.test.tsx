import '@testing-library/jest-dom';
import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from './setup';
import { Dogs } from '../src/pages/Dogs';
import axios from 'axios';
import { vi } from 'vitest';

afterEach(cleanup);

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dogs page', () => {
  beforeEach(() => mockedAxios.get.mockReset());

  it('expects to "Refresh Dog" button to be on screen', () => {
    const { getByRole } = render(<Dogs />);

    expect(getByRole('button', { name: 'Refresh Dog' })).toBeInTheDocument();
  });

  it('expects image of a dog to appear on screen', () => {
    const { getByAltText } = render(<Dogs />);

    const dogImage = getByAltText(/dog image/i);

    expect(dogImage).toHaveAttribute(
      'src',
      'https://random.dog/f6997cc3-31c7-41ef-a44a-e0446cb758af.jpg'
    );
  });
});
