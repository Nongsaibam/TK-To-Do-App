import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import PageContainer from '../../components/layout/PageContainer';
import { AuthContext } from '../../context/AuthContext';
import routePaths from '../../routes/routePaths';

const PREFERENCES_KEY = 'modern-taskflow-settings';
const defaultPreferences = {
  emailNotifications: true,
  dailyDigest: true,
  compactDashboard: false,
  defaultPriority: 'Moderate',
};

function loadPreferences() {
  try {
    return { ...defaultPreferences, ...JSON.parse(localStorage.getItem(PREFERENCES_KEY)) };
  } catch {
    return defaultPreferences;
  }
}

function ProfileHeader({ user }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-[#111827] text-2xl font-semibold text-white">
        {user.firstName?.[0] ?? user.name?.[0]}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-[#111827]">{user.name}</h2>
        <p className="mt-1 text-sm text-[#6b7280]">{user.email}</p>
      </div>
    </div>
  );
}

function InfoField({ label, defaultValue }) {
  const name = label.toLowerCase().replace(' address', '').replace(' ', '');

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#374151]">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
      />
    </label>
  );
}

function PreferenceToggle({ checked, description, label, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-[6px] border border-[#e5e7eb] bg-white px-4 py-3">
      <span>
        <span className="block text-sm font-semibold text-[#111827]">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-[#6b7280]">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-[#111827]"
      />
    </label>
  );
}

export default function AccountInfoPage() {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [preferenceMessage, setPreferenceMessage] = useState('');
  const [preferences, setPreferences] = useState(loadPreferences);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await updateProfile({
        firstName: formData.get('firstname'),
        lastName: formData.get('lastname'),
        email: formData.get('email'),
        contactNumber: formData.get('contactnumber'),
        position: formData.get('position'),
      });
      setMessage('Account information updated.');
    } catch (error) {
      setMessage(error.message || 'Could not update account.');
    }
  }

  function updatePreference(key, value) {
    setPreferences((current) => ({ ...current, [key]: value }));
    setPreferenceMessage('');
  }

  function handlePreferencesSubmit(event) {
    event.preventDefault();
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    setPreferenceMessage('Preferences saved.');
  }

  return (
    <AppLayout>
      <PageContainer className="pt-2">
        <section className="rounded-[8px] border border-[#e5e7eb] bg-white">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e5e7eb] px-6 py-5">
            <div>
              <h1 className="text-2xl font-semibold text-[#111827]">Settings</h1>
              <p className="mt-2 text-sm text-[#6b7280]">Manage account information and workspace preferences.</p>
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
              <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-5">
                <ProfileHeader user={currentUser} />
              </div>

              <form onSubmit={handlePreferencesSubmit} className="rounded-[8px] border border-[#e5e7eb] p-5">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-[#111827]">Preferences</h2>
                  <p className="mt-1 text-sm text-[#6b7280]">Control reminders and default task behavior.</p>
                </div>
                <div className="space-y-3">
                  <PreferenceToggle
                    checked={preferences.emailNotifications}
                    description="Receive alerts for overdue and due-today tasks."
                    label="Email notifications"
                    onChange={(value) => updatePreference('emailNotifications', value)}
                  />
                  <PreferenceToggle
                    checked={preferences.dailyDigest}
                    description="Show a daily summary of open work and risks."
                    label="Daily digest"
                    onChange={(value) => updatePreference('dailyDigest', value)}
                  />
                  <PreferenceToggle
                    checked={preferences.compactDashboard}
                    description="Prefer denser cards and lists on dashboard pages."
                    label="Compact dashboard"
                    onChange={(value) => updatePreference('compactDashboard', value)}
                  />
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#374151]">Default task priority</span>
                    <select
                      value={preferences.defaultPriority}
                      onChange={(event) => updatePreference('defaultPriority', event.target.value)}
                      className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
                    >
                      <option value="Extreme">Extreme</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Low">Low</option>
                    </select>
                  </label>
                </div>
                {preferenceMessage ? <p className="mt-4 text-sm font-medium text-[#166534]">{preferenceMessage}</p> : null}
                <button
                  type="submit"
                  className="mt-5 rounded-[6px] bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#374151]"
                >
                  Save preferences
                </button>
              </form>
            </div>

            <div className="rounded-[8px] border border-[#e5e7eb] p-5">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#111827]">Account information</h2>
                <p className="mt-1 text-sm text-[#6b7280]">Update the profile details shown across the workspace.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <InfoField label="First Name" defaultValue={currentUser.firstName} />
                <InfoField label="Last Name" defaultValue={currentUser.lastName} />
                <InfoField label="Email Address" defaultValue={currentUser.email} />
                <InfoField label="Contact Number" defaultValue={currentUser.contactNumber} />
                <InfoField label="Position" defaultValue={currentUser.position} />
                {message ? <p className="text-sm font-medium text-[#166534]">{message}</p> : null}

                <div className="flex flex-wrap gap-2 pt-3">
                  <button
                    type="submit"
                    className="rounded-[6px] bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#374151]"
                  >
                    Update Info
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(routePaths.changePassword)}
                    className="rounded-[6px] border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#374151] transition hover:bg-[#f3f4f6]"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </PageContainer>
    </AppLayout>
  );
}
