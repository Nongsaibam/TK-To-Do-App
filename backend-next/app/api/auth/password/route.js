import { badRequest, notFound, ok, options } from '../../../../lib/response.js';
import { listUsers, saveUsers } from '../../../../lib/store.js';

export const OPTIONS = options;

export async function PATCH(request) {
  const { email, currentPassword, newPassword } = await request.json();
  const users = await listUsers();
  const user = users.find((item) => item.email === email);

  if (!user) {
    return notFound('User not found');
  }

  if (!currentPassword || !newPassword) {
    return badRequest('Current password and new password are required');
  }

  if (user.password !== currentPassword) {
    return badRequest('Current password is incorrect');
  }

  user.password = newPassword;
  await saveUsers(users);

  return ok({ message: 'Password updated' });
}
