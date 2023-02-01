import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IAuthContextData, ISignIn, IUser } from '../interfaces';
import axios from 'axios';

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    let token;
    token = localStorage.getItem('token');
    if (!token) token = sessionStorage.getItem('token');
    if (!token) return navigate('/');
    setUser({
      token: 'userToken',
    });
    return navigate('/home');
  }, []);

  async function signIn({ username, password }: ISignIn, rememberMe: boolean) {
    try {
      const { data } = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      if (!data.error) {
        setUser({
          token: 'userToken',
        });

        if (rememberMe) localStorage.setItem('token', 'userToken');
        else sessionStorage.setItem('token', 'userToken');

        navigate('/home');
      } else {
        toast.warning('Incorrect username or password');
      }
    } catch (error) {
      toast.warning('Incorrect username or password');
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
