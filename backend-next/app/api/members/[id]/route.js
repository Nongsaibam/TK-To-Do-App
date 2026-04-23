import { notFound, ok, options } from '../../../../lib/response.js';
import { updateMember } from '../../../../lib/store.js';

export const OPTIONS = options;

export async function PATCH(request, { params }) {
  const { id } = await params;
  const updates = await request.json();
  const member = await updateMember(id, updates);

  if (!member) {
    return notFound('Member not found');
  }

  return ok({ item: member, message: 'Member updated' });
}
