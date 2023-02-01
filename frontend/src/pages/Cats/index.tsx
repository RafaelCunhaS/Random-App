import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

export function Cats() {
  const [statusForSrc, setStatusForSrc] = useState('100');
  const [isLoading, SetIsLoading] = useState(true);
  let statusCode = '';

  async function onSubmit() {
    SetIsLoading(true);
    setStatusForSrc(statusCode);
  }

  return (
    <div>
      <Header />
      <div className="flex h-screen justify-center bg-[#D7FEFB]">
        <div className="flex flex-col items-center mt-10">
          <label htmlFor="statusInput">
            Please enter a{' '}
            <a
              className="font-bold mr-3 text-blue-800 underline"
              target={'_blank'}
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
            >
              HTTP code
            </a>
            <input
              type="number"
              name="statusInput"
              autoComplete="off"
              data-testid="catsInput"
              onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
              className="text-black text-center w-16 h-10 rounded-md bg-gray-100 border-2 border-gray-400"
              onChange={(e) => (statusCode = e.target.value)}
            />
          </label>
          <Button title="Get!" className="mt-3" onClick={onSubmit} />
          {isLoading && (
            <AiOutlineLoading3Quarters
              className="animate-spin mt-32"
              size="40"
            />
          )}
          <img
            src={`https://http.cat/${statusForSrc}.jpg`}
            alt="Cat image"
            className="max-w-md mt-5 rounded-md hadow-md shadow-black"
            style={!isLoading ? {} : { display: 'none' }}
            onLoad={() => SetIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
