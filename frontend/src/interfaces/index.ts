import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';

export * from './UserDataProps';

export interface ISignIn {
  username: string;
  password: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
}

export interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon?: IconType;
  isPassword?: boolean;
  error?: FieldError;
  showPassword?: () => void;
  isShowingPassword?: boolean;
}

export interface IUser {
  token: string;
}

export interface IAuthContextData {
  user: IUser;
  signIn: (credential: ISignIn, rememberMe: boolean) => Promise<void>;
}

export interface UserCardProps {
  image: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  username: string;
  email: string;
}

export interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
}

export interface ICustomerInfo {
  _id: string;
  username: string;
  email: string;
  phonenumber: string;
  address: string;
  cpf: string;
}
