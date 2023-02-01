import { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { CreateCustomer } from '../../components/CreateCustomer';
import { Header } from '../../components/Header';
import { ICustomerInfo } from '../../interfaces';
import { HiOutlineFaceFrown } from 'react-icons/hi2';
import axios from 'axios';
import { toast } from 'react-toastify';

export function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<ICustomerInfo[]>([]);
  const [createCustomer, setCreateCustomer] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/customers');
        if (!data.error) setCustomers(data);
      } catch (error) {
        toast.error('Internal server error');
      }
    })();
  }, [createCustomer]);

  function handleClick(id: string) {
    navigate(`/customers/${id}`);
  }

  return (
    <div>
      <Header />
      <div className="flex min-h-screen justify-center bg-[#D7FEFB]">
        <div className="flex flex-col w-full items-center mt-10">
          {!createCustomer ? (
            <div className="flex flex-col w-full items-center gap-y-5">
              <Button
                title="Create new customer"
                onClick={() => setCreateCustomer(!createCustomer)}
              />
              <ul className="flex flex-col gap-y-8 mt-5">
                {customers.length ? (
                  customers.map(({ _id, username, email, cpf }, index) => (
                    <li key={cpf} className="flex flex-col w-full gap-y-3">
                      <h4 className="font-bold self-center">
                        Customer {index + 1}
                      </h4>
                      <div className="flex gap-x-3 items-center">
                        <div className="flex flex-col">
                          <p>Name: {username}</p>
                          <p>Email: {email}</p>
                          <p>CPF: {cpf}</p>
                        </div>
                        <BiSearchAlt
                          size="30"
                          className="text-cyan-800 hover:cursor-pointer hover:animate-pulse"
                          onClick={() => handleClick(_id)}
                        />
                      </div>
                    </li>
                  ))
                ) : (
                  <h1 className="flex text-3xl gap-2">
                    No customers yet! <HiOutlineFaceFrown size="34" />
                  </h1>
                )}
              </ul>
            </div>
          ) : (
            <CreateCustomer
              onClick={() => setCreateCustomer(!createCustomer)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
