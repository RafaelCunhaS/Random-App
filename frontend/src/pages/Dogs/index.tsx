import axios from 'axios';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { AiOutlineLoading } from 'react-icons/ai';
import { Header } from '../../components/Header';

export function Dogs() {
  const [isLoading, SetIsLoading] = useState(true);
  const [image, SetImage] = useState(
    'https://random.dog/f6997cc3-31c7-41ef-a44a-e0446cb758af.jpg'
  );

  async function handleClick(): Promise<any> {
    SetIsLoading(true);
    const { data } = await axios.get('https://random.dog/woof');
    if (data.endsWith('mp4') || data.endsWith('webm')) return handleClick();
    SetImage(`https://random.dog/${data}`);
  }

  return (
    <div>
      <Header />
      <div className="flex h-screen justify-center bg-[#D7FEFB]">
        <div className="flex flex-col items-center mt-10">
          <Button
            disabled={isLoading}
            title="Refresh Dog"
            onClick={handleClick}
            className="disabled:cursor-wait"
          />
          {isLoading && (
            <AiOutlineLoading className="animate-spin mt-32" size="40" />
          )}
          <img
            className="max-w-sm rounded-md mt-5 shadow-md shadow-black"
            style={!isLoading ? {} : { display: 'none' }}
            src={image}
            alt="Dog image"
            onLoad={() => SetIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
