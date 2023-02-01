import {
  forwardRef,
  ForwardRefRenderFunction,
  useState,
  useCallback,
} from 'react';
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { CustomInputProps } from '../../interfaces';

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
> = (
  {
    label,
    Icon,
    isPassword = false,
    error,
    showPassword,
    isShowingPassword = false,
    ...rest
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="flex flex-col w-full mb-6">
      <label className="text-gray-900">{label}</label>
      <div
        className={` border-transparent
        ${isFocused && '!border-black'} 
        ${
          error && '!border-red-700'
        } border-2 relative rounded w-full px-4 flex h-16 bg-gray-400 items-center`}
      >
        {Icon && <Icon size={24} className={`${error && 'text-red-700'}`} />}

        <input
          {...rest}
          className={`h-16 bg-transparent text-gray-900 border-2 border-transparent rounded outline-none block w-full px-4 disabled:text-gray-100`}
          placeholder={label}
          ref={ref}
          onFocus={handleInputFocus}
          onBlur={() => handleInputBlur()}
        />

        {isPassword &&
          (!isShowingPassword ? (
            <FiEyeOff onClick={showPassword} size="24" />
          ) : (
            <FiEye onClick={showPassword} size="24" />
          ))}
      </div>
      {error && (
        <div className="flex items-center mt-1 text-red-600">
          <FiAlertCircle className="mr-2 " />
          <p className="text-sm">{error.message}</p>
        </div>
      )}
    </div>
  );
};

export const CustomInput = forwardRef(InputBase);
