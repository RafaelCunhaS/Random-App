import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { CustomInput } from '../../components/Input';
import { ICustomerInfo } from '../../interfaces';
import { api } from '../../services/api';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { HiIdentification } from 'react-icons/hi';
import { BiMap } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

export function CustomerInspect() {
  const [customer, setCustomer] = useState<ICustomerInfo>();
  const [editing, SetEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const editedCustomerInfo = {} as ICustomerInfo;

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/customers/${id}`);
      setCustomer(data);
    })();
  }, []);

  async function handleChange(e: any) {
    const name = e.target.name as keyof ICustomerInfo;
    const value = e.target.value;

    editedCustomerInfo[name] = value;
  }

  async function updateCustomer() {
    try {
      const { status, data } = await api.patch(
        `/customers/${id}`,
        editedCustomerInfo
      );
      if (status === 200) {
        setCustomer(data);
        toast.success('Customer Updated!');
      } else toast.error('Internal Server Error');
    } catch (error) {
      toast.error('Internal Server Error');
    }
  }

  async function deleteCustomer() {
    try {
      const { status } = await api.delete(`/customers/${id}`);
      if (status === 204) {
        toast.success('Customer Deleted!');
        navigate('/customers');
      } else toast.error('Internal Server Error');
    } catch (error) {
      toast.error('Internal Server Error');
    }
  }

  return (
    <div>
      <Header />
      <div className="flex h-screen justify-center gap-x-12 bg-[#D7FEFB]">
        <div className="flex flex-col items-center mt-10">
          <CustomInput
            label="Username"
            defaultValue={customer?.username}
            name="username"
            Icon={FiUser}
            autoComplete="off"
            className="disabled:bg-red-100"
            onChange={(e) => handleChange(e)}
            disabled={!editing}
          />
          <CustomInput
            label="Email"
            defaultValue={customer?.email}
            name="email"
            Icon={FiMail}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            disabled={!editing}
          />
          <CustomInput
            label="Phone number"
            defaultValue={customer?.phonenumber}
            name="phonenumber"
            Icon={FiPhone}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            disabled={!editing}
          />
          <CustomInput
            label="Address"
            defaultValue={customer?.address}
            name="address"
            Icon={BiMap}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            disabled={!editing}
          />
          <CustomInput
            label="CPF"
            defaultValue={customer?.cpf}
            name="cpf"
            Icon={HiIdentification}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            disabled={!editing}
          />
        </div>
        <div className="flex flex-col w-fit justify-center items-center gap-y-5">
          {editing ? (
            <Button
              title="Finish Editing"
              onClick={() => {
                SetEditing(!editing);
                updateCustomer();
              }}
            />
          ) : (
            <Button
              title="Edit"
              icon={<AiOutlineEdit />}
              onClick={() => SetEditing(!editing)}
            />
          )}
          <Button
            title="Delete"
            icon={<AiOutlineDelete />}
            className="!bg-red-600 !text-black"
            onClick={() => deleteCustomer()}
          />
          <Link
            to="/customers"
            className="text-cyan-900 underline hover:text-cyan-600"
          >
            Back to customers list
          </Link>
        </div>
      </div>
    </div>
  );
}
