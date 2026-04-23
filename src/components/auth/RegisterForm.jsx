import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../common/Button';
import InputField from '../common/InputField';
import SocialLogin from './SocialLogin';
import routePaths from '../../routes/routePaths';
import useAuth from '../../hooks/useAuth';
import passwordIcon from '../../assets/icons/mdi_password.svg';
import userIcon from '../../assets/icons/mdi_user.svg';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { authError, isLoading, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await register({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });
      navigate(routePaths.dashboard);
    } catch {
      // The context exposes the backend message through authError.
    }
  }

  return (
    <div className="w-full max-w-[420px]">
      <div className="mb-8">
        <p className="text-sm font-medium text-[#6b7280]">Start your workspace</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#111827]">Create account</h2>
        <p className="mt-2 text-sm leading-6 text-[#6b7280]">Create your profile and begin organizing work.</p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField
          id="name"
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          icon={userIcon}
          required
        />
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          icon={userIcon}
          required
        />
        <InputField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Enter your password"
          icon={passwordIcon}
          rightElement={
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#111827]"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
          required
        />
        {authError ? (
          <p className="rounded-[6px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {authError}
          </p>
        ) : null}
        <Button type="submit" className="h-12 w-full rounded-[6px]" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Register'}
        </Button>
      </form>
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-sm text-[#6b7280]">or</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>
      <SocialLogin />
      <p className="mt-6 text-sm text-[#6b7280]">
        Already have an account?{' '}
        <Link className="font-semibold text-[#111827] underline underline-offset-4" to={routePaths.login}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
