import '@testing-library/jest-dom';
import React from 'react';
import { cleanup, getByRole } from '@testing-library/react';
import { render } from './setup';
import { Customers } from '../src/pages/Customers';
import axios from 'axios';
import { vi } from 'vitest';

afterEach(cleanup);

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Customers page', () => {
  beforeEach(() => mockedAxios.post.mockReset());

  it('expects "No customers yet!" text on render', () => {
    const { getByText } = render(<Customers />);

    expect(getByText('No customers yet!')).toBeInTheDocument();
  });

  it('expects to render new items when the "Create new customer" button is clicked', async () => {
    const { user, getByText, getByRole } = render(<Customers />);

    await user.click(getByRole('button', { name: 'Create new customer' }));

    expect(getByText('Create new Customer')).toBeInTheDocument();
  });

  it('expects to go to create a new customer and back to users list when "Back to customers list" is clicked', async () => {
    const { user, getByText, getByRole } = render(<Customers />);

    await user.click(getByRole('button', { name: 'Create new customer' }));
    await user.click(getByText('Back to customers list'));

    expect(getByText('No customers yet!')).toBeInTheDocument();
  });
});
