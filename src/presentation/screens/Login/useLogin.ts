import { useState } from 'react';
import { loginUserUseCase } from '../../../providers'; 

export function useLogin(navigation: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    try {
      await loginUserUseCase.execute(email, password);
      navigation.replace('GroupList');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, password, setPassword, loading, error, handleLogin };
}
