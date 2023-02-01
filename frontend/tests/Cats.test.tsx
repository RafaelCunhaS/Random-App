import '@testing-library/jest-dom';
import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from './setup';
import { Cats } from '../src/pages/Cats';

afterEach(cleanup);

describe('Cats page', () => {
  it('expects to "Get!" button and input to appear on screen', () => {
    const { getByRole, getByTestId } = render(<Cats />);
    const catInput = getByTestId('catsInput');
    const catButton = getByRole('button', { name: 'Get!' });

    expect(catInput).toBeInTheDocument();
    expect(catButton).toBeInTheDocument();
  });

  it('expects cat photo to appear on screen', () => {
    const { getByAltText } = render(<Cats />);

    const catImage = getByAltText(/cat image/i);

    expect(catImage).toHaveAttribute('src', 'https://http.cat/100.jpg');
  });

  it('expects another image to be loaded when the button is clicked', async () => {
    const { user, getByTestId, getByRole, getByAltText } = render(<Cats />);

    const catInput = getByTestId('catsInput');
    const catButton = getByRole('button', { name: 'Get!' });

    await user.type(catInput, '200');
    await user.click(catButton);
    const catImage = getByAltText(/cat image/i);

    expect(catImage).toHaveAttribute('src', 'https://http.cat/200.jpg');
  });
});
