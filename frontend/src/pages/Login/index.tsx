import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiLock, FiSend, FiUser } from 'react-icons/fi';
import { CustomInput } from '../../components/Input';
import { ISignIn } from '../../interfaces';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const schema = yup
  .object()
  .shape({
    username: yup.string().required('Username required'),
    password: yup.string().required('Password required'),
  })
  .required();

export function Login() {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [rememberMe, SetRememberMe] = useState(false);
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: yupResolver(schema),
  });

  function showPassword() {
    setIsShowingPassword(!isShowingPassword);
  }

  async function onSubmit(dataForm: ISignIn) {
    signIn(dataForm, rememberMe);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-cyan-500 via-teal-200 to-emerald-100">
      <div className="md:w-xl lg:max-w-2xl flex flex-col items-center p-16 bg-teal-700 rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          autoCapitalize="off"
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl mb-6 text-black font-mono">Login</h1>
          <CustomInput
            label="Username"
            Icon={FiUser}
            {...register('username')}
            error={errors.username}
            data-testid="usernameInput"
          />

          <CustomInput
            type={isShowingPassword ? 'text' : 'password'}
            label="Password"
            Icon={FiLock}
            {...register('password')}
            error={errors.password}
            isPassword={true}
            showPassword={showPassword}
            isShowingPassword={isShowingPassword}
            data-testid="passwordInput"
          />

          <div className="flex self-start gap-2 ml-2 -mt-2 mb-2">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              onClick={() => SetRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <div className="flex justify-center">
            <Button
              title="Login"
              icon={<FiSend />}
              className="bg-red-200 hover:bg-red-300"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
