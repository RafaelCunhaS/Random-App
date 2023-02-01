import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { CustomInput } from '../../components/Input';
import { ICustomerInfo } from '../../interfaces';
import { api } from '../../services/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { DOMAttributes } from 'react';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { HiOutlineIdentification } from 'react-icons/hi';
import { BiMap } from 'react-icons/bi';

const schema = yup
  .object()
  .shape({
    username: yup.string().required('Username required'),
    email: yup.string().email().required('Email required'),
    phonenumber: yup.string().min(8).required('Phone number required'),
    address: yup.string().min(3).required('Address required'),
    cpf: yup.string().length(11).required('CPF required'),
  })
  .required();

export function CreateCustomer({ onClick }: DOMAttributes<HTMLButtonElement>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICustomerInfo>({
    resolver: yupResolver(schema),
  });

  async function createCustomer(dataForm: ICustomerInfo) {
    try {
      const { status } = await api.post('/customers', dataForm);
      if (status === 201) {
        toast.success('User created!');
        reset();
      } else toast.warning('Something went wrong. Please try again!');
    } catch (error) {
      toast.error('Internal server error');
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-medium mb-5 text-cyan-900">
        Create new Customer
      </h1>
      <form
        onSubmit={handleSubmit(createCustomer)}
        autoComplete="off"
        autoCapitalize="off"
        className="flex flex-col items-center"
      >
        <CustomInput
          label="Username"
          error={errors.username}
          Icon={FiUser}
          placeholder="username"
          {...register('username')}
        />
        <CustomInput
          label="Email"
          error={errors.email}
          Icon={FiMail}
          {...register('email')}
        />
        <CustomInput
          label="Phone number"
          error={errors.phonenumber}
          Icon={FiPhone}
          {...register('phonenumber')}
        />
        <CustomInput
          label="Address"
          error={errors.address}
          Icon={BiMap}
          {...register('address')}
        />
        <CustomInput
          label="CPF"
          error={errors.cpf}
          Icon={HiOutlineIdentification}
          {...register('cpf')}
        />
        <Button title="Create" type="submit" />
      </form>
      <span
        onClick={onClick}
        className="text-cyan-900 underline mt-3 mb-5 hover:text-cyan-600 hover:cursor-pointer"
      >
        Back to customers list
      </span>
    </div>
  );
}
