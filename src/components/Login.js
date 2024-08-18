import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormInput, FormButton } from './ui/FormComponents';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-secondary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {isSignUp ? t('signUp') : t('login')}
      </h2>
      {error && <p className="text-accent-red mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t('email')}
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label={t('password')}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormButton type="submit">
          {isSignUp ? t('signUp') : t('login')}
        </FormButton>
      </form>
      <p className="mt-4 text-center text-gray-300">
        {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-accent ml-1 hover:underline"
        >
          {isSignUp ? t('login') : t('signUp')}
        </button>
      </p>
    </div>
  );
};

export default Login;