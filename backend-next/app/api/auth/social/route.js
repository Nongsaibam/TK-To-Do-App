import { badRequest, ok, options } from '../../../../lib/response.js';
import { listUsers, saveUsers } from '../../../../lib/store.js';

export const OPTIONS = options;

const providerProfiles = {
  Google: {
    name: 'Google User',
    email: 'google.user@taskflow.local',
  },
  Facebook: {
    name: 'Facebook User',
    email: 'facebook.user@taskflow.local',
  },
  X: {
    name: 'X User',
    email: 'x.user@taskflow.local',
  },
};

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    firstName: user.firstName || user.name.split(' ')[0],
    lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
    contactNumber: user.contactNumber || '',
    position: user.position || user.role,
    avatar: user.avatar,
    joinedAt: user.joinedAt,
    provider: user.provider,
  };
}

export async function POST(request) {
  const { provider } = await request.json();
  const profile = providerProfiles[provider];

  if (!profile) {
    return badRequest('Unsupported social provider');
  }

  const users = await listUsers();
  let user = users.find((item) => item.email === profile.email);

  if (!user) {
    user = {
      id: Math.max(0, ...users.map((item) => Number(item.id) || 0)) + 1,
      ...profile,
      password: `social-${provider.toLowerCase()}`,
      role: 'Member',
      firstName: profile.name.split(' ')[0],
      lastName: profile.name.split(' ').slice(1).join(' '),
      contactNumber: '',
      position: `${provider} Account`,
      provider,
      joinedAt: new Date().toISOString().slice(0, 10),
    };
    users.push(user);
    await saveUsers(users);
  }

  return ok({
    message: `${provider} login successful`,
    token: `demo-${provider.toLowerCase()}-social-token`,
    user: publicUser(user),
  });
}
