import { UserCardProps } from '../../interfaces';

export function UserCard({ image, name, username, email }: UserCardProps) {
  return (
    <div className="container max-w-sm flex-col mx-auto rounded-md text-center my-2 mx-4 py-1 px-2 duration-300 shadow-lg bg-teal-200 ">
      <img
        className="rounded-xl mx-auto"
        src={image}
        alt={`${name.title} ${name.first} ${name.last}`}
      />
      <div className="container flex flex-col mt-3">
        <h2 className="mb-1 font-bold">
          {name.title} {name.first} {name.last}
          <span className="font-normal">, aka {username}</span>
        </h2>
        <h3>{email}</h3>
      </div>
    </div>
  );
}
