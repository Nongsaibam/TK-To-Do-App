import { badRequest, notFound, ok, options } from '../../../../lib/response.js';
import { listUsers, saveUsers } from '../../../../lib/store.js';

export const OPTIONS = options;

export async function PATCH(request) {
  const body = await request.json();
  const users = await listUsers();
  const user = users.find((item) => item.id === Number(body.id) || item.email === body.email);

  if (!user) {
    return notFound('User not found');
  }

  const emailOwner = users.find((item) => item.email === body.email && item.id !== user.id);
  if (emailOwner) {
    return badRequest('Email already belongs to another user');
  }

  Object.assign(user, {
    firstName: body.firstName || user.firstName,
    lastName: body.lastName || user.lastName,
    email: body.email || user.email,
    contactNumber: body.contactNumber || user.contactNumber,
    position: body.position || user.position,
  });
  user.name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name;
  await saveUsers(users);

  return ok({
    message: 'Profile updated',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      position: user.position,
      avatar: user.avatar,
      joinedAt: user.joinedAt,
    },
  });
}
