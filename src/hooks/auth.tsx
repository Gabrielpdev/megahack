import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface IAuthState {
  user: object;
}

interface ISingInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: object;
  signIn(credentials: ISingInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const user = localStorage.getItem('@GoBarber:user');

    if (user) {
      return { user: JSON.parse(user) };
    }
    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    if (email !== 'joaocarlos@teste.com' || password !== '123456') {
      throw new Error();
    }

    const response = await api.get('session/1');

    const user = response.data;

    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
