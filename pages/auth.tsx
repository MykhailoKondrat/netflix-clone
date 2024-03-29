import Input from '@/components/Input';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [variant, setVariant] = useState('login');
  const toggleVariant = useCallback(() => {
    setVariant((currentVar) => {
      return currentVar === 'login' ? 'register' : 'login';
    });
  }, [setVariant]);
  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });
      router.push('/profiles');
    } catch (e) {
      console.log(e);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
      });
      await login()
    } catch (e) {
      console.log(e);
    }
  }, [email, name, password,login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-12"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-4 text-semibold">
              {variant === 'login'
                ? 'Sign in'
                : 'Create Account'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="username"
                  type="username"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
              <button
                onClick={
                  variant === 'login' ? login : register
                }
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 "
              >
                {variant === 'login' ? 'Login' : 'Sign Up'}
              </button>
              <p className="text-neutral-500 mt12">
                {variant === 'login'
                  ? 'First time using Netflix?'
                  : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === 'login'
                    ? 'Create an account'
                    : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
