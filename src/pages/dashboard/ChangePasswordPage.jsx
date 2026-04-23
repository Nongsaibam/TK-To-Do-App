import { useContext, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import PageContainer from '../../components/layout/PageContainer';
import { AuthContext } from '../../context/AuthContext';

function ProfileSummary({ user }) {
  return (
    <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-[#111827] text-2xl font-semibold text-white">
          {user.firstName?.[0] ?? user.name?.[0]}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold text-[#111827]">{user.name}</h2>
          <p className="mt-1 truncate text-sm text-[#6b7280]">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

function PasswordField({ label, name, show, onToggle }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#374151]">{label}</span>
      <span className="relative block">
        <input
          name={name}
          type={show ? 'text' : 'password'}
          className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 pr-12 text-sm outline-none transition focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[6px] text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#111827]"
          aria-label={show ? 'Hide password' : 'Show password'}
          title={show ? 'Hide password' : 'Show password'}
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </span>
    </label>
  );
}

export default function ChangePasswordPage() {
  const { changePassword, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [visibleFields, setVisibleFields] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  function toggleField(name) {
    setVisibleFields((current) => ({ ...current, [name]: !current[name] }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get('newPassword');

    if (!formData.get('currentPassword') || !newPassword || !formData.get('confirmPassword')) {
      setMessageType('error');
      setMessage('All password fields are required.');
      return;
    }

    if (newPassword.length < 6) {
      setMessageType('error');
      setMessage('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== formData.get('confirmPassword')) {
      setMessageType('error');
      setMessage('New password and confirm password must match.');
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.get('currentPassword'),
        newPassword,
      });
      setMessageType('success');
      setMessage('Password updated.');
      event.currentTarget.reset();
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'Could not update password.');
    }
  }

  return (
    <AppLayout>
      <PageContainer className="pt-2">
        <section className="rounded-[8px] border border-[#e5e7eb] bg-white">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e5e7eb] px-6 py-5">
            <div>
              <h1 className="text-2xl font-semibold text-[#111827]">Change password</h1>
              <p className="mt-2 text-sm text-[#6b7280]">Update the password used to access your workspace.</p>
            </div>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-[6px] border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#374151] transition hover:bg-[#f3f4f6]"
            >
              Go Back
            </button>
          </div>

          <div className="grid gap-6 px-6 py-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <ProfileSummary user={currentUser} />
              <div className="rounded-[8px] border border-[#e5e7eb] p-5">
                <h2 className="text-lg font-semibold text-[#111827]">Security tips</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#6b7280]">
                  <li>Use at least 6 characters.</li>
                  <li>Avoid reusing passwords from other apps.</li>
                  <li>Use a mix of letters, numbers, and symbols.</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[8px] border border-[#e5e7eb] p-5">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#111827]">Password details</h2>
                <p className="mt-1 text-sm text-[#6b7280]">Confirm your current password before setting a new one.</p>
              </div>

              <div className="space-y-5">
                <PasswordField
                  label="Current Password"
                  name="currentPassword"
                  show={visibleFields.currentPassword}
                  onToggle={() => toggleField('currentPassword')}
                />
                <PasswordField
                  label="New Password"
                  name="newPassword"
                  show={visibleFields.newPassword}
                  onToggle={() => toggleField('newPassword')}
                />
                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  show={visibleFields.confirmPassword}
                  onToggle={() => toggleField('confirmPassword')}
                />
                {message ? (
                  <p
                    className={`rounded-[6px] border px-3 py-2 text-sm font-medium ${
                      messageType === 'success'
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    {message}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2 pt-3">
                  <button
                    type="submit"
                    className="rounded-[6px] bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#374151]"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-[6px] border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#374151] transition hover:bg-[#f3f4f6]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </PageContainer>
    </AppLayout>
  );
}
