import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { UsersList } from '../../components/UsersList';
import { IUserData } from '../../interfaces';

export function Home() {
  const [usersData, setUsersData] = useState<IUserData>({ results: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [category, SetCategory] = useState('name');
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://randomuser.me/api/?page=${currentPage}&results=9&seed=abc`
        );

        if (!data.error) setUsersData(data);
      } catch (error) {
        toast.error('Uh oh, something has gone wrong. Please try again');
      }
    })();
  }, [currentPage]);

  function handleSelect(e: ChangeEvent<{ value: string }>) {
    SetCategory(e.currentTarget.value);
  }

  const filteredUsersData =
    search.length > 0
      ? usersData.results.filter(({ name, email, login: { username } }) => {
          if (category === 'name') {
            return (
              name.first.toLowerCase().includes(search) ||
              name.last.toLowerCase().includes(search)
            );
          }
          if (category === 'email') return email.toLowerCase().includes(search);
          return username.toLowerCase().includes(search);
        })
      : [];

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#D7FEFB]">
        <div className="mx-auto pt-4 flex justify-center">
          <label htmlFor="search" className="mr-2 self-center">
            Search By:
          </label>
          <select
            className=""
            name="search"
            id="search"
            onChange={handleSelect}
          >
            <option defaultChecked value="name">
              Name
            </option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
          <div className="border-transparent border-1 w-sm relative rounded px-2 flex h-8 bg-gray-300 items-center">
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              className="h-8 bg-transparent border-transparent rounded outline-none block"
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <FiSearch size="24" />
          </div>
        </div>
        <UsersList
          results={search.length > 0 ? filteredUsersData : usersData.results}
        />
        <Pagination
          setCurrentPage={(page) => setCurrentPage(page)}
          totalPosts={100}
          currentPage={currentPage}
          postsPerPage={9}
        />
      </div>
    </div>
  );
}
