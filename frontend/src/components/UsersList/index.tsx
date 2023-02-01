import { IUserData } from '../../interfaces';
import { UserCard } from '../UserCard';

export function UsersList({ results }: IUserData) {
  return (
    <div className="container mx-auto max-w-7xl flex flex-wrap">
      {results.map(({ picture, name, login, email }) => {
        return (
          <UserCard
            key={email}
            image={picture.large}
            name={name}
            username={login.username}
            email={email}
          />
        );
      })}
    </div>
  );
}
