import { ButtonProps } from '../../interfaces';

export function Button({ title, icon, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${className} text-lg min-w-[100px] flex items-center bg-red-300 hover:bg-red-400 p-3 rounded-xl gap-2 text-cyan-900 justify-center duration-300`}
    >
      {title}
      {icon}
    </button>
  );
}
