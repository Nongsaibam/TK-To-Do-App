import { badRequest, ok, options, unauthorized } from '../../../../lib/response.js';
import { listUsers } from '../../../../lib/store.js';

export const OPTIONS = options;

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return badRequest('Email and password are required');
  }

  const users = await listUsers();
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return unauthorized('Invalid credentials');
  }

  return ok({
    message: 'Login successful',
    token: 'demo-nextjs-jwt-token',
    user: {
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
    },
  });
}
