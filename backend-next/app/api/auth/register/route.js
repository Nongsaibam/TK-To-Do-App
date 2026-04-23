import { badRequest, ok, options } from '../../../../lib/response.js';
import { listUsers, saveUsers } from '../../../../lib/store.js';

export const OPTIONS = options;

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;
  const users = await listUsers();

  if (!name || !email || !password) {
    return badRequest('Name, email, and password are required');
  }

  const exists = users.find((item) => item.email === email);
  if (exists) {
    return badRequest('User already exists');
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: 'Member',
    firstName: name.split(' ')[0],
    lastName: name.split(' ').slice(1).join(' '),
    contactNumber: '',
    position: 'Team Member',
    joinedAt: new Date().toISOString().slice(0, 10),
  };

  users.push(newUser);
  await saveUsers(users);

  return ok({
    message: 'Registration successful',
    token: 'demo-nextjs-jwt-token',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      contactNumber: newUser.contactNumber,
      position: newUser.position,
      joinedAt: newUser.joinedAt,
    },
  });
}
